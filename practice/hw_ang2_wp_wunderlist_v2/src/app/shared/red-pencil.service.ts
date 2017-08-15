import { Injectable } from '@angular/core';
import { IEvents } from './../shared/event.service';

@Injectable()

export class RedPencilService {
    
    redPencil: boolean = false;
    event: IEvents;
    name: string = '';
    
    redPencilFunc(data: boolean) {
        this.redPencil = data;
        // console.log('RedPencil ', this.redPencil);
    }

    eventRedPencil(data: IEvents) {
        this.event = data;
        console.log(this.event.name);
        this.name = this.event.name;
    }

    updateListName(name: string) {
        this.event.name = name;
        console.log(this.event.name);
        
    }
}