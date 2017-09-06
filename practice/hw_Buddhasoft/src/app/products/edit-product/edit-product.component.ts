import { Router } from '@angular/router';
import { ProductComponent } from '../product/product.component';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { EventService, IEvents } from './../../shared';

@Component({
    templateUrl: './edit-product.component.html'
})

export class EditProductComponent implements OnInit {

    product: IEvents;

    constructor(private eventService: EventService,
                private router: Router) {

    }

    ngOnInit() {
        this.product = this.eventService.product;
    }
    
    saveForm(formValues: IEvents, newProductForm: NgForm) {
        this.eventService.editProduct(formValues);
        console.log(this.eventService.getEvents());
        newProductForm.resetForm();
        console.log(formValues);
        this.link();   
    }

    cancelForm(newProductForm: NgForm) {
        newProductForm.resetForm();
    }

    link() {
        this.router.navigate(['/products']);
    }
    
}