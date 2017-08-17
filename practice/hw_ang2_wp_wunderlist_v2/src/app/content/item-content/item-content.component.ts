import { Component, Input } from '@angular/core';
import { EventService, IEventsItem } from './../../shared';

@Component({
    selector: 'item-content',
    templateUrl: './item-content.component.html'
})
export class ItemContentComponent {

    constructor(private eventService:EventService) {}

    @Input() items: IEventsItem;
    
}