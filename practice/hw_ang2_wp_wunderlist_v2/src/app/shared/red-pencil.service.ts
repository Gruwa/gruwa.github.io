import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { IEvents } from './../shared/event.service';

@Injectable()

export class RedPencilService {
    
    redPencil: boolean = false;
    event: IEvents;
    name: string = '';
    newLists: boolean = false;

    redPencilForm: FormGroup;
    
    redPencilFunc(data: boolean) {
        this.redPencil = data;
    }

    eventRedPencil(data: IEvents) {
        this.event = data;
        this.name = this.event.name;
    }

    updateListName(name: string) {
        this.event.name = name;
    }

    creatNewLists(data: boolean) {
        this.newLists = data;
    }

}