import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {UserService} from './user.service';
import {MainService} from './main.service';

@Injectable()
export class UserResolverService implements Resolve<any> {

  constructor(private userService: UserService,
              public mainService: MainService) {
    this.mainService.loader$.next(true);
  }

  resolve() {
    this.mainService.loader$.next(false);
    return this.userService.getUsers();
  }
}
