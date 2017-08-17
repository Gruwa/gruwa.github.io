import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { IEvents } from './../shared/event.service';
import { RedPencilComponent } from './../sidebar/index';

@Injectable()

export class RedPencilService {
    
    redPencil: boolean = false;
    event: IEvents;
    name: string = '';

    redPencilForm: FormGroup;

    // constructor(private redPencilComponent: RedPencilComponent) {

    // }
    
    redPencilFunc(data: boolean) {
        this.redPencil = data;
        console.log('RedPencil ', this.redPencil);
        // if(this.redPencil === true) {
        //     this.listNameFunc();
        // }
    }

    // listNameFunc() {
    //     let listName = new FormControl(this.name);
    //     console.log('FormGroup - ', listName);
    //     this.redPencilForm = new FormGroup({
    //         listName: listName
    //     })
    //     console.log('value - ', this.redPencilForm.value.listName);
    // }



    eventRedPencil(data: IEvents) {
        this.event = data;
        // console.log(this.event.name);
        this.name = this.event.name;
    }

    updateListName(name: string) {
        this.event.name = name;
        // console.log(this.event.name);
        
    }

}