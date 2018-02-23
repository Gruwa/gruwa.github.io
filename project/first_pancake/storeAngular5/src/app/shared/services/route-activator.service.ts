import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage';
import {MainService} from './main.service';

@Injectable()
export class RouteActivatorService implements CanActivate {

  constructor(private router: Router,
              private localStorge: LocalStorageService,
              private mainService: MainService) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    this.mainService.loader$.next(true);
    let eventExists: boolean = true;

    if (!this.localStorge.retrieve('token') || !this.localStorge.retrieve('activeUser')) {
      eventExists = false;
      this.router.navigate(['/auth/login']);
    }
    this.mainService.loader$.next(false);
    return eventExists;
  }
}
