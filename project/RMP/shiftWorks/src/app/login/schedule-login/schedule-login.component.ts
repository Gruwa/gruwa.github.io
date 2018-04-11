import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DataService} from '../../shared/services/data.service';
import {IGroupRestaurant} from '../../shared/interfaces/group-restaurant.interface';

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

  public groups: Array<IGroupRestaurant>;

  constructor(public dataService: DataService) {

  }

  ngOnInit() {
    this.dataService.dataLogin$.subscribe((res: Array<IGroupRestaurant>) => {
      console.log(res);
      this.groups = res;
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataService.dataSpinner$.next(false);
    });
  }

}
