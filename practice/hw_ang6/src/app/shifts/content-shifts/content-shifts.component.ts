import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ShiftsService} from '../Services/shifts.service';
import {HttpService} from '../../shared/services/http.service';
import {LocalStorageService} from 'ngx-webstorage';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ITabTypes} from '../../shared/interfaces/types.interface';
import {IShift, IShiftsSorted} from '../../shared/interfaces/shift.interface';
import {DataService} from '../../shared/services/data.service';

/**
 * FLOW for api link
 */

const FLOW = {
  upcoming: 'dataShiftsUpcoming$',
  'my requests': 'dataShiftsMyReq$',
  available: 'dataShiftsAvailable$'
};

/**
 * TABS for navigate
 */

const TABS: Array<ITabTypes> = [
  'upcoming',
  'my requests',
  'available'
];

/**
 * Content Shifts Component
 */

@Component({
  selector: 'app-content-shifts',
  templateUrl: './content-shifts.component.html',
  styleUrls: ['./content-shifts.component.scss']
})
export class ContentShiftsComponent implements OnInit, OnDestroy {

  /**
   * Variable of tab
   * @type {ITabTypes}
   * @memberof ContentShiftsComponent
   */

  public tab: ITabTypes;

  /**
   * Variable of sortShifts
   * @type {Array<IShiftsSorted>}
   * @memberof ContentShiftsComponent
   */

  public sortShifts: Array<IShiftsSorted>;

  /**
   * Variable of ngUnsubscribe
   * @type {Subject<void>}
   * @memberof ContentShiftsComponent
   */

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  /**
   * Input variable tabActive
   * @type {any}
   * @memberof ContentShiftsComponent
   */

  @Input() tabActive;

  /**
   * Creates an instance of ContentShiftsComponent
   * @param {HttpClient} http
   * @param {ShiftsService} shiftsService
   * @param {DataService} dataService
   * @param {HttpService} httpService
   * @param {LocalStorageService} localStorage
   * @param {Router} router
   * @param {ActivatedRoute} route
   * @memberof ContentShiftsComponent
   */

  constructor(public http: HttpClient,
              public dataService: DataService,
              public shiftsService: ShiftsService,
              public httpService: HttpService,
              public router: Router,
              public localStorage: LocalStorageService,
              public route: ActivatedRoute) {
  }

  /**
   * Method ngOnInit
   * @returns {void}
   * @memberof ContentShiftsComponent
   */

  ngOnInit(): void {
    this.tab = TABS[this.tabActive];

    for (const i in FLOW) {
      if (this.dataService[`${FLOW[i]}`] === undefined) {
        this.httpService.getShifts(<ITabTypes>i);
      }
    }

    this.dataService.dataSmallSpinner$.next(true);

    this.dataService[`${FLOW[this.tab]}`].pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (value) => {
        this.getShifts(value['items']);
      }
    );
  }

  /**
   * Method ngOnDestroy
   * @returns {void}
   * @memberof ContentShiftsComponent
   */

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  /**
   * Method for get Shifts
   * @returns {void}
   * @memberof ContentShiftsComponent
   */

  getShifts(value: Array<IShift>) {
    this.sortShifts = this.shiftsService.sortShifts(value);
    console.log('sortShifts', this.sortShifts);
  }

  /**
   * Method for add new request
   * @returns {void}
   * @memberof ContentShiftsComponent
   */

  addNewMyRequest() {
    this.router.navigate(['/' + this.route.snapshot.params['group'], 'shifts', 'new']);
  }
}
