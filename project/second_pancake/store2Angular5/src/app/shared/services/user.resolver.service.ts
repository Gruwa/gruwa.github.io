import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {UserService} from './user.service';
import {LocalStorageService} from 'ngx-webstorage';

@Injectable()
export class UserResolverService implements Resolve<any> {

  /**
   * Creates an instance of UserResolverService.
   * @param {userService} userService
   * @param {LocalStorageService} storage
   * @memberof UserResolverService
   */

  constructor(private userService: UserService,
              public storage: LocalStorageService) {
  }

  /**
   * Resolve of tab-page component
   * @param route - contains the information about a route
   * @param state - represents the state of the router at a moment in time.
   * @memberof UserResolverService
   */

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.userService.getUsers(this.storage.retrieve('tab'));
  }
}
