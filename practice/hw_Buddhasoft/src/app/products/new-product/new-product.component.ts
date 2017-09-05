import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { EventService, IEvents } from './../../shared';

@Component({
    templateUrl: './new-product.component.html'
})

export class NewProductComponent {

constructor(private eventService: EventService) {

}

    ngOnInit() {

    }

    saveForm(formValues: IEvents) {
        console.log(formValues);
        
        this.eventService.newProduct(formValues);
    }
    
}