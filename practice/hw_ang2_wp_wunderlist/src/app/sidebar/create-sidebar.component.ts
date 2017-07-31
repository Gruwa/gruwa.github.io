import { EventService } from './shared/event.service';
import { Component } from '@angular/core';

@Component({
    selector: 'sidebar',
    templateUrl: './create-sidebar.component.html'

})
export class CreateSidebarComponent {

    events:any [];

    constructor(private eventService: EventService) {
    }

    ngOnInit() {
        this.events = this.eventService.getEvents();
    }
}