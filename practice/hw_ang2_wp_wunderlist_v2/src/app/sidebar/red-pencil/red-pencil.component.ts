import { Component, OnChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { RedPencilService } from './../../shared/index';

@Component({
    selector: 'red-pencil',
    templateUrl: './red-pencil.component.html'
})

export class RedPencilComponent {
    
    profileForm:FormGroup;
    redPencil: boolean;
        
    name:string;
    id:number;

    constructor(private redPencilService: RedPencilService) {
        
    }

    ngOnInit() {
        this.redPencil = this.redPencilService.redPencil;
        // console.log(this.redPencilService.name);
    }

    get redPencilFunc() {
        return this.redPencil;
    }

    set redPencilFunc(value) {
        this.redPencil = value;
    }

    pencil() {
        return this.redPencilFunc = this.redPencilService.redPencil;
    }



    // --------------------------------------------

    asd() {
        
    }


    ngAfterContentChecked() {
        this.name = this.redPencilService.name;
        console.log('NAME  ', this.name);
        console.log(this.pencil());

        let listName = new FormControl(this.name);
        
        this.profileForm = new FormGroup({
            listName: listName
        })
    }

    saveForm(formValues: any) {

        this.cancelForm();
    }

    cancelForm() {
        this.redPencil = false; 
        this.redPencilService.redPencilFunc(this.redPencil);
        return this.redPencil;
    }
}