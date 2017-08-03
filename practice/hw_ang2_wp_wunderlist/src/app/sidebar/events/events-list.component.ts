import { JQ_TOKEN } from '../../common/index';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { EventService } from '../../shared/event.service';

@Component({
    selector: 'events-list',
    templateUrl: './events-list.component.html'

})

export class EventsListComponent {

    constructor(@Inject(JQ_TOKEN) private $: any) {}

    @Input() goga: any;  // говрорит о том что это объект будет взят из другого копмонента
    @Input() listToggle: boolean;
    @Output() redPencil = new EventEmitter();
    @Output() redPencilName = new EventEmitter();

    length: any;

    OnInit() {
    }

    ngAfterContentChecked() {
  
    }

    eventLength() {
        this.length = this.goga.items.length;
        return this.length;
    }

    clickRedPencil() {
        let a = {'display': 'block'};
        let b = this.goga;
        this.redPencil.emit(a);
        this.redPencilName.emit(b);
    }
}