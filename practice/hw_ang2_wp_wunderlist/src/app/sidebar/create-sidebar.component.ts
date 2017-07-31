import { EventService } from './shared/event.service';
import { Component } from '@angular/core';

@Component({
    selector: 'main',
    templateUrl: './create-sidebar.component.html'

})
export class CreateSidebarComponent {

    events:any [];

    constructor(private eventService: EventService) {
    }

    ngOnInit() {
        this.events = this.eventService.getEvents();
    }

    listToggle: boolean = true;

    listToggleFunc() {
        if(this.listToggle) {
            this.listToggle = false;
        }
        else {
            this.listToggle = true;
        }
    }

    getTogle() {
        if(this.listToggle == false) {
            return {'width': '42px'};
        }
    }

    getTogleContent() {
        if(this.listToggle == false) {
            return {'margin-left': '42px'};
        }
    }
}