import { Component, OnChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { RedPencilService } from './../../shared/index';

@Component({
    selector: 'red-pencil',
    templateUrl: './red-pencil.component.html'
})

export class RedPencilComponent {
    
    redPencilForm: FormGroup;
    redPencil: boolean;
 
    name: string;


    constructor(private redPencilService: RedPencilService) {
        
    }

    ngOnInit() {
        this.redPencil = this.redPencilService.redPencil;
        // console.log(this.redPencilService.name);

        let listName = new FormControl(this.redPencilService.name);
        console.log('FormGroup - ', listName);
        this.redPencilForm = new FormGroup({
            listName: listName
        })
        console.log('value - ', this.redPencilForm.value.listName);
    }
    
    pencil() {
        return this.redPencilService.redPencil;
    }
    
    
    
    // --------------------------------------------
    
    ngDoCheck() {
        
        // let listName = new FormControl(this.redPencilService.name);
        // console.log('FormGroup - ', listName);
        // this.redPencilForm = new FormGroup({
        //     listName: listName
        // })
        // console.log('value - ', this.redPencilForm.value.listName);
    }

    ngAfterContentInit() {

    }

    saveForm(formValues: any) {
        this.redPencilService.updateListName(formValues.listName);
        this.cancelForm();
    }

    cancelForm() {
        this.redPencil = false; 
        this.redPencilService.redPencilFunc(this.redPencil);
        return this.redPencil;
    }
}