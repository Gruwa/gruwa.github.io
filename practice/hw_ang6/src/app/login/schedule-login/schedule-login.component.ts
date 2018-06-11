import {
  AfterViewInit,
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {FlowService} from '../../shared/services/flow.service';
import {IGroupRestaurant} from '../../shared/interfaces/group-restaurant.interface';
import {Router} from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage';

/**
 * Schedule Login Component
 */

@Component({
  selector: 'app-schedule-login',
  templateUrl: './schedule-login.component.html',
  styleUrls: ['./schedule-login.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class ScheduleLoginComponent implements OnInit, AfterViewInit {

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

  ngOnInit(): void {
    if (this.flowService.dataLogin$) {
      this.flowService.dataLogin$.subscribe((res: Array<IGroupRestaurant>) => {
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

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.flowService.dataSpinner$.next(false);
    });
  }

  /**
   * Method showShifts
   * @returns {void}
   * @memberof ScheduleLoginComponent
   */

  public showShifts(): void {
    this.flowService.dataSpinner$.next('true');
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

}
