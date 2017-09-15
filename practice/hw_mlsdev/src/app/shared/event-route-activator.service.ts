import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { UsersService } from './';

@Injectable()
export class EventRouteActivatorService implements CanActivate{

    constructor(private usersService: UsersService, private router:Router) { }

    canActivate(route:ActivatedRouteSnapshot) {

        const eventExists = !!this.usersService.getUserById(+route.params['id']);

        if(!eventExists) {
            this.router.navigate(['/404'])
        }

        return eventExists
    }
}