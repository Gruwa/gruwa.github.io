import { AfterContentChecked, Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { EventService, IEventsItem, IEvents, ItemService  } from '../../shared';

@Component({
    selector: 'list-comp',
    templateUrl: './list-content.component.html'
})

export class ListContentComponent implements OnInit, AfterContentChecked {

    event: IEvents;
    name: FormControl;
    newItemForm: FormGroup;
    showDoneItems: boolean = false;

    constructor(private eventService:EventService,
                private route:ActivatedRoute,
                private itemService: ItemService) {

    }
    
    ngOnInit() {
        this.name = new FormControl();
        this.newItemForm = new FormGroup({
            name: this.name
        })
        
    }

    ngAfterContentChecked() {
        this.event = this.eventService.getEvent(+this.route.snapshot.params['id']);
    }
    
    saveItem(formValues: IEventsItem) {
        this.eventService.newItems(formValues, this.event);
        this.newItemForm.reset();
    }
    
    hideDoneItems() {
         this.showDoneItems = !this.showDoneItems;
    }

}