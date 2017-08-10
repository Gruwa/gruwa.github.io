import { Component, Input } from '@angular/core';
import { EventService } from './../../shared/event.service';

@Component({
    selector: 'item-content',
    templateUrl: './item-content.component.html'
})
export class ItemContentComponent {

    constructor(private eventService:EventService) {}

    @Input() items:any;
    
}