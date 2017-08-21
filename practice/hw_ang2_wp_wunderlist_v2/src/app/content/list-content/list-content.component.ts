import { Component, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { EventService, IEventsItem, IEvents, ItemService  } from '../../shared';

@Component({
    selector: 'list-comp',
    templateUrl: './list-content.component.html'
})

export class ListContentComponent {

    constructor(private eventService:EventService,
                private route:ActivatedRoute,
                private itemService: ItemService) { }

    event: IEvents;
    name: FormControl;
    newItemForm: FormGroup;
    doneItemInc: IEventsItem;


    ngAfterContentChecked() {
        this.event = this.eventService.getEvent(+this.route.snapshot.params['id']);
    }
    
    ngOnInit() {
        this.name = new FormControl();
        this.newItemForm = new FormGroup({
            name: this.name
        })
        
    }
    
    saveItem(formValues: IEventsItem) {
        this.eventService.newItems(formValues, this.event);
        this.newItemForm.reset();
    }

    
    hideDoneItems() {
        // this.itemService;
    }

    clickDoneItemEvent(data: any) {
        this.doneItemInc = data;
    }

}