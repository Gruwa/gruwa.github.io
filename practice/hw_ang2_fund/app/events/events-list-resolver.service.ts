import { EventService } from './shared/event.service';

import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { resolve } from 'dns';

@Injectable()
export class EventListResolver implements Resolve<any> {

    constructor(private eventService:EventService) {

     }

    resolve() {
        
       return this.eventService.getEvents();
    } 
}