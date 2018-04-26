import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpService} from '../shared/services/http.service';
import {DataService} from '../shared/services/data.service';
import {LocalStorageService} from 'ngx-webstorage';
import {ITabTypes} from '../shared/interfaces/types.interface';
import {Subject} from 'rxjs/Subject';
import {interval} from 'rxjs/observable/interval';
import 'rxjs/operator/throttle';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/debounceTime';

/**
 * TABS for navigate
 */

const TABS: Array<ITabTypes> = [
  'upcoming',
  'my requests',
  'available'
];

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
   * Variable tabsTitle
   * @type {Array<ITabTypes>}
   * @memberof ShiftsComponent
   */

  public tabsTitle: Array<ITabTypes> = ['upcoming', 'my requests', 'available'];

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
   * @param {LocalStorageService} dataService
   * @param {LocalStorageService} localStorage
   * @param {HttpService} httpService
   * @memberof ShiftsComponent
   */

  constructor(public httpService: HttpService,
              public dataService: DataService,
              public localStorage: LocalStorageService) {
  }

  /**
   * Method ngOnInit
   * @returns {void}
   * @memberof ShiftsComponent
   */

  ngOnInit(): void {
    this.dataService.dataSmallSpinner$.takeUntil(this.ngUnsubscribe)
      .debounceTime(500)
      .subscribe(this.spinnerShow.bind(this));
    this.dataService.dataSmallSpinner$.next(true);

    if (this.localStorage.retrieve('tab') !== null) {
      this.tabActive = this.localStorage.retrieve('tab');
    } else {
      this.localStorage.store('tab', this.tabActive);
    }
    this.tabIndex = TABS.indexOf(this.localStorage.retrieve('tab'));
  }

  /**
   * Method for get changes on tab selectedTabChange
   * @returns {void}
   * @memberof ShiftsComponent
   */

  selectedTabChange(value: any): void {
    this.tabActive = TABS[value.index];
    this.localStorage.store('tab', TABS[value.index]);
    console.log(this.localStorage.retrieve('tab'));
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
