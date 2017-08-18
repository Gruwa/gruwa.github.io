import { Component, Input } from '@angular/core'; //библеотека
import { FormControl, FormGroup } from '@angular/forms';

import { RedPencilService } from './../../shared';

@Component({ //декоратор, позволяет  идентифицировать класс как компонет
    selector: 'red-pencil',
    templateUrl: './red-pencil.component.html'
})

export class RedPencilComponent {
    
    redPencilForm: FormGroup;
    redPencil: boolean;
    listName: FormControl;

    @Input() redPancilName: any;

    constructor(private redPencilService: RedPencilService) {

    }
    
    ngOnInit() {
        this.redPencil = this.redPencilService.redPencil;
    }

    pencil() {
        return this.redPencilService.redPencil;     
    }

    ngOnChanges() {
        this.listName = new FormControl(this.redPencilService.name);
        
        console.log('FormGroup - ', this.listName);

        this.redPencilForm = new FormGroup({
            listName: this.listName
        })

        console.log('value - ', this.redPencilForm.value.listName);
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