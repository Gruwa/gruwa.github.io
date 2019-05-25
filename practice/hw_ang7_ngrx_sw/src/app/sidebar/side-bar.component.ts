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
import {ToastrService} from 'ngx-toastr';

/**
 * Side Bar Component
 */

@Component({
  selector: 'sw-app-side-bar',
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
   * @memberof SideBarComponent
   */

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  /**
   * Creates an instance of SideBarComponent
   * @param {FlowService} flowService
   * @param {Router} router
   * @param {LocalStorageService} localStorage
   * @param {DataService} dataService,
   * @param {MainService} mainService
   * @param {Location} location
   * @param {ToastrService} toastr
   * @memberof SideBarComponent
   */

  constructor(public flowService: FlowService,
              public dataService: DataService,
              private localStorage: LocalStorageService,
              private router: Router,
              private mainService: MainService,
              public location: Location,
              private toastr: ToastrService) {
  }

  /**
   * Method ngOnInit
   * @returns {void}
   * @memberof SideBarComponent
   */

  public ngOnInit(): void {
    this.flowService.activeItem$.next('shifts');
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

    this.getPath();
  }

  /**
   * Method onClickList
   * @returns {void}
   * @param {any} $event
   * @memberof SideBarComponent
   */

  public onClickList($event?: any): void {
    if (this.mainService.onlineCheck()) {
      if (this.dataService.SIDE_BAR_LIST[$event.description] === this.dataService.SIDE_BAR_LIST['shifts']) {
        this.closeSideBar.emit('iconLeft');
        this.flowService.activeItem$.next('shifts');

        if (this.localStorage.retrieve(this.dataService.LOCAL_STORAGE['group'])) {
          this.router.navigate(['/shifts']);
        } else {
          this.router.navigate(['/login']);
        }
      }
      if (this.dataService.SIDE_BAR_LIST[$event.description] === this.dataService.SIDE_BAR_LIST['logout']) {
        this.closeSideBar.emit('iconLeft');
        this.mainService.logOut();
      }
      if (this.dataService.SIDE_BAR_LIST[$event.description] === this.dataService.SIDE_BAR_LIST['settings']) {
        this.closeSideBar.emit('iconLeft');
        this.router.navigate(['/settings']);
        this.flowService.activeItem$.next('settings');
      }
      if (this.dataService.SIDE_BAR_LIST[$event.description] === this.dataService.SIDE_BAR_LIST['my availability']) {
        this.closeSideBar.emit('iconLeft');
        this.router.navigate(['/availability']);
        this.flowService.activeItem$.next('my availability');
      }
      if (this.dataService.SIDE_BAR_LIST[$event.description] === this.dataService.SIDE_BAR_LIST['contact info']) {
        this.closeSideBar.emit('iconLeft');
        this.router.navigate(['/contactinfo']);
        this.flowService.activeItem$.next('contact info');
      }

    } else {
      this.toastr.info('INTERNET DISCONNECTED');
    }
  }

  /**
   * Method getPath
   * @returns {void}
   * @memberof SideBarComponent
   */

  private getPath(): void {
    const path = this.location.path();
    if (this.localStorage.retrieve(this.dataService.LOCAL_STORAGE['group'])) {
      if (path === '/shifts') {
        this.flowService.activeItem$.next('shifts');
      }
      if (path === '/settings') {
        this.flowService.activeItem$.next('settings');
      }
      if (path === '/availability') {
        this.flowService.activeItem$.next('my availability');
      }
      if (path === '/contactinfo') {
        this.flowService.activeItem$.next('contact info');
      }
    }
  }

  /**
   * Method getActiveItem
   * for change activeItem when change groupID
   * @returns {void}
   * @memberof SideBarComponent
   */

  public getActiveItem(event: string) {
    this.flowService.activeItem$.next(event);
  }

  /**
   * Method ngOnDestroy
   * @returns {void}
   * @memberof SideBarComponent
   */

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
