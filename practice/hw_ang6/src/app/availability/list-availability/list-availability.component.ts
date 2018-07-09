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
import {ITabTypesAvailability, ITabTypesShifts} from '../../shared/interfaces/types.interface';
import {HttpService} from '../../shared/services/http.service';

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
              public dataService: DataService,
              private httpService: HttpService) {
  }

  /**
   * Method ngOnInit
   * @returns {void}
   * @memberof ListAvailabilityComponent
   */

  ngOnInit(): void {
    this.tab = this.dataService.indexTABS_AVAILABILITY[this.tabActive];
    this.flowService.dataSmallSpinner$.next(true);
    this.getData();
  }

  private getData(): void {
  //   for (const i in this.dataService.FLOW_AVAILABILITY) {
  //     if (this.flowService[`${this.dataService.FLOW_AVAILABILITY[i]}`] === undefined) {
  //       this.httpService.getAvailability(<ITabTypesAvailability>i);
  //     }
  //   }

    this.flowService[`${this.dataService.FLOW_AVAILABILITY[this.tab]}`].pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(
      (value) => {
        console.log(value);
        this.listAvailability = value['items'];
        this.flowService.dataSmallSpinner$.next(false);
      }
      // (error) => {
      //   // FIXME - BUG with 401 error - same in shifts
      //   console.log('errorerrorerrorerror', error);
      //   console.log(error.status);
      //   if (error.status === 401) {
      //     console.log('401');
      //     // this.httpService.getAvailability(this.tab);
      //     this.flowService[`${this.dataService.FLOW_AVAILABILITY[this.tab]}`] = undefined;
      //     this.getData();
      //   }
      // }
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
