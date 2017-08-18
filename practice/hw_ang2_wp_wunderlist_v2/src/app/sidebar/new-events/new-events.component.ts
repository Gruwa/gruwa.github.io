import { Component } from '@angular/core'; //библеотека
import { FormControl, FormGroup } from '@angular/forms';

import { RedPencilService, EventService } from './../../shared';

@Component({ //декоратор, позволяет  идентифицировать класс как компонет
    selector: 'new-events',
    templateUrl: './new-events.component.html'
})

export class NewEventsComponent {
    
    newEventsForm: FormGroup;
    eventsShow: boolean;
    name: FormControl;

    constructor(private redPencilService: RedPencilService,
                private eventService: EventService) {

    }

    ngOnInit() {
        this.eventsShow = this.redPencilService.newLists;
        this.name = new FormControl('New List');        
        this.newEventsForm = new FormGroup({
            name: this.name
        })
    }
    
    newEvents() {
        return this.redPencilService.newLists;
    }
    
    saveForm(formValues: any) {
        this.eventService.newEvents(formValues);
        // console.log(this.name.value);
        // константа не удается изменить - надо избавить повторения в поле
        // this.name.value = 'New List';
        // formValues.name = 'New List'; // поставить ngAfterChecked;
        this.cancelForm();
    }

    cancelForm() {
        this.eventsShow = false; 
        this.redPencilService.creatNewLists(this.eventsShow);
        return this.eventsShow;
    }
}