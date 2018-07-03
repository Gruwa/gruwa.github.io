import {
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ShiftsService} from '../services/shifts.service';
import {HttpService} from '../../shared/services/http.service';
import {LocalStorageService} from 'ngx-webstorage';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {ITabTypesShifts} from '../../shared/interfaces/types.interface';
import {
  IShift,
  IShiftsSorted
} from '../../shared/interfaces/shift.interface';
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
   * @type {ITabTypesShifts}
   * @memberof ContentShiftsComponent
   */

  public tab: ITabTypesShifts;

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
              public route: ActivatedRoute,
              private dataService: DataService) {
  }

  /**
   * Method ngOnInit
   * @returns {void}
   * @memberof ContentShiftsComponent
   */

  public ngOnInit(): void {
    this.tab = this.dataService.indexTABS[this.tabActive];
    this.getDataShifts();
    this.flowService.dataSideBar$.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((event) => {
      if (event === 'iconLeft') {
        this.getDataShifts();
      }
    });
  }

  /**
   * Method getDataShifts
   * @returns {void}
   * @memberof ContentShiftsComponent
   */

  private getDataShifts(): void {
    this.flowService.dataSmallSpinner$.next(true);
    this.flowService[`${this.dataService.FLOW[this.tab]}`].pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(
      (value) => {
        this.getShifts(value['items']);
      }
    );
  }

  /**
   * Method for get Shifts
   * @returns {void}
   * @memberof ContentShiftsComponent
   */

  private getShifts(value: Array<IShift>): void {
    this.sortShifts = this.shiftsService.sortShifts(value);
  }

  /**
   * Method ngOnDestroy
   * @returns {void}
   * @memberof ContentShiftsComponent
   */

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
