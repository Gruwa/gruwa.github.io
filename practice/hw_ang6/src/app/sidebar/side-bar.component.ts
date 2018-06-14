import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output} from '@angular/core';
import {FlowService} from '../shared/services/flow.service';
import {DataService} from '../shared/services/data.service';
import {LocalStorageService} from 'ngx-webstorage';
import {Router} from '@angular/router';
import {
  debounceTime,
  takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

/**
 * Side Bar Component
 */

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit, OnDestroy {

  /**
   * Variable of groupRestaurantShow
   * @type {boolean}
   * @memberof SideBarComponent
   */

  public groupRestaurantShow: boolean = false;

  /**
   * Variable of spinner
   * @type {boolean}
   * @memberof SideBarComponent
   */

  public spinner: boolean = false;

  /**
   * Variable of closeSideBar
   * @type {EventEmitter<any>}
   * @memberof SideBarComponent
   */

  @Output() closeSideBar: EventEmitter<any> = new EventEmitter();

  /**
   * Variable of ngUnsubscribe
   * @type {Subject<void>}
   * @memberof ScheduleLoginComponent
   */

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  /**
   * Creates an instance of SideBarComponent
   * @param {FlowService} flowService
   * @param {Router} router
   * @param {LocalStorageService} localStorage
   * @param {DataService} dataService
   * @memberof SideBarComponent
   */

  constructor(private flowService: FlowService,
              public dataService: DataService,
              private localStorage: LocalStorageService,
              private router: Router) {
  }

  /**
   * Method ngOnInit
   * @returns {void}
   * @memberof SideBarComponent
   */

  public ngOnInit(): void {
    this.flowService.dataSpinnerRestaurants$.pipe(
      takeUntil(this.ngUnsubscribe),
      debounceTime(500)
    ).subscribe((value) => {
      this.spinner = value;
    });
    this.flowService.dataSideBarGroupRestaurants$.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((next) => {
      this.groupRestaurantShow = next;
    });
  }

  /**
   * Method onClickList
   * @returns {void}
   * @param {any} $event
   * @memberof SideBarComponent
   */

  public onClickList($event?: any): void {
    if (this.dataService.SIDE_BAR_LIST[$event.description] === this.dataService.SIDE_BAR_LIST['shifts']) {
      this.closeSideBar.emit();
    }
    if (this.dataService.SIDE_BAR_LIST[$event.description] === this.dataService.SIDE_BAR_LIST['logout']) {
      this.closeSideBar.emit();
      this.localStorage.clear('token');
      this.router.navigate(['/login']);
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
