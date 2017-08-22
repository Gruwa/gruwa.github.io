import { Component, Inject } from '@angular/core'; //библеотека

import { RedPencilService } from './../../shared';

@Component({ //декоратор, позволяет  идентифицировать класс как компонет
    selector: 'red-pencil',
    templateUrl: './red-pencil.component.html'
})

export class RedPencilComponent {
    
    // redPencil: boolean;
    // listName: string;

    // constructor(private redPencilService: RedPencilService) {

    // }
    
    // ngOnInit() {
    //     this.redPencil = this.redPencilService.redPencil;
    //     this.listName = this.redPencilService.name;
    // }

    // pencil() {
    //     return this.redPencilService.redPencil;     
    // }

   
    // saveForm(formValues: any) {
    //     this.redPencilService.updateListName(formValues.listName);
    //     console.log(formValues);
    //     this.cancelForm();
    // }

    // cancelForm() {
    //     this.redPencil = false; 
    //     this.redPencilService.redPencilFunc(this.redPencil);
    //     return this.redPencil;
    // }
}