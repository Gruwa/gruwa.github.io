import {
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {HttpService} from '../shared/services/http.service';
import {FlowService} from '../shared/services/flow.service';
import {Subject} from 'rxjs';
import {DataService} from '../shared/services/data.service';
import {
  debounceTime,
  takeUntil
} from 'rxjs/operators';
import {LocalStorageService} from 'ngx-webstorage';
import {ITabTypesAvailability} from '../shared/interfaces/types.interface';
import {ITimeOff} from '../shared/interfaces/timeoff.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AvailabilityComponent implements OnInit, OnDestroy {

  /**
   * Variable headerDescription
   * @type {string}
   * @memberof ShiftsComponent
   */

  public headerDescription: string = 'my availability';

  /**
   * Variable of tab
   * @type {ITabTypesShifts}
   * @memberof ShiftsComponent
   */

  public tab: ITabTypesAvailability = 'time off';

  /**
   * Variable of tabIndex
   * @type {number}
   * @memberof ShiftsComponent
   */

  public tabIndex: number;

  /**
   * Variable spinner
   * @type {boolean}
   * @memberof ShiftsComponent
   */

  public spinner: boolean = false;

  /**
   * Variable of tabActive
   * @type {ITabTypesShifts}
   * @memberof ShiftsComponent
   */

  public tabActive: ITabTypesAvailability = 'time off';

  /**
   * Variable of ngUnsubscribe
   * @type {Subject<void>}
   * @memberof ShiftsComponent
   */

  public listTimeOff: Array<ITimeOff>;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  /**
   * Creates an instance of ShiftsComponent
   * @param {FlowService} flowService
   * @param {LocalStorageService} localStorage
   * @param {HttpService} httpService
   * @param {DataService} dataService
   * @memberof ShiftsComponent
   */

  constructor(private httpService: HttpService,
              private flowService: FlowService,
              private localStorage: LocalStorageService,
              public dataService: DataService,
              private router: Router) {
  }

  /**
   * Method ngOnInit
   * @returns {void}
   * @memberof ShiftsComponent
   */

  ngOnInit(): void {
    this.flowService.dataSmallSpinner$
      .pipe(
        takeUntil(this.ngUnsubscribe),
        debounceTime(500)
      ).subscribe(this.spinnerShow.bind(this));
    this.flowService.dataSmallSpinner$.next(true);

    for (const i in this.dataService.FLOW_AVAILABILITY) {
      if (this.flowService[`${this.dataService.FLOW_AVAILABILITY[i]}`] === undefined) {
        this.httpService.getAvailability(<ITabTypesAvailability>i);
      }
    }

    if (this.localStorage.retrieve('tabAvailability') !== null) {
      this.tabActive = this.localStorage.retrieve('tabAvailability');
    } else {
      this.localStorage.store('tabAvailability', this.tabActive);
    }

    this.tabIndex = this.dataService.indexTABS_AVAILABILITY.indexOf(this.localStorage.retrieve('tabAvailability'));
    this.tabChange(this.tabActive);
  }

  /**
   * Method for get changes on tab selectedTabChange
   * @returns {void}
   * @param {any} value
   * @memberof ShiftsComponent
   */

  public selectedTabChange(value: any): void {
    console.log(value.index);
    this.tabActive = this.dataService.indexTABS_AVAILABILITY[value.index];
    this.tabChange(this.tabActive);
    this.localStorage.store('tabAvailability', this.dataService.indexTABS_AVAILABILITY[value.index]);
  }


  private tabChange(tab: any) {
    this.flowService[`${this.dataService.FLOW_AVAILABILITY[tab]}`].pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(
      (value) => {
        this.listTimeOff = value['items'];
        this.flowService.dataSmallSpinner$.next(false);
      }
    );
  }

  public showAvailability(event: ITimeOff) {
    this.router.navigate(['/availability/', event.id]);
  }

  /**
   * Method fo show spinner
   * @returns {void}
   * @param {any} event
   * @memberof ShiftsComponent
   */

  public showSideBar(event?: any): void {
    this.flowService.dataSideBar$.next(true);
  }

  /**
   * Method fo show spinner
   * @returns {void}
   * @param {boolean} event
   * @memberof ShiftsComponent
   */

  spinnerShow(event: boolean): void {
    this.spinner = event;
  }

  addNewAvailability() {
    this.router.navigate(['/availability/', 'new']);
  }

  /**
   * Method ngOnDestroy
   * @returns {void}
   * @memberof ShiftsComponent
   */

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
