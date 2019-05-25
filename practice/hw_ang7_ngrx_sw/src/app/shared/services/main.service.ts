import {Injectable} from '@angular/core';
import {LocalStorageService} from 'ngx-webstorage';
import {Router} from '@angular/router';
import {FlowService} from './flow.service';
import {DataService} from './data.service';

/**
 * Main Service
 */

@Injectable({
  providedIn: 'root'
})
export class MainService {

  /**
   * Variable of listFlowClean
   * @type {Array<string>}
   * @memberof MainService
   */

  public listFlowClean: Array<string> = [];

  /**
   * Variable of isOnline
   * @type {Array<string>}
   * @memberof MainService
   */

  private isOnline = false;

  /**
   * Creates an instance of MainService
   * @param {Router} router
   * @param {LocalStorageService} localStorage
   * @param {FlowService} flowService
   * @param {DataService} dataService
   * @memberof MainService
   */

  constructor(private localStorage: LocalStorageService,
              private router: Router,
              private flowService: FlowService,
              private dataService: DataService) {
  }

  /**
   * Method for patch guard shifts
   * @returns {void}
   * @memberof MainService
   */

  public logOut(): void {
    this.localStorage.clear('token');
    this.flowService.dataSideBarClose$.next();
    this.flowService.dataSideBarGroupRestaurants$.next(false);
    this.flowService.dataSmallSpinner$.next(false);
    this.flowService.dataSpinner$.next(false);
    this.flowService.dataSpinnerRestaurants$.next(false);
    this.flowService.dataRestaurants$.next(null);
    this.flowService.dataShiftsUpcoming$ = undefined;
    this.flowService.dataShiftsAvailable$ = undefined;
    this.flowService.dataGroupRestaurants$.next(null);
    this.router.navigate(['/login'], {queryParams: {redirectUrl: this.router.url}});
  }

  /**
   * Method for clean flows
   * @returns {void}
   * @memberof MainService
   */

  public cleanFlows(flow): void {
    if (!this.listFlowClean.find(item => item === flow.description)) {
      this.listFlowClean.push(flow.description);
      setTimeout(() => {
        if (this.flowService[this.dataService.LIST_FLOWS_SWITCH[flow.description]] &&
          flow.description === this.dataService.LIST_FLOWS[flow.description]) {
          if (this.flowService[this.dataService.LIST_FLOWS[flow.description]].observers &&
            this.flowService[this.dataService.LIST_FLOWS[flow.description]].observers.length !== 0) {
            this.listFlowClean.splice(this.listFlowClean.indexOf(flow.description), 1);
            this.flowService[this.dataService.LIST_FLOWS_SWITCH[flow.description]].next('');
          } else {
            this.listFlowClean.splice(this.listFlowClean.indexOf(flow.description), 1);
            this.flowService[this.dataService.LIST_FLOWS_SWITCH[flow.description]].next('pause');
          }
        } else {
          this.flowService[this.dataService.LIST_FLOWS[flow.description]] = undefined;
        }
      }, 600000); // 600000
    }
  }

  /**
   * Method onlineCheck
   * for check internet connection
   * @returns {boolean}
   * @memberof MainService
   */

  onlineCheck(): boolean {
    return navigator.onLine;
  }
}
