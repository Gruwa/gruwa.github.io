import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { EventService, IEvents, IEventsItem, ToggleService, RedPencilService } from '../shared';

@Component({
    selector: 'side-bar',
    templateUrl: './create-sidebar.component.html'

})

export class CreateSidebarComponent implements OnInit {

    events: IEvents[];
    listToggle: boolean;
    newLists: boolean;
    searchTerm: string = '';
    foundItems: IEventsItem[];

    @Output() redPancilClickName = new EventEmitter();
    
    constructor(private eventService: EventService, 
                private toggleService: ToggleService,
                private redPencilService: RedPencilService) {
    }
    
    ngOnInit() {
        this.events = this.eventService.getEvents();
        this.listToggle = this.toggleService.listToggle;
        this.newLists = this.redPencilService.newLists;
    }

    clickRedPancilName(data: any) {
        this.redPancilClickName.emit(data);        
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