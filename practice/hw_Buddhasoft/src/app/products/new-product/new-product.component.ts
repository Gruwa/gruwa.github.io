import { Router } from '@angular/router';
import { IEvents } from '../../shared';
import { FormControl, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';

import { EventService } from './../../shared';

@Component({
    templateUrl: './new-product.component.html'
})

export class EditProductComponent {

    title: FormControl;
    description: FormControl;
    price: FormControl;
    imageUrl: FormControl;
    productForm: FormGroup;

constructor(private eventService: EventService,
            private router: Router) {

}

    ngOnInit() {

        this.title = new FormControl('');
        this.description = new FormControl('');
        this.price = new FormControl('');
        this.imageUrl = new FormControl('');


        this.productForm = new FormGroup({
            title: this.title,
            description: this.description,
            price: this.price,
            imageUrl: this.imageUrl
        })
        
    }

    saveForm(formValues: IEvents, productForm: any) {
        console.log(formValues, productForm);
        this.eventService.createProduct(formValues);
        this.productForm.reset();
        this.router.navigate(['/products']);
    }

    cancelClickForm() {
        this.productForm.reset();
    }


}