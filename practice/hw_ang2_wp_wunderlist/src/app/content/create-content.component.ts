import { Component, Input } from '@angular/core';
import { EventService } from '../shared/event.service';
import { ActivatedRoute } from '@angular/router';
import { CreateSidebarComponent } from '../sidebar/index';

@Component({
    selector: 'main-content',
    templateUrl: './create-content.component.html'
})
export class CreateContentComponent {

    constructor(private eventService:EventService, private route:ActivatedRoute) { }

    event: any;
    events: any;

    ngOnInit() {
        this.event = this.eventService.getEvent(+this.route.snapshot.params['id']);
        console.log(this.event);
        this.events = this.eventService.getEvents();
        console.log(this.events);
        // this.events = this.eventService.getEvents();
    }

}