import { EventService } from '../shared/event.service';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'side-bar',
    templateUrl: './create-sidebar.component.html'

})
export class CreateSidebarComponent {

    @Output() toggleClick = new EventEmitter();
    @Output() event = new EventEmitter();

    listToggle: boolean = true;
    events:any [];

    constructor(private eventService: EventService) {
    }

    ngOnInit() {
        this.events = this.eventService.getEvents();   
    }


    listToggleFunc() {
        if(this.listToggle) {
            this.listToggle = false;
        }
        else {
            this.listToggle = true;
        }

        this.toggleClick.emit(this.listToggle);
        this.event.emit(this.event);
    }

    getTogle() {
        if(this.listToggle == false) {
            return {'width': '42px'};
        }
    }
}