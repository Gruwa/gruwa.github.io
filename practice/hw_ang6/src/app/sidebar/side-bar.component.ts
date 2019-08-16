import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {Location} from '@angular/common';
import {FlowService} from '../shared/services/flow.service';
import {DataService} from '../shared/services/data.service';
import {LocalStorageService} from 'ngx-webstorage';
import {Router} from '@angular/router';
import {
  debounceTime,
  takeUntil
} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {MainService} from '../shared/services/main.service';

/**
 * Side Bar Component
 */

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit, OnDestroy {

  public activeItem: string;

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
   * @param {DataService} dataService,
   * @param {MainService} mainService
   * @memberof SideBarComponent
   */

  constructor(private flowService: FlowService,
              public dataService: DataService,
              private localStorage: LocalStorageService,
              private router: Router,
              private mainService: MainService,
              public location: Location) {
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
    //this.activeItem = this.getPath();
  }

  /**
   * Method onClickList
   * @returns {void}
   * @param {any} $event
   * @memberof SideBarComponent
   */

  public onClickList($event?: any): void {
    if (this.dataService.SIDE_BAR_LIST[$event.description] === this.dataService.SIDE_BAR_LIST['shifts']) {
      this.closeSideBar.emit('iconLeft');
      this.router.navigate([this.localStorage.retrieve('group').id + '/shifts']);
      // this.activeItem = 'shifts';
    }
    if (this.dataService.SIDE_BAR_LIST[$event.description] === this.dataService.SIDE_BAR_LIST['logout']) {
      this.closeSideBar.emit('iconLeft');
      this.mainService.logOut();
    }
    if (this.dataService.SIDE_BAR_LIST[$event.description] === this.dataService.SIDE_BAR_LIST['settings']) {
      this.closeSideBar.emit('iconLeft');
      this.router.navigate(['/settings']);
      // this.activeItem = 'settings';
    }
    if (this.dataService.SIDE_BAR_LIST[$event.description] === this.dataService.SIDE_BAR_LIST['my availability']) {
      this.closeSideBar.emit('iconLeft');
      this.router.navigate(['/availability']);
      // this.activeItem = 'my availability';
    }
    if (this.dataService.SIDE_BAR_LIST[$event.description] === this.dataService.SIDE_BAR_LIST['contact info']) {
      this.closeSideBar.emit('iconLeft');
      this.router.navigate(['/contactinfo']);
      // this.activeItem = 'contact info';
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

  // private getPath(): string {
  //   let path = this.location.path().split('/'); // /availability ['', 'availability'] // /1234_LoneStar101/shifts ['', '/shifts ['', '', 'shifts']
  //   let activeItem = path[1];
  //   if (path[2] === this.dataService.SIDE_BAR_LIST['shifts']) activeItem = path[2];
  //   activeItem = this.getKeyByValue(this.dataService.SIDE_BAR_LIST, activeItem);
  //
  //   return activeItem;
  // }
  //
  // private getKeyByValue(object, value) {
  //   return Object.keys(object).find(key => object[key] === value);
  // }
}
