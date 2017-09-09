import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductsService, IProduct } from './../../shared';

@Component({
    templateUrl: './product.component.html'
})

export class ProductComponent implements OnInit {

    product: IProduct;

    constructor( private productsService: ProductsService,
                 private activatedRoute: ActivatedRoute) {

    }

    ngOnInit() {
        this.product = this.productsService.getProductId(+this.activatedRoute.snapshot.params['id']);
    }

    editButton() {
        this.productsService.editButton(this.product);
    }

    deleteButton() {
        return this.productsService.verifyEditForm = true;
    }

    verifyProduct() {
        return this.productsService.verifyEditForm;
    }
}