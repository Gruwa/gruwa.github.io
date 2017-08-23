import { Component, OnInit } from '@angular/core'; //библеотека
import { FormControl, FormGroup } from '@angular/forms';

import { RedPencilService, EventService, IEvents } from './../../shared';

@Component({ //декоратор, позволяет  идентифицировать класс как компонет
    selector: 'new-events',
    templateUrl: './new-events.component.html'
})

export class NewEventsComponent implements OnInit{
    
    newEventsForm: FormGroup;
    eventsShow: boolean;
    name: FormControl;

    constructor(private redPencilService: RedPencilService,
                private eventService: EventService) {

    }

    ngOnInit() {
        this.eventsShow = this.redPencilService.newLists;
        this.name = new FormControl();        
        this.newEventsForm = new FormGroup({
            name: this.name
        })
    }
    
    newEvents() {
        return this.redPencilService.newLists;
    }
    
    saveForm(formValues: IEvents) {
        this.eventService.newEvents(formValues);
        this.cancelForm();
    }
    
    cancelForm() {
        this.eventsShow = false; 
        this.redPencilService.creatNewLists(this.eventsShow);
        this.newEventsForm.reset();
        return this.eventsShow;
    }
}