import {
  AfterViewInit,
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

/**
 * Schedule Login Component
 */

@Component({
  selector: 'app-schedule-login',
  templateUrl: './schedule-login.component.html',
  styleUrls: ['./schedule-login.component.scss']

})
export class ScheduleLoginComponent implements OnInit, AfterViewInit, OnDestroy {

  /**
   * Variable headerDescription
   * @type {string}
   * @memberof ScheduleLoginComponent
   */

  public headerDescription: string = 'Choose schedule';

  /**
   * Variable groups
   * @type {Array<IGroupRestaurant>}
   * @memberof ScheduleLoginComponent
   */

  public groups: Array<IGroupRestaurant>;

  /**
   * Variable of spinner
   * @type {boolean}
   * @memberof SideBarComponent
   */

  public spinner: boolean = false;

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
   * @param {MainService} mainService
   * @memberof ScheduleLoginComponent
   */

  constructor(public flowService: FlowService,
              public router: Router,
              public localStorage: LocalStorageService,
              private mainService: MainService) {
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
        this.groups = res;
        this.flowService.dataSmallSpinner$.next(false);
      });
    } else {
      this.mainService.logOut();
    }
  }

  /**
   * Method ngAfterViewInit
   * @returns {void}
   * @memberof ScheduleLoginComponent
   */

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.flowService.dataSpinner$.next(false);
    });
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
  }

  /**
   * Method goBackLogin for go back to login page
   * @param {any} event
   * @returns {void}
   * @memberof ScheduleLoginComponent
   */

  public goBack(event?: any): void {
    this.mainService.logOut();
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
