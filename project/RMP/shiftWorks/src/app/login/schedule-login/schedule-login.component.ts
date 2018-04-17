import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DataService} from '../../shared/services/data.service';
import {IGroupRestaurant} from '../../shared/interfaces/group-restaurant.interface';
import {Router} from '@angular/router';

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
   * @param {DataService} dataService
   * @param {Router} router
   * @memberof ScheduleLoginComponent
   */

  constructor(public dataService: DataService,
              public router: Router) {
  }

  /**
   * Method ngOnInit
   * @returns {void}
   * @memberof ScheduleLoginComponent
   */

  ngOnInit() {
    if (this.dataService.dataLogin$ !== undefined) {
      this.dataService.dataLogin$.subscribe((res: Array<IGroupRestaurant>) => {
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

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataService.dataSpinner$.next(false);
    });
  }

  /**
   * Method showShifts
   * @returns {void}
   * @memberof ScheduleLoginComponent
   */

  showShifts(): void {
    this.dataService.dataSpinner$.next('true');
  }

}
