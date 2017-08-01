import { JQ_TOKEN } from '../../common/index';
import { log } from 'util';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { EventService } from '../../shared/event.service';

@Component({
    selector: 'events-list',
    templateUrl: './events-list.component.html'

})

export class EventsListComponent {

    constructor(@Inject(JQ_TOKEN) private $: any) {}

    @Input() goga: any;  // говрорит о том что это объект будет взят из другого копмонента
    @Input() listToggle: boolean;

    length: any;

     eventLength() {
        this.length = this.goga.items.length;
        return this.length;
    }
}