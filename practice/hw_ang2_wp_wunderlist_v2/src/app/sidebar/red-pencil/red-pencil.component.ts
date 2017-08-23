import { Component, Input, OnChanges, OnInit } from '@angular/core'; //библеотека
import { FormControl, FormGroup } from '@angular/forms';

import { RedPencilService, IEvents, EventService } from './../../shared';

@Component({ //декоратор, позволяет  идентифицировать класс как компонет
    selector: 'red-pencil',
    templateUrl: './red-pencil.component.html'
})

export class RedPencilComponent  implements OnInit, OnChanges {
    
    redPencilForm: FormGroup;
    redPencil: boolean;
    listName: FormControl;
    event: IEvents;
    name: string;

    @Input() redPancilName: any;

    constructor(private redPencilService: RedPencilService,
                private eventService: EventService) {

    }
    
    ngOnInit() {
        this.redPencil = this.redPencilService.redPencil;
    }
    
    ngOnChanges() {
        this.listName = new FormControl(this.redPencilService.name);
        this.event = this.redPencilService.event;
        this.redPencilForm = new FormGroup({
            listName: this.listName
        })
    }

    pencil() {
        return this.redPencilService.redPencil;     
    }

    saveForm(formValues: any) {
        this.redPencilService.updateListName(formValues.listName);
        this.cancelForm();
    }

    cancelForm() {
        this.redPencil = false;
        this.redPencilService.redPencilFunc(this.redPencil);
        return this.redPencil;
    }

    deleteForm() {
        this.eventService.deleteEvent(this.event);
        this.cancelForm();
    }
}