import { Component, EventEmitter, Output  } from '@angular/core';

import { EventService, IEvents, IEventsItem, ToggleService, RedPencilService } from '../shared';
import { EventsListComponent } from './events/events-list.component';


@Component({
    selector: 'side-bar',
    providers: [EventsListComponent],
    templateUrl: './create-sidebar.component.html'

})

export class CreateSidebarComponent {

    events: IEvents[];
    listToggle: boolean;
    newLists: boolean;
    searchTerm: string = '';
    foundItems: IEventsItem[];

    @Output() redPancilClickName = new EventEmitter();

    clickRedPancilName(data: any) {
        this.redPancilClickName.emit(data);
    }

    constructor(private eventService: EventService, 
                private toggleService: ToggleService,
                private redPencilService: RedPencilService
            ) {
    }

    ngOnInit() {
        this.events = this.eventService.getEvents();
        this.listToggle = this.toggleService.listToggle;
        this.newLists = this.redPencilService.newLists;
    }
    
    clickListToggleFunc() {
        this.listToggle = !this.listToggle;
        this.toggleService.listToggleFunc(this.listToggle);
        return this.listToggle;
    }

    creatNewLists() {
        this.newLists = true;
        this.redPencilService.creatNewLists(this.newLists);

    }

    searchItems(searchTerm: string) {
        console.log('search');
        // this.eventService.searchItems(searchTerm).subscribe
        // (items => {
        //     this.foundItems = items;
        //     console.log(this.foundItems);
            
        // })
        
    }
}