import { Component, Input} from '@angular/core';
import { IEvents } from '../../shared/event.service';
import { RedPencilService } from './../../shared/index';

@Component({
    selector: 'event-list',
    templateUrl: './events-list.component.html'

})

export class EventsListComponent {
    
    length: number;
    redPencil: boolean;

    @Input() event: IEvents;  // говрорит о том что это объект будет взят из другого копмонента
    @Input() listToggle: boolean;

    constructor(private redPencilService: RedPencilService) {

    }

    ngOnInit() {
        this.redPencil = this.redPencilService.redPencil;
    }

    eventLength() {
        this.length = this.event.items.length;
        return this.length;
    }

    clickRedPencil() {
        this.redPencil = !this.redPencil; 
        this.redPencilService.redPencilFunc(this.redPencil);
        // this.toggleService.

        return this.redPencil;
    }

}