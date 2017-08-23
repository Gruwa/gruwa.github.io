import { Component, Input, OnInit } from '@angular/core';
import { EventService, IEventsItem, IEvents, ItemService } from './../../shared';

@Component({
    selector: 'done-item-content',
    templateUrl: './done-item-content.component.html'
})
export class DoneItemContentComponent implements OnInit {

    doneItem: boolean;

    @Input() item: IEventsItem;
    @Input() event: IEvents;

    constructor(private eventService:EventService,
                private itemService: ItemService) {

                }
    ngOnInit() {
        this.doneItem = this.item.done;
    }
    
    deleteItem() {
        this.eventService.deleteItem(this.item, this.event);
    }
    
    
    doneItemFunc() {
        this.doneItem = false;
        this.eventService.doneItemFunc(this.item, this.doneItem);
    }
}