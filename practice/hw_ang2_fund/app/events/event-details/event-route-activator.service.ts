import { EventService } from '../shared/event.service';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable()
export class EventRouterActivator implements CanActivate {

    constructor(private EventService:EventService, private router:Router) { }

    canActivate(route:ActivatedRouteSnapshot) {
        const eventExists = !!this.EventService.getEvent(+route.params['id']);

        if (!eventExists) this.router.navigate(['/404'])

        return eventExists;
    }
}