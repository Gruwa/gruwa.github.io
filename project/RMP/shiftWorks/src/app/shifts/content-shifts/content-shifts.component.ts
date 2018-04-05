import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ShiftsService} from '../Services/shifts.service';
import {HttpService} from '../../shared/services/http.service';
import {FakeService} from '../../shared/services/fake.service';
import {LocalStorageService} from 'ngx-webstorage';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/takeUntil';
import {Subject} from 'rxjs/Subject';
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

  @Input() tabActive;
  @Input() tabIndex;

  /**
   * Creates an instance of ContentShiftsComponent
   * @param {HttpClient} http
   * @param {ShiftsService} shiftsService
   * @param {DataService} dataService
   * @param {HttpService} httpService
   * @param {FakeService} fakeService
   * @param {LocalStorageService} localStorage
   * @param {Router} router
   * @memberof ContentShiftsComponent
   */

  constructor(public http: HttpClient,
              public dataService: DataService,
              public shiftsService: ShiftsService,
              public httpService: HttpService,
              public fakeService: FakeService,
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

    this.dataService[`${FLOW[this.tab]}`].takeUntil(this.ngUnsubscribe).subscribe(
      (value) => {
        this.getShifts(value['items']);
      }
    );
  }

  /**
   * Method ngOnDestroy
   * @returns {void}Утпдшыр
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
    console.log('ALL SAVE');
    this.router.navigate(['/shifts', 'new']);
  }
}
