import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'events-list',
    templateUrl: './events-list.component.html'
})

export class EventsListComponent {

    @Input() goga:any  // говрорит о том что это объект будет взят из другого копмонента

    options: boolean = false;

    eventListClick() {

        if(this.options) {
            this.options = false;
        } else {
        this.options = true;
        }
    }

}