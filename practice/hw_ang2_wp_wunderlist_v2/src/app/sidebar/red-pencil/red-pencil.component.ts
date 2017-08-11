import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { EventService, ToggleService } from './../../shared/index';

@Component({
    selector: 'red-pencil',
    templateUrl: './red-pencil.component.html'
})

export class RedPencilComponent implements OnInit{
    
    profileForm:FormGroup;
    redPencil: boolean;
        
    prop:any = {'display': 'none'};
    name:string;
    id:number;

    constructor( private eventService: EventService, private toggleService: ToggleService) {
        
    }

    ngOnInit() {

    }
    

    ngOnChanges() {
        // for (let key in this.redPencilName) {
        //     if( key == 'name') this.name = this.redPencilName[key];
        //     if( key == 'id') this.id = this.redPencilName[key];
        //         // console.log(this.id);
        // }

        // let listName = new FormControl(this.name);
        // this.profileForm = new FormGroup({
        //     listName: listName
        // })
    }

    saveProfile(formValues: any) {
        this.cancel();
    }

    cancel() {
        this.redPencil = false; 
        this.toggleService.redPencilFunc(this.redPencil);
        return this.redPencil;
    }
}