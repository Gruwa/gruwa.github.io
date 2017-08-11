import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { EventService, IEvents, IEventsItem } from '../../shared/event.service';
import { ToggleService } from './../../shared/toggle.service';

@Component({
    selector: 'event-list',
    templateUrl: './events-list.component.html'

})

export class EventsListComponent {
    
    length: number;
    redPencil: boolean;

    @Input() event: IEvents;  // говрорит о том что это объект будет взят из другого копмонента
    @Input() listToggle: boolean;

    constructor(private toggleService: ToggleService) {

    }

    ngonInit() {
        this.redPencil = this.toggleService.redPencil;
    }

    eventLength() {
        this.length = this.event.items.length;
        return this.length;
    }

    clickRedPencil() {
        this.redPencil = !this.redPencil; 
        this.toggleService.redPencilFunc(this.redPencil);
        // this.toggleService.

        return this.redPencil;
    }

}