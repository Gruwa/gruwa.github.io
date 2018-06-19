import {Injectable} from '@angular/core';
import {LocalStorageService} from 'ngx-webstorage';
import {Router} from '@angular/router';

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
   * @memberof HttpService
   */

  constructor(private localStorage: LocalStorageService,
              private router: Router) {
  }

  /**
   * Method for patch guard shifts
   * @returns {void}
   * @memberof MainService
   */

  public logOut(): void {
    this.localStorage.clear('token');
    this.localStorage.clear('group');
    this.localStorage.clear('user');
    this.localStorage.clear('tab');
    this.router.navigate(['/login']);
  }
}
