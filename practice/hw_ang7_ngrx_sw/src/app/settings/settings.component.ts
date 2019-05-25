import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {FlowService} from '../shared/services/flow.service';
import {DataService} from '../shared/services/data.service';
import {HttpService} from '../shared/services/http.service';
import {
  debounceTime,
  takeUntil
} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {LocalStorageService} from 'ngx-webstorage';
import {SettingsService} from './services/settings.service';
import {MainService} from '../shared/services/main.service';
import {Async} from '../shared/models/decorators';

/**
 * Settings Component
 */

@Component({
  selector: 'sw-app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  /**
   * Variable of iconLeft
   * @type {string}
   * @memberof SettingsComponent
   */

  public iconLeft: string = 'menu';

  /**
   * Variable descriptionLeft
   * @type {string}
   * @memberof SettingsComponent
   */

  public descriptionLeft: string = 'settings';

  /**
   * Variable descriptionRight
   * @type {string}
   * @memberof SettingsComponent
   */

  public descriptionRight: string = 'save';

  /**
   * Variable descriptionRightActive
   * @type {string}
   * @memberof SettingsComponent
   */

  public descriptionRightActive: 'VALID' | 'INVALID' = 'INVALID';

  /**
   * Variable of spinner
   * @type {boolean}
   * @memberof SettingsComponent
   */

  public spinner: boolean = false;

  /**
   * Variable of ngUnsubscribe
   * @type {Subject<void>}
   * @memberof SettingsComponent
   */

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  /**
   * Flow of toggleFlow$
   * @type {BehaviorSubject}
   * @memberof SettingsComponent
   */

  @Async() toggleFlow$;

  /**
   * Creates an instance of SettingsComponent
   * @param flowService
   * @param dataService
   * @param httpService
   * @param settingsService
   * @param toastr
   * @param localStorage
   * @param mainService
   * @memberof SettingsComponent
   */

  constructor(public flowService: FlowService,
              public dataService: DataService,
              public httpService: HttpService,
              private settingsService: SettingsService,
              private toastr: ToastrService,
              private localStorage: LocalStorageService,
              private mainService: MainService) {
  }

  /**
   * Method ngOnInit
   * @returns {void}
   * @memberof SettingsComponent
   */

  public ngOnInit(): void {
    this.flowService.dataSmallSpinner$.pipe(
      takeUntil(this.ngUnsubscribe),
      debounceTime(500)
    ).subscribe((value) => {
      this.spinner = value;
    });
    this.flowService.dataSmallSpinner$.next(true);
    this.flowService.dataSettings$.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(() => {
      this.flowService.dataSmallSpinner$.next(false);
    });

    if (!this.localStorage.retrieve('group') ||
      this.httpService.settings !== this.localStorage.retrieve('group').activeId ||
      this.flowService.dataSettingsSwitch$.getValue() === 'pause') {
      this.flowService.dataSettingsSwitch$.next('');
    }
  }

  /**
   * Method fo show side bar
   * @returns {void}
   * @param {any} event
   * @memberof SettingsComponent
   */

  public showSideBar(event?: any): void {
    if (event === 'iconLeft') {
      this.flowService.dataSideBar$.next('iconLeft');
    } else if (event === 'descriptionRight') {
      this.httpService.putSettings(this.toggleFlow$.getValue()).pipe(
        takeUntil(this.ngUnsubscribe)
      ).subscribe((resp) => {
        this.toastr.success(this.dataService.httpSuccessResponse['save']);
        this.descriptionRightActive = 'INVALID';
        this.flowService.dataSettings$.pipe(
          takeUntil(this.ngUnsubscribe)
        ).subscribe((data) => {
          for (const key in data) {
            if (data[key].id === resp[0].id) {
              data[key] = resp[0];
            }
          }
        });
      });
    } else if (event === 'descriptionRightDeactivate') {
      this.toastr.error(this.dataService.errorResponse['noChanges']);
    }
  }

  /**
   * Method fo show spinner
   * @returns {void}
   * @param {any} event
   * @memberof SettingsComponent
   */

  public changeToggle(event?: any): void {
    if (this.mainService.onlineCheck()) {
      this.descriptionRightActive = 'VALID';
      this.toggleFlow$.next(event);
    } else {
      this.toastr.info('INTERNET DISCONNECTED');
    }
  }

  /**
   * Method ngOnDestroy
   * @returns {void}
   * @memberof SettingsComponent
   */

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
