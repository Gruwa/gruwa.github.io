import {
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import {IAvailability} from '../../shared/interfaces/timeoff.interface';
import {Router} from '@angular/router';
import {
  debounceTime,
  takeUntil
} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {LocalStorageService} from 'ngx-webstorage';
import {DataService} from '../../shared/services/data.service';
import {FlowService} from '../../shared/services/flow.service';
import {
  ITabTypesAvailability,
  ITabTypesShifts
} from '../../shared/interfaces/types.interface';
import {HttpService} from '../../shared/services/http.service';

/**
 * List Availability Component
 */

@Component({
  selector: 'sw-app-list-availability',
  templateUrl: './list-availability.component.html',
  styleUrls: ['./list-availability.component.scss']
})
export class ListAvailabilityComponent implements OnInit, OnDestroy {

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
   * Input variable list
   * @type {any}
   * @memberof ListAvailabilityComponent
   */

  @Input() list: any;

  /**
   * Input variable tabActive
   * @type {number}
   * @memberof ListAvailabilityComponent
   */

  @Input() tabActive: number;

  /**
   * Creates an instance of ListAvailabilityComponent
   * @param {FlowService} flowService
   * @param {LocalStorageService} localStorage
   * @param {DataService} dataService
   * @param {Router} router
   * @param {HttpService} httpService
   * @memberof ListAvailabilityComponent
   */

  constructor(private router: Router,
              private httpService: HttpService,
              public flowService: FlowService,
              private localStorage: LocalStorageService,
              public dataService: DataService) {
  }

  /**
   * Method ngOnInit
   * @returns {void}
   * @memberof ListAvailabilityComponent
   */

  public ngOnInit(): void {
    this.tab = this.dataService.indexTABS_AVAILABILITY[this.tabActive];
    this.flowService.dataSmallSpinner$.next(true);

    this.flowService.dataAvailability$.pipe(
      takeUntil(this.ngUnsubscribe),
      debounceTime(1)
    ).subscribe(value => {
      if (value) {
        this.flowService.dataSmallSpinner$.next(false);
      }
    });
  }

  /**
   * Method for show availability
   * @returns {void}
   * @param {IAvailability} event
   * @memberof ListAvailabilityComponent
   */

  public showAvailability(event: IAvailability): void {
    this.router.navigate(['/availability/', event.id]);
  }

  /**
   * Method ngOnDestroy
   * @returns {void}
   * @memberof ListAvailabilityComponent
   */

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
