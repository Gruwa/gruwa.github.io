import { Injectable } from '@angular/core';
import { IEvents } from './../shared/event.service';

@Injectable()

export class RedPencilService {
    
    redPencil: boolean = false;
    events: IEvents[];
    
    redPencilFunc(data: boolean) {
        this.redPencil = data;
        console.log('RedPencil ', this.redPencil);
    }

    eventRedPencil(data: IEvents[]) {
        this.events = data;

    }
}