import { Component, Input, OnInit } from '@angular/core';
import { EventService, IEventsItem, IEvents, ItemService, RedPencilService } from './../../shared';

@Component({
    selector: 'done-item-content',
    templateUrl: './done-item-content.component.html'
})
export class DoneItemContentComponent implements OnInit {

    doneItem: boolean;
    newLists: boolean;

    @Input() item: IEventsItem;
    @Input() event: IEvents;

    constructor(private eventService:EventService,
                private itemService: ItemService,
                private redPencilService: RedPencilService) {

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

    creatNewLists() {
        this.newLists = true;
        this.redPencilService.creatNewLists(this.newLists);
    }
}