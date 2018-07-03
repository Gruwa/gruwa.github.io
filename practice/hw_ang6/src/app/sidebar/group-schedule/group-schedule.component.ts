import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {IGroupRestaurant} from '../../shared/interfaces/group-restaurant.interface';
import {FlowService} from '../../shared/services/flow.service';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage';
import {HttpService} from '../../shared/services/http.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {DataService} from '../../shared/services/data.service';
import {ITabTypesShifts} from '../../shared/interfaces/types.interface';

/**
 * Group Schedule Component
 */

@Component({
  selector: 'app-group-schedule',
  templateUrl: './group-schedule.component.html',
  styleUrls: ['./group-schedule.component.scss']
})
export class GroupScheduleComponent implements OnInit, OnDestroy {

  /**
   * Variable doneGroup
   * @type {string}
   * @memberof GroupScheduleComponent
   */

  public doneGroup: string;

  /**
   * Variable groups
   * @type {Array<IGroupRestaurant>}
   * @memberof GroupScheduleComponent
   */

  public groups: Array<IGroupRestaurant>;

  /**
   * Variable of ngUnsubscribe
   * @type {Subject<void>}
   * @memberof ScheduleLoginComponent
   */

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  /**
   * Creates an instance of GroupScheduleComponent
   * @param {FlowService} flowService
   * @param {Router} router
   * @param {LocalStorageService} localStorage
   * @param {HttpService} httpService
   * @param {ActivatedRoute} route
   * @param {DataService} dataService
   * @memberof GroupScheduleComponent
   */

  constructor(private flowService: FlowService,
              private router: Router,
              private localStorage: LocalStorageService,
              private httpService: HttpService,
              private route: ActivatedRoute,
              private dataService: DataService) {
  }

  /**
   * Method ngOnInit
   * @returns {void}
   * @memberof GroupScheduleComponent
   */

  public ngOnInit(): void {
    this.flowService.dataSpinnerRestaurants$.next(true);

    if (this.flowService.dataRestaurants$) {
      this.getRestaurants();
    } else {
      this.httpService.getRestaurants();
      this.getRestaurants();
    }
  }

  /**
   * Method getRestaurants
   * @returns {void}
   * @memberof GroupScheduleComponent
   */

  private getRestaurants(): void {
    this.flowService.dataRestaurants$.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((res: Array<IGroupRestaurant>) => {
      this.groups = res;
      this.doneGroup = this.localStorage.retrieve('group').id;
      this.flowService.dataSpinnerRestaurants$.next(false);
    });
  }

  /**
   * Method onClickList
   * @param {any} event
   * @returns {void}
   * @memberof GroupScheduleComponent
   */

  public onClickList(event?: any): void {
    if (this.route.snapshot.children[0].params['group'] !== event.id) {
      for (const i in this.dataService.FLOW) {
        this.flowService[`${this.dataService.FLOW[i]}`] = undefined;
        this.httpService.getShifts(<ITabTypesShifts>i);
        this.httpService.getSettings();
      }
    }

    this.localStorage.store('group', event);
    this.router.navigate(['/' + event.id + '/shifts']);
    this.flowService.dataSideBar$.next('iconLeft');
  }

  /**
   * Method ngOnDestroy
   * @returns {void}
   * @memberof GroupScheduleComponent
   */

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
