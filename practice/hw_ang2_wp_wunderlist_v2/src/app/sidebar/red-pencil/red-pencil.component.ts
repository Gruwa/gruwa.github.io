import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { EventService } from './../../shared/event.service';

@Component({
    selector: 'red-pencil',
    templateUrl: './red-pencil.component.html'
})

export class RedPencilComponent implements OnInit{

    constructor( private eventService:EventService) {

    }

    profileForm:FormGroup;

    @Input() redPancilName:any;
    @Output() redPancilClick = new EventEmitter();

    prop:any = {'display': 'none'};
    name:string;
    id:number;

    ngOnInit() {

    }
    
    ngAfterContentChecked() {
        
    }

    ngOnChanges() {
        for (let key in this.redPancilName) {
            if( key == 'name') this.name = this.redPancilName[key];
            if( key == 'id') this.id = this.redPancilName[key];
                // console.log(this.id);
        }

        let listName = new FormControl(this.name);
        this.profileForm = new FormGroup({
            listName: listName
        })
    }

    saveProfile(formValues: any) {
        // this.eventService.updateCurrentList(formValues.listName, this.id);
        this.redPancilClick.emit(this.prop);
        // console.log(formValues.listName);
        
    }

    cancel() {
        this.redPancilClick.emit(this.prop);
    }
}