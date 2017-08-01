import { Component, Input } from '@angular/core';
import { EventService } from '../../shared/event.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    // selector: 'list-comp',
    templateUrl: './list-content.component.html'
})

export class ListContentComponent {

    // events:any [];
    
    // constructor(private eventService:EventService) {
        
    // }

    //  ngOnInit() {
    //     this.events = this.eventService.getEvents();
    // }
    
    // items:any [];
    // event: any;
    // events: any;

    // constructor(private eventService:EventService, private route:ActivatedRoute) {
            
    //     }
    // ngOnInit() {
    //         this.event = this.eventService.getEvent(+this.route.snapshot.params['id']);
    //     console.log(this.event);
    //     this.events = this.eventService.getEvents();
    //     console.log(this.events);
    //     // this.events = this.eventService.getEvents();
    // }
    
}