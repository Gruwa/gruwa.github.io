import { Component, EventEmitter, Input } from '@angular/core';
import { EventService, IEventsItem, IEvents, ItemService } from './../../shared';

@Component({
    selector: 'item-content',
    templateUrl: './item-content.component.html'
})
export class ItemContentComponent {

    doneItem: boolean;
    starItem: boolean;

    @Input() item: IEventsItem;
    @Input() event: IEvents;

    constructor(private eventService:EventService,
                private itemService: ItemService) {

        }
                
    ngOnInit() {
        this.doneItem = this.item.done;
        this.starItem = this.item.star;
    }
    
    deleteItem() {
        this.eventService.deleteItem(this.item, this.event);
    }    
    
    doneItemFunc() {
        this.doneItem = true;
        this.eventService.doneItemFunc(this.item, this.doneItem);
    }

    starItemFunc() {
        this.starItem = !this.starItem;
        this.eventService.starItemFunc(this.starItem, this.item, this.event);
    }
}