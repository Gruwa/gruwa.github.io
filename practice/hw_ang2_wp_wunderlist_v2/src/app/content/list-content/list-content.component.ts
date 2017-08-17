import { Component, Input } from '@angular/core';
import { EventService, IEventsItem } from '../../shared/event.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'list-comp',
    templateUrl: './list-content.component.html'
})

export class ListContentComponent {

    constructor(private eventService:EventService, private route:ActivatedRoute) { }

    event: IEventsItem;

    ngAfterContentChecked() {
        this.event = this.eventService.getEvent(+this.route.snapshot.params['id']);
    }
}