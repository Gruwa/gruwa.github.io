import { 
    ActivatedRouteSnapshot, 
    CanActivate, 
    Router 
} from '@angular/router';
import { Injectable } from '@angular/core';

import { UsersService } from './';

@Injectable()
export class RepoRouteActivatorService implements CanActivate{

    constructor(
        private usersService: UsersService, 
        private router:Router) { }

    canActivate(route:ActivatedRouteSnapshot) {

        const repoExists = !!this.usersService.getRepoById(+route.params['id']);

        if(!repoExists) {
            this.router.navigate(['/404']);
        }

        return repoExists;
    }
}