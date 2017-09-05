import { IEvents } from '../../shared';
import { FormControl, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';

import { EventService } from './../../shared';

@Component({
    templateUrl: './edit-product.component.html'
})

export class EditProductComponent {

    title: FormControl;
    description: FormControl;
    price: FormControl;
    imageUrl: FormControl;
    productForm: FormGroup;

constructor(private eventService: EventService) {

}

    ngOnInit() {

        if (this.eventService.product != undefined) {            
            this.title = new FormControl(this.eventService.product.title);
            this.description = new FormControl(this.eventService.product.description);
            this.price = new FormControl(this.eventService.product.price);
            this.imageUrl = new FormControl(this.eventService.product.imageUrl);
        } else {
            this.title = new FormControl('');
            this.description = new FormControl('');
            this.price = new FormControl('');
            this.imageUrl = new FormControl('');
        }

        this.productForm = new FormGroup({
            title: this.title,
            description: this.description,
            price: this.price,
            imageUrl: this.imageUrl
        })
    }

    saveForm(formValues: IEvents) {
        console.log(formValues);
        this.eventService.editProduct(formValues);
        
    }

    deleteProduct() {

    }


}