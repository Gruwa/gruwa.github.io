import { Component, Input} from '@angular/core';

import { IEvents } from '../../shared/event.service';
import { RedPencilService } from './../../shared/index';
// import { RedPencilComponent } from './../red-pencil/red-pencil.component';

@Component({
    selector: 'event-list',
    // providers: [ RedPencilComponent ],
    templateUrl: './events-list.component.html'
})

export class EventsListComponent {
    
    length: number;
    redPencil: boolean;
    trg: any;

    @Input() event: IEvents;  // говрорит о том что это объект будет взят из другого копмонента
    @Input() listToggle: boolean;

    constructor(private redPencilService: RedPencilService, 
        // private redPencilComponent: RedPencilComponent
    ) {

    }
    
    eventLength() {
        this.length = this.event.items.length;
        return this.length;
    }
    
    clickRedPencil(event: any) {
        this.redPencil = true;
        this.redPencilService.redPencilFunc(this.redPencil);
        this.redPencilService.eventRedPencil(this.event);
        console.log(event);

        // this.redPencilComponent.showRedPencil();
        
        return this.redPencil;
    }

}