import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {FlowService} from '../../shared/services/flow.service';
import {IGroupRestaurant} from '../../shared/interfaces/group-restaurant.interface';
import {Router} from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage';
import {
  debounceTime,
  takeUntil
} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {MainService} from '../../shared/services/main.service';
import {ITabTypesShifts} from '../../shared/interfaces/types.interface';
import {HttpService} from '../../shared/services/http.service';
import {DataService} from '../../shared/services/data.service';

/**
 * Schedule Login Component
 */

@Component({
  selector: 'app-schedule-login',
  templateUrl: './schedule-login.component.html',
  styleUrls: ['./schedule-login.component.scss']

})
export class ScheduleLoginComponent implements OnInit, OnDestroy {

  /**
   * Variable descriptionLeft
   * @type {string}
   * @memberof ScheduleLoginComponent
   */

  public descriptionLeft: string = 'Choose schedule';

  /**
   * Variable groups
   * @type {Array<IGroupRestaurant>}
   * @memberof ScheduleLoginComponent
   */

  public groups: Array<IGroupRestaurant>;

  /**
   * Variable of spinner
   * @type {boolean}
   * @memberof ScheduleLoginComponent
   */

  public spinner: boolean = false;

  /**
   * Variable of iconLeft
   * @type {boolean}
   * @memberof ScheduleLoginComponent
   */

  public iconLeft: string = 'arrow_back';

  /**
   * Variable of ngUnsubscribe
   * @type {Subject<void>}
   * @memberof ScheduleLoginComponent
   */

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  /**
   * Creates an instance of ScheduleLoginComponent
   * @param {FlowService} flowService
   * @param {Router} router
   * @param {LocalStorageService} localStorage
   * @param {HttpService} httpService
   * @param {DataService} dataService
   * @param {MainService} mainService
   * @memberof ScheduleLoginComponent
   */

  constructor(public flowService: FlowService,
              public router: Router,
              public localStorage: LocalStorageService,
              private mainService: MainService,
              private httpService: HttpService,
              public dataService: DataService) {
  }

  /**
   * Method ngOnInit
   * @returns {void}
   * @memberof ScheduleLoginComponent
   */

  public ngOnInit(): void {
    this.flowService.dataSmallSpinner$.pipe(
      takeUntil(this.ngUnsubscribe),
      debounceTime(500)
    ).subscribe((value) => {
      this.spinner = value;
    });
    this.flowService.dataSmallSpinner$.next(true);

    if (this.flowService.dataRestaurants$) {
      this.flowService.dataRestaurants$.pipe(
        takeUntil(this.ngUnsubscribe)
      ).subscribe((res: Array<IGroupRestaurant>) => {
        if (res.length === 1) {
          this.showShifts(res[0]);
        }

        this.groups = res;
        this.flowService.dataSmallSpinner$.next(false);
      });
    } else {
      this.mainService.logOut();
    }
  }

  /**
   * Method showShifts
   * @returns {void}
   * @param {string} group
   * @memberof ScheduleLoginComponent
   */

  public showShifts(group?: IGroupRestaurant): void {
    this.router.navigate(['/', group.id, 'shifts']);
    this.localStorage.store('group', group);

    for (const i in this.dataService.FLOW) {
      this.flowService[`${this.dataService.FLOW[i]}`] = undefined;
      this.httpService.getShifts(<ITabTypesShifts>i);
    }
  }

  /**
   * Method goBackLogin for go back to login page
   * @param {any} event
   * @returns {void}
   * @memberof ScheduleLoginComponent
   */

  public goBack(event?: any): void {
    if (event === 'iconLeft') {
      this.mainService.logOut();
    }
  }

  /**
   * Method ngOnDestroy
   * @returns {void}
   * @memberof ScheduleLoginComponent
   */

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
