import { JQ_TOKEN } from '../../common/jQuery.service';
import { IEvent, ISession } from '../shared/index';
import { EventService } from '../shared/event.service';

import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../user/auth.service';

@Component({
    templateUrl: '/app/events/event-details/event-details.component.html',
    styles: [`
        .container { padding-left:20px; padding-right:20px;}
        .event-image { height:100px; }
        a { cursor:pointer; }
    `]
})

export class EventDetailsComponent implements OnInit {
    event: IEvent;
    addMode: boolean;
    filterBy: string = 'all';
    sortBy: string = 'votes';

    constructor(private eventService:EventService, private route:ActivatedRoute,
        private auth: AuthService, @Inject(JQ_TOKEN) private $: any) { }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.event = this.eventService.getEvent(+this.route.snapshot.params['id']);
            this.addMode = false;
        });
     }

    addSession() {
         this.addMode = true;
     }

    saveNewSession(session:ISession) {
        const nextId = Math.max.apply(null, this.event.sessions.map(s => s.id));
        session.id = nextId + 1;
        this.event.sessions.push(session);
        this.eventService.updateEvent(this.event);
        this.addMode = false;
    }

    cancelAddSession() {
        this.addMode = false;
    }

    // if(isAuthenticated) {
    //     this.$('.sort-group').css({"margin-left":"160px"});
    // } добавить маржин что бы сдвинуть строку влево и поставить ее на место где она была когда был Session

}