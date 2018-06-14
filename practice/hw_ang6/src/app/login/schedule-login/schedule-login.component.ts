import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {FlowService} from '../../shared/services/flow.service';
import {IGroupRestaurant} from '../../shared/interfaces/group-restaurant.interface';
import {Router} from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

/**
 * Schedule Login Component
 */

@Component({
  selector: 'app-schedule-login',
  templateUrl: './schedule-login.component.html',
  styleUrls: ['./schedule-login.component.scss'],
  encapsulation: ViewEncapsulation.None

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
   * @memberof ScheduleLoginComponent
   */

  constructor(public flowService: FlowService,
              public router: Router,
              public localStorage: LocalStorageService) {
  }

  /**
   * Method ngOnInit
   * @returns {void}
   * @memberof ScheduleLoginComponent
   */

  public ngOnInit(): void {
    if (this.flowService.dataLogin$) {
      this.flowService.dataLogin$.pipe(
        takeUntil(this.ngUnsubscribe)
      ).subscribe((res: Array<IGroupRestaurant>) => {
        this.groups = res;
      });
    } else {
      this.router.navigate(['/login']);
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

  public showShifts(group?: string): void {
    this.localStorage.store('group', group);
  }

  /**
   * Method goBackLogin for go back to login page
   * @param {any} event
   * @returns {void}
   * @memberof ScheduleLoginComponent
   */

  public goBack(event?: any): void {
    this.localStorage.clear('token');
    this.router.navigate(['/login']);
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