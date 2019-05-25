import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
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
import {DataService} from '../../shared/services/data.service';
import {ToastrService} from 'ngx-toastr';
import {MainService} from '../../shared/services/main.service';

/**
 * Group Schedule Component
 */

@Component({
  selector: 'sw-app-group-schedule',
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
   * Output action from Active Item
   * @memberof SmallListComponent
   */

  @Output() outputActiveItem: EventEmitter<any> = new EventEmitter();

  /**
   * Creates an instance of GroupScheduleComponent
   * @param {FlowService} flowService
   * @param {Router} router
   * @param {LocalStorageService} localStorage
   * @param {HttpService} httpService
   * @param {ActivatedRoute} route
   * @param {DataService} dataService
   * @param {ToastrService} toastr
   * @param {MainService} mainService
   * @memberof GroupScheduleComponent
   */

  constructor(private flowService: FlowService,
              private router: Router,
              private localStorage: LocalStorageService,
              private httpService: HttpService,
              private route: ActivatedRoute,
              private dataService: DataService,
              private toastr: ToastrService,
              private mainService: MainService) {
  }

  /**
   * Method ngOnInit
   * @returns {void}
   * @memberof GroupScheduleComponent
   */

  public ngOnInit(): void {
    this.flowService.dataSpinnerRestaurants$.next(true);
    this.getRestaurants();
  }

  /**
   * Method getRestaurants
   * @returns {void}
   * @memberof GroupScheduleComponent
   */

  private getRestaurants(): void {
    this.groups = this.localStorage.retrieve('GroupRestaurants');
    this.doneGroup = this.localStorage.retrieve(this.dataService.LOCAL_STORAGE['group']).id;
    this.flowService.dataSpinnerRestaurants$.next(false);

  }

  /**
   * Method onClickList
   * @param {any} event
   * @returns {void}
   * @memberof GroupScheduleComponent
   */

  public onClickList(event?: any): void {
    if (this.mainService.onlineCheck()) {
      if (this.localStorage.retrieve('group').id !== event.id) {
        this.flowService.dataPopupActive$.next(true);
        this.flowService.dataSideBar$.next('iconLeft');
        this.flowService.dataGroupRestaurants$.next(event);
      } else {
        this.router.navigate(['/shifts']);
        this.flowService.dataSideBar$.next('iconLeft');
      }
    } else {
      this.toastr.info('INTERNET DISCONNECTED');
    }
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
