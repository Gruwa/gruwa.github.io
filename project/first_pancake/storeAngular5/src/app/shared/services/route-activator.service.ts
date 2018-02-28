import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage';
import {MainService} from './main.service';

/**
 * Injectable of MainService
 */

@Injectable()
export class RouteActivatorService implements CanActivate {

  /**
   * Creates an instance of RouteActivatorService.
   * @param {Router} router
   * @param {LocalStorageService} storage
   * @param {MainService} mainService
   * @memberof RouteActivatorService
   */

  constructor(private router: Router,
              private storage: LocalStorageService,
              private mainService: MainService) {
  }

  /**
   * canActivate for secure navigate
   * @param route - contains the information about a route
   * @returns boolean
   * @memberof RouteActivatorService
   */

  canActivate(route: ActivatedRouteSnapshot): boolean {
    this.mainService.loader$.next(true);
    let eventExists: boolean = true;

    if (!this.storage.retrieve('token') || !this.storage.retrieve('activeUser')) {
      eventExists = false;
      this.router.navigate(['/auth/login']);
    }
    this.mainService.loader$.next(false);
    return eventExists;
  }
}
