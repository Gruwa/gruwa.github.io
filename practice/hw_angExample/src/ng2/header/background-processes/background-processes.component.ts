import * as moment from 'moment';
import * as _ from 'lodash';
import {Component, Inject, OnInit, OnDestroy} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CurrentUserService} from '../../../core/auth/services/current-user.service';
import {WindowService, GlobalEventsService, LoggerService} from '../../common';
import {SupportService} from '../../support';
import {
  BackgroundProcessDismissPopupComponent
} from './process-dismiss-popup/background-process-dismiss-popup.component';
import {
  BackgroundProcessesService,
  IBackgroundProcess,
  IBackgroundProcessFilter
} from './background-processes.service';

@Component({
  selector: 'cad-background-processes',
  template: require('./background-processes.html'),
  styles: [require('./background-processes.scss')]
})
export class BackgroundProcessesComponent implements OnInit, OnDestroy {
  processes: IBackgroundProcess[] = [];
  state: 'progress' | 'success' | 'failed' = 'success';
  isDisplayed = false;
  isOpened = false;
  autoClose = true;

  private inSuccessFilter: IBackgroundProcessFilter = {
    filter_username_eq: this.currentUserService.user.login,
    filter_status_in: 'SUCCESS',
    filter_acknowledged_eq: false,
    filter_actionTime_gt: moment.utc().subtract(1, 'hours').format('YYYY-MM-DDThh:mm:ss'),
    filter_actionTime_le: moment.utc().format('YYYY-MM-DDThh:mm:ss')
  };

  private notSuccessFilter: IBackgroundProcessFilter = {
    filter_username_eq: this.currentUserService.user.login,
    filter_status_in: 'PROGRESS,FAILED',
    filter_acknowledged_eq: false
  };

  constructor(
    @Inject(WindowService) private windowService: cad.IWindow,
    @Inject('currentUserService') private currentUserService: CurrentUserService,
    private modalService: NgbModal,
    private loggerService: LoggerService,
    private globalEventsService: GlobalEventsService,
    private supportService: SupportService,
    private backgroundProcessesService: BackgroundProcessesService
  ) {}

  ngOnInit() {
    this.fetch().then(() => this.subscribeForUpdates());
  }

  ngOnDestroy() {
    this.backgroundProcessesService.stopPolling();
  }

  trackByFn(index: number, item: IBackgroundProcess): number {
    return item.id;
  }

  onToggle(isOpened: boolean) {
    this.isOpened = isOpened;
    if (isOpened) {
      this.fetch().then(() => this.acknowledgeSuccessful());
    }
  }

  openProcess(id: number) {
    const process: IBackgroundProcess = this.getProcess(id);
    if (process) {
      this.windowService.location.href = process.processLink;
      this.isOpened = false;
    }
  }

  dismissProcess(id: number) {
    const modal = this.modalService.open(BackgroundProcessDismissPopupComponent, {size: 'lg'});
    const modalContent: BackgroundProcessDismissPopupComponent = modal.componentInstance;
    modalContent.processName = _.get(this.getProcess(id), 'name');

    this.autoClose = false; // prevents from auto closing of dropdown while manipulating a popup

    modalContent.onDisimiss.subscribe(() => {
      modal.close();
      this.backgroundProcessesService.acknowledge([id]).then(() => this.remove(id));
    });

    modalContent.onRequestSupport.subscribe(() => {
      modal.close();
      this.isOpened = false;
      this.supportService.openPopup();
    });

    modalContent.onCancel.subscribe(() => modal.close());

    modal.result.then(() => setTimeout(() => this.autoClose = true));
  }

  private fetch(): Promise<void> {
    return Promise
     .all([
       this.backgroundProcessesService.fetch(this.inSuccessFilter),
       this.backgroundProcessesService.fetch(this.notSuccessFilter)
     ])
     .then(processes => {
       this.update(_.flatten(processes));
     })
     .catch((e) => {
       this.loggerService.error('Failed to fetch background processes');
     });
  }

  private update(processes: IBackgroundProcess[]) {
    this.processes = processes;
    this.isDisplayed = !_.isEmpty(processes);

    if (this.hasFailed()) {
      this.state = 'failed';
    } else if (this.hasProgress()) {
      this.state = 'progress';
    } else {
      this.state = 'success';
    }
  }

  private acknowledgeSuccessful() {
    const successfulProcesses: IBackgroundProcess[] = _.filter(this.processes, {status: 'SUCCESS'});
    if (!_.isEmpty(successfulProcesses)) {
      this.backgroundProcessesService.acknowledge(_.map(successfulProcesses, 'id'));
    }
  }

  private subscribeForUpdates() {
    this.backgroundProcessesService.startPolling();
    this.globalEventsService.on('backgroundProcesses:newItem', (process: IBackgroundProcess) => {
      if (this.getProcess(process.id)) {
        this.patch(process);
      } else {
        this.add(process);
      }
    });
  }

  private hasProgress(): boolean {
    return _.some(this.processes, {status: 'PROGRESS'});
  }

  private hasFailed(): boolean {
    return _.some(this.processes, {status: 'FAILED'});
  }

  private getProcess(id: number): IBackgroundProcess {
    return _.find(this.processes, {id});
  }

  private add(process: IBackgroundProcess) {
    const processes = _.concat(this.processes, process);
    this.update(processes);
  }

  private patch(process: IBackgroundProcess) {
    const processes = _.map(this.processes, p => p.id === process.id ? process : p);
    this.update(processes);
  }

  private remove(id: number) {
    this.update(_.reject(this.processes, {id}));
  }
}
