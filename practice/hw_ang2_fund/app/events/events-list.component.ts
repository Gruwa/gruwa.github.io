import { IEvent } from './shared/event.model';
import { EventService } from './shared/event.service';


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
    templateUrl: '/app/events/events-list.component.html'
})

export class EventsListComponent implements OnInit {
    events:IEvent[];

    constructor (private EventService: EventService, 
            private route:ActivatedRoute) {}

    ngOnInit() {
        this.events = this.route.snapshot.data['events'];
    }
}