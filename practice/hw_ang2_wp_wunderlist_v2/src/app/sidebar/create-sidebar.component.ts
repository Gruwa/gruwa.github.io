import { Component, EventEmitter, Output  } from '@angular/core';

import { EventService, IEvents, ToggleService } from '../shared/index';


@Component({
    selector: 'side-bar',
    templateUrl: './create-sidebar.component.html'

})

export class CreateSidebarComponent {

    events: IEvents[];
    listToggle: boolean;

    @Output() redPancilClickName = new EventEmitter();

    clickRedPancilName(data: any) {
        this.redPancilClickName.emit(data);
    }

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