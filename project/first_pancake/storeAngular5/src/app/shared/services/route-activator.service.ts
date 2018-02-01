import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage';

@Injectable()
export class RouteActivatorService implements CanActivate {

  constructor(private router: Router,
              private localStorge: LocalStorageService) {

  }

  canActivate(route: ActivatedRouteSnapshot) {
    let eventExists = true;
    console.log('canActivate', eventExists);

    if (!this.localStorge.retrieve('token') || !this.localStorge.retrieve('activeUser')) {
      eventExists = false;
      this.router.navigate(['/login']);
    }

    return eventExists;
  }
}
