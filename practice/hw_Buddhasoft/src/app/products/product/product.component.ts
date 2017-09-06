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
        this.product = this.productsService.getProduct(+this.activatedRoute.snapshot.params['id']);
    }

    clickEditFunc() {
        this.productsService.productEditFunc(this.product);
    }

    clickDeleteFunc() {
        return this.productsService.verifyProduct = true;
    }

    verifyProduct() {
        return this.productsService.verifyProduct;
    }
}