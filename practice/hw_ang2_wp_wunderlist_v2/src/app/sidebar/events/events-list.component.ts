import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { EventService, IEvents, IEventsItem } from '../../shared/event.service';

@Component({
    selector: 'event-list',
    templateUrl: './events-list.component.html'

})

export class EventsListComponent {
    
    length: number;

    @Input() event: IEvents;  // говрорит о том что это объект будет взят из другого копмонента
    @Input() listToggle: boolean;

    eventLength() {
        this.length = this.event.items.length;
        return this.length;
    }
}