import { ToastrService } from '../common/toastr.service';
import { EventService } from './shared/event.service';


import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'events-list',
    templateUrl: '/app/events/events-list.component.html'
})
export class EventsListComponent implements OnInit {
    events:any[]

    constructor (private EventService: EventService, private toastr: ToastrService) {}

    ngOnInit() {
        this.events = this.EventService.getEvent();
    }

    handleThumbnailClick(eventName) {
        this.toastr.success(eventName);
    }
}