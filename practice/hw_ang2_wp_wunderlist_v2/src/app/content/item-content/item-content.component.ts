import { Component, Input } from '@angular/core';
import { EventService, IEventsItem, IEvents } from './../../shared';

@Component({
    selector: 'item-content',
    templateUrl: './item-content.component.html'
})
export class ItemContentComponent {

    @Input() item: IEventsItem;
    @Input() event: IEvents;

    constructor(private eventService:EventService) {}


    deleteItem() {
        this.eventService.deleteItem(this.item, this.event)
    }
    
}