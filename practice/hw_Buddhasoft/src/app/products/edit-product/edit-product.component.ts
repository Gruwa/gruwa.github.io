import { Router } from '@angular/router';
import { ProductComponent } from '../product/product.component';
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
        this.product = this.productsService.product;
    }
    
    saveForm(formValues: IProduct, newProductForm: NgForm) {
        this.productsService.editProduct(formValues);
        console.log(this.productsService.getProducts());
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