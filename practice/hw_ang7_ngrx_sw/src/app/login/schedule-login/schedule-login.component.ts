import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {FlowService} from '../../shared/services/flow.service';
import {IGroupRestaurant} from '../../shared/interfaces/group-restaurant.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage';
import {
  debounceTime,
  takeUntil
} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {MainService} from '../../shared/services/main.service';
import {HttpService} from '../../shared/services/http.service';
import {DataService} from '../../shared/services/data.service';
import {AuthService} from '../services/auth.service';
import {select, Store} from '@ngrx/store';
import * as fromReducerLogin from '../state/login.reducer';
import * as fromActionLogin from '../state/login.action';
import {ILoginUser, IState} from '../interfaces/login.state.interface';
/**
 * Schedule Login Component
 */

@Component({
  selector: 'sw-app-schedule-login',
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
   * @param {AuthService} authService
   * @memberof ScheduleLoginComponent
   */

  constructor(public flowService: FlowService,
              public router: Router,
              public localStorage: LocalStorageService,
              private mainService: MainService,
              private authService: AuthService,
              private httpService: HttpService,
              public dataService: DataService,
              private store: Store<IState>) {
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
    this.flowService.dataRestaurants$.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((res: Array<IGroupRestaurant>) => {
      if (res) {
        this.groups = res;
        this.flowService.dataSmallSpinner$.next(false);
      }
    });

    if (this.flowService.dataRestaurants$.getValue() === null) {
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

    this.flowService.login$.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(value => {
      if (value) {
            value['groupId'] = group.id;
            value['group'] = group.description;
            value['serverName'] = group.serverName;
            value['unitID'] = group.unitID;
            value['localEmployeeID'] = group.localEmployeeID;
      this.authService.onLogin(value);
      } else {
        this.mainService.logOut();
      }
    });

    this.store.pipe(
      select(fromReducerLogin.getLoginData),
      takeUntil(this.ngUnsubscribe)
    ).subscribe(value => {
      console.log(value);
      if (value) {
        value['groupId'] = group.id;
        value['group'] = group.description;
        value['serverName'] = group.serverName;
        value['unitID'] = group.unitID;
        value['localEmployeeID'] = group.localEmployeeID;
        // this.authService.onLogin(value);
      } else {
        // this.mainService.logOut();
      }
    });

    this.flowService.activeItem$.next('shifts');
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
      this.flowService.buttonAuth$.next(false);
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
