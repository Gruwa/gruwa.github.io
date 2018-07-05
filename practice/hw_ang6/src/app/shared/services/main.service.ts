import {Injectable} from '@angular/core';
import {LocalStorageService} from 'ngx-webstorage';
import {Router} from '@angular/router';
import {FlowService} from './flow.service';

/**
 * Main Service
 */

@Injectable({
  providedIn: 'root'
})
export class MainService {

  /**
   * Creates an instance of HttpService
   * @param {Router} router
   * @param {LocalStorageService} localStorage
   * @param {FlowService} flowService
   * @memberof HttpService
   */

  constructor(private localStorage: LocalStorageService,
              private router: Router,
              private flowService: FlowService) {
  }

  /**
   * Method for patch guard shifts
   * @returns {void}
   * @memberof MainService
   */

  public logOut(): void {
    this.localStorage.clear('token');
    this.localStorage.clear('user');
    this.flowService.dataSideBarClose$.next();
    this.flowService.dataSideBarGroupRestaurants$.next(false);
    this.flowService.dataSmallSpinner$.next(false);
    this.flowService.dataSpinner$.next(false);
    this.flowService.dataSpinnerRestaurants$.next(false);
    this.flowService.dataRestaurants$ = undefined;
    this.flowService.dataContactInfo$ = undefined;
    this.flowService.dataShiftsUpcoming$ = undefined;
    this.flowService.dataShiftsAvailable$ = undefined;
    this.flowService.dataSettings$ = undefined;
    this.flowService.dataTimeOff$ = undefined;
    this.flowService.dataVolunteer$ = undefined;
    this.router.navigate(['/login'], {queryParams: {redirectUrl: this.router.url}});
  }
}
