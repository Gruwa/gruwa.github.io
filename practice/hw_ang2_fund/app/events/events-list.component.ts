import { ToastrService } from '../common/toastr.service';
import { EventService } from './shared/event.service';


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
    templateUrl: '/app/events/events-list.component.html'
})

export class EventsListComponent implements OnInit {
    events:any;

    constructor (private EventService: EventService, private toastr: ToastrService, private route:ActivatedRoute) {}

    ngOnInit() {
        this.events = this.route.snapshot.data['events'];
    }

    handleThumbnailClick(eventName) {
        this.toastr.success(eventName);
    }
}