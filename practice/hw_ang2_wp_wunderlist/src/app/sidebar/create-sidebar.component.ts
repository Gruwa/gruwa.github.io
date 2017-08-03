import { EventService } from '../shared/event.service';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'side-bar',
    templateUrl: './create-sidebar.component.html'

})
export class CreateSidebarComponent {

    @Output() toggleClick = new EventEmitter();
    @Output() redPancilClick = new EventEmitter();
    @Output() redPancilClickName = new EventEmitter();

    listToggle:boolean = true;
    events:any [];
    redPancil:any;

    //  ngAfterContentChecked() {
    //      this.redPancilClick.emit(this.redPancil);
    // }

    constructor(private eventService: EventService) {
    }

    ngOnInit() {
        this.events = this.eventService.getEvents(); 
          
    }

    clickRedPancil(data: any) {
        this.redPancilClick.emit(data);
     }

    clickRedPancilName(data: any) {
        this.redPancilClickName.emit(data);
    }


    listToggleFunc() {
        if(this.listToggle) {
            this.listToggle = false;
        }
        else {
            this.listToggle = true;
        }

        this.toggleClick.emit(this.listToggle);
    }

    getTogle() {
        if(this.listToggle == false) {
            return {'width': '42px'};
        }
    }
}