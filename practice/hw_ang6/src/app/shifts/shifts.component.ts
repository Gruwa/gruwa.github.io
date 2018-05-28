import {
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {HttpService} from '../shared/services/http.service';
import {FlowService} from '../shared/services/flow.service';
import {LocalStorageService} from 'ngx-webstorage';
import {ITabTypes} from '../shared/interfaces/types.interface';
import {Subject} from 'rxjs';
import {
  debounceTime,
  takeUntil
} from 'rxjs/operators';
import {DataService} from '../shared/services/data.service';

/**
 * Shifts Component
 */

@Component({
  selector: 'app-shifts',
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShiftsComponent implements OnInit, OnDestroy {

  /**
   * Variable headerDescription
   * @type {string}
   * @memberof ShiftsComponent
   */

  public headerDescription: string = 'Shifts';

  /**
   * Variable of tab
   * @type {ITabTypes}
   * @memberof ShiftsComponent
   */

  public tab: ITabTypes = 'upcoming';

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
   * @type {string}
   * @memberof ShiftsComponent
   */

  public tabActive: ITabTypes = 'upcoming';

  /**
   * Variable of ngUnsubscribe
   * @type {Subject<void>}
   * @memberof ShiftsComponent
   */

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
              public dataService: DataService) {
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

    if (this.localStorage.retrieve('tab') !== null) {
      console.log(this.localStorage.retrieve('tab'));
      this.tabActive = this.localStorage.retrieve('tab');
    } else {
      this.localStorage.store('tab', this.tabActive);
    }

    this.tabIndex = this.dataService.indexTABS.indexOf(this.localStorage.retrieve('tab'));
  }

  /**
   * Method for get changes on tab selectedTabChange
   * @returns {void}
   * @memberof ShiftsComponent
   */

  selectedTabChange(value: any): void {
    this.tabActive = this.dataService.indexTABS[value.index];
    this.localStorage.store('tab', this.dataService.indexTABS[value.index]);
  }

  /**
   * Method fo show spinner
   * @returns {void}
   * @param {boolean} event
   * @memberof ShiftsComponent
   */

  spinnerShow(event: boolean): void {
    console.log('spinnerShow');
    this.spinner = event;
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
