import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ShiftsService} from '../services/shifts.service';
import {HttpService} from '../../shared/services/http.service';
import {LocalStorageService} from 'ngx-webstorage';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/takeUntil';
import {Subject} from 'rxjs/Subject';
import {ITabTypes} from '../../shared/interfaces/types.interface';
import {IShift, IShiftsSorted} from '../../shared/interfaces/shift.interface';
import {FlowService} from '../../shared/services/flow.service';
import {DataService} from '../../shared/services/data.service';

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
   * @param {FlowService} flowService
   * @param {HttpService} httpService
   * @param {LocalStorageService} localStorage
   * @param {Router} router
   * @param {ActivatedRoute} route
   * @param {DataService} dataService
   * @memberof ContentShiftsComponent
   */

  constructor(private http: HttpClient,
              private flowService: FlowService,
              private shiftsService: ShiftsService,
              private httpService: HttpService,
              private router: Router,
              private localStorage: LocalStorageService,
              private route: ActivatedRoute,
              private dataService: DataService) {
  }

  /**
   * Method ngOnInit
   * @returns {void}
   * @memberof ContentShiftsComponent
   */

  ngOnInit(): void {
    this.tab = this.dataService.indexTABS[this.tabActive];

    for (const i in this.dataService.FLOW) {
      if (this.flowService[`${this.dataService.FLOW[i]}`] === undefined) {
        this.httpService.getShifts(<ITabTypes>i);
      }
    }

    this.flowService.dataSmallSpinner$.next(true);
    this.flowService[`${this.dataService.FLOW[this.tab]}`].takeUntil(this.ngUnsubscribe).subscribe(
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
