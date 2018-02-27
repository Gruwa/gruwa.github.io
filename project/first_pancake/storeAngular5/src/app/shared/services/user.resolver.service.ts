import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {UserService} from './user.service';
import {MainService} from './main.service';
import {LocalStorageService} from 'ngx-webstorage';

@Injectable()
export class UserResolverService implements Resolve<any> {

  constructor(private userService: UserService,
              public storage: LocalStorageService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.userService.getUsers(this.storage.retrieve('tab'));
  }
}
