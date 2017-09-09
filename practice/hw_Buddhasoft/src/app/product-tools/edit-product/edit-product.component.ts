import { Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ProductsService, IProduct } from './../../shared';

@Component({
    templateUrl: './edit-product.component.html'
})

export class EditProductComponent implements OnInit {

    product: IProduct;

    constructor(private productsService: ProductsService,
                private router: Router) {

    }

    ngOnInit() {
        this.product = this.productsService.activeProduct;
    }
    
    saveEditForm(formValues: IProduct, newProductForm: NgForm) {
        this.productsService.saveEditForm(formValues);
        newProductForm.resetForm();
        this.link();   
    }

    cancelEditForm(newProductForm: NgForm) {
        newProductForm.resetForm();
    }

    link() {
        this.router.navigate(['/products']);
    }
    
}