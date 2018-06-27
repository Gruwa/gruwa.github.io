import {
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import {ITimeOff} from '../../shared/interfaces/timeoff.interface';
import {Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {LocalStorageService} from 'ngx-webstorage';
import {DataService} from '../../shared/services/data.service';
import {FlowService} from '../../shared/services/flow.service';
import {ITabTypesAvailability} from '../../shared/interfaces/types.interface';

/**
 * List Availability Component
 */

@Component({
  selector: 'app-list-availability',
  templateUrl: './list-availability.component.html',
  styleUrls: ['./list-availability.component.scss']
})
export class ListAvailabilityComponent implements OnInit, OnDestroy {

  /**
   * Input variable tabActive
   * @type {number}
   * @memberof ListAvailabilityComponent
   */

  @Input() tabActive: number;

  /**
   * Variable of tab
   * @type {ITabTypesShifts}
   * @memberof ListAvailabilityComponent
   */

  public tab: ITabTypesAvailability;

  /**
   * Variable of ngUnsubscribe
   * @type {Subject<void>}
   * @memberof ListAvailabilityComponent
   */

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  /**
   * Variable spinner
   * @type {boolean}
   * @memberof ListAvailabilityComponent
   */

  public spinner: boolean = false;

  /**
   * Variable listAvailability
   * @type {Array<ITimeOff>}
   * @memberof ListAvailabilityComponent
   */

  public listAvailability: Array<ITimeOff>;

  /**
   * Creates an instance of ListAvailabilityComponent
   * @param {FlowService} flowService
   * @param {LocalStorageService} localStorage
   * @param {DataService} dataService
   * @param {Router} router
   * @memberof ListAvailabilityComponent
   */

  constructor(private router: Router,
              private flowService: FlowService,
              private localStorage: LocalStorageService,
              public dataService: DataService) {
  }

  /**
   * Method ngOnInit
   * @returns {void}
   * @memberof ListAvailabilityComponent
   */

  ngOnInit(): void {
    this.tab = this.dataService.indexTABS_AVAILABILITY[this.tabActive];
    this.flowService.dataSmallSpinner$.next(true);
    this.flowService[`${this.dataService.FLOW_AVAILABILITY[this.tab]}`].pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(
      (value) => {
        this.listAvailability = value['items'];
        this.flowService.dataSmallSpinner$.next(false);
      }
    );
  }

  /**
   * Method for show availability
   * @returns {void}
   * @param {ITimeOff} event
   * @memberof ListAvailabilityComponent
   */

  public showAvailability(event: ITimeOff): void {
    this.router.navigate(['/availability/', event.id]);
  }

  /**
   * Method ngOnDestroy
   * @returns {void}
   * @memberof ListAvailabilityComponent
   */

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
