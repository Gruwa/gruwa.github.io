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
   
    ngAfterContentChecked() {
        // this.toggleService.listToggleFunc(this.listToggle);
    }

    ngDoCheck() {
        this.toggleService.listToggleFunc(this.listToggle);
    }

    ngOnChanges() {
    }

    listToggleFunc() {
        if(this.listToggle === true) {
            return this.listToggle = false;
        } else {
            return this.listToggle = true; 
        }
    }
}