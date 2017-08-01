import { log } from 'util';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EventService } from '../../shared/event.service';

@Component({
    selector: 'events-list',
    templateUrl: './events-list.component.html'

})

export class EventsListComponent {

    @Input() goga: any;  // говрорит о том что это объект будет взят из другого копмонента
    @Input() listToggle: boolean;

    options: boolean = false;
    length: any;

    eventListClick() {

        if(this.options) {
            this.options = false;
        } else {
        this.options = true;
        }
    }

    eventLength() {
        this.length = this.goga.items.length;
        return this.length;
    }
}