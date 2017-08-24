import { Component, Input, EventEmitter, Output } from '@angular/core';

import { RedPencilService, IEvents } from './../../shared';

@Component({
    selector: 'event-list',
    templateUrl: './events-list.component.html'
})

export class EventsListComponent {
    
    length: number;
    redPencil: boolean;
    showPencil: boolean = false;

    @Input() event: IEvents;  // говрорит о том что это объект будет взят из другого копмонента
    @Input() listToggle: boolean;
    @Output() redPencilName = new EventEmitter();

    constructor(private redPencilService: RedPencilService) {

    }

    eventLength() {
        if(this.event === undefined) {
            this.length = 0;
        } else {
            this.length = this.event.items.length;
        }

        return this.length;
    }
    
    clickRedPencil() {
        this.redPencil = true;
        this.redPencilService.redPencilFunc(this.redPencil);
        this.redPencilService.eventRedPencil(this.event);
        this.redPencilName.emit(this.event);
        
        return this.redPencil;
    }

    showPencilFunc(data: boolean) {
        this.showPencil = data;
    }

}