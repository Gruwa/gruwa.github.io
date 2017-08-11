import { EventService, IEvents } from '../shared/event.service';
import { ToggleService } from '../shared/toggle.service';

import { Component } from '@angular/core';

@Component({
    selector: 'side-bar',
    templateUrl: './create-sidebar.component.html'

})

export class CreateSidebarComponent {

    events: IEvents[];
    listToggle: boolean;

    constructor(private eventService: EventService, private toggleService: ToggleService) {
    }

    ngOnInit() {
        this.events = this.eventService.getEvents();
        this.listToggle = this.toggleService.listToggle;
    }
    
    clickListToggleFunc() {
        this.listToggle = !this.listToggle;
        this.toggleService.listToggleFunc(this.listToggle);
        return this.listToggle;
    }
}