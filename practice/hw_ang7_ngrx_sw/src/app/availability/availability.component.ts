import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {HttpService} from '../shared/services/http.service';
import {FlowService} from '../shared/services/flow.service';
import {
  Subject
} from 'rxjs';
import {DataService} from '../shared/services/data.service';
import {
  debounceTime,
  takeUntil
} from 'rxjs/operators';
import {LocalStorageService} from 'ngx-webstorage';
import {ITabTypesAvailability} from '../shared/interfaces/types.interface';
import {Router} from '@angular/router';
import {AvailabilityService} from './services/availability.service';

/**
 * Availability Component
 */

@Component({
  selector: 'sw-app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss']
})
export class AvailabilityComponent implements OnInit, OnDestroy {

  /**
   * Variable of spinner
   * @type {string}
   * @memberof AvailabilityComponent
   */

  public iconLeft: string = 'menu';

  /**
   * Variable headerDescription
   * @type {string}
   * @memberof AvailabilityComponent
   */

  public descriptionLeft: string = 'my availability';

  /**
   * Variable of tab
   * @type {ITabTypesShifts}
   * @memberof AvailabilityComponent
   */

  public tab: ITabTypesAvailability = 'time off';

  /**
   * Variable of tabIndex
   * @type {number}
   * @memberof AvailabilityComponent
   */

  public tabIndex: number;

  /**
   * Variable spinner
   * @type {boolean}
   * @memberof AvailabilityComponent
   */

  public spinner: boolean = false;

  /**
   * Variable of tabActive
   * @type {ITabTypesShifts}
   * @memberof AvailabilityComponent
   */

  public tabActive: ITabTypesAvailability = 'time off';

  /**
   * Variable of ngUnsubscribe
   * @type {Subject<void>}
   * @memberof AvailabilityComponent
   */

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  /**
   * Creates an instance of AvailabilityComponent
   * @param {FlowService} flowService
   * @param {LocalStorageService} localStorage
   * @param {HttpService} httpService
   * @param {DataService} dataService
   * @param {Router} router
   * @param {AvailabilityService} availabilityService
   * @memberof AvailabilityComponent
   */

  constructor(private httpService: HttpService,
              public flowService: FlowService,
              private localStorage: LocalStorageService,
              public dataService: DataService,
              private router: Router,
              private availabilityService: AvailabilityService) {
  }

  /**
   * Method ngOnInit
   * @returns {void}
   * @memberof AvailabilityComponent
   */

  public ngOnInit(): void {
    this.flowService.dataSmallSpinner$
      .pipe(
        takeUntil(this.ngUnsubscribe),
        debounceTime(500)
      ).subscribe(this.spinnerShow.bind(this));
    this.flowService.dataSmallSpinner$.next(true);

    if (this.localStorage.retrieve(this.dataService.LOCAL_STORAGE['tabavailability']) !== null) {
      this.tabActive = this.localStorage.retrieve(this.dataService.LOCAL_STORAGE['tabavailability']);
    } else {
      this.localStorage.store('tabAvailability', this.tabActive);
    }

    this.tabIndex = this.dataService.indexTABS_AVAILABILITY.indexOf(
      this.localStorage.retrieve(this.dataService.LOCAL_STORAGE['tabavailability']));

    if (!this.localStorage.retrieve('group') ||
      this.httpService.availability !== this.localStorage.retrieve('group').activeId ||
      this.flowService.dataAvailabilitySwitch$.getValue() === 'pause') {
      this.flowService.dataAvailabilitySwitch$.next('');
    }
  }

  /**
   * Method for get changes on tab selectedTabChange
   * @returns {void}
   * @param {any} value
   * @memberof AvailabilityComponent
   */

  public selectedTabChange(value: any): void {
    this.tabActive = this.dataService.indexTABS_AVAILABILITY[value.index];
    this.localStorage.store('tabAvailability', this.dataService.indexTABS_AVAILABILITY[value.index]);
  }

  /**
   * Method fo show spinner
   * @returns {void}
   * @param {any} event
   * @memberof AvailabilityComponent
   */

  public showSideBar(event?: any): void {
    this.flowService.dataSideBar$.next('iconLeft');
  }

  /**
   * Method fo show spinner
   * @returns {void}
   * @param {boolean} event
   * @memberof AvailabilityComponent
   */

  private spinnerShow(event: boolean): void {
    this.spinner = event;
  }

  /**
   * Method for add new availability
   * @returns {void}
   * @memberof AvailabilityComponent
   */

  public addNewAvailability(): void {
    this.router.navigate(['/availability/', 'new']);
  }

  /**
   * Method ngOnDestroy
   * @returns {void}
   * @memberof AvailabilityComponent
   */

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
