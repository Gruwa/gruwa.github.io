import { Component, Input } from '@angular/core';

import { ProductsService, IProduct } from '../../shared';

@Component({
    selector: 'verify-product',
    templateUrl: './verify-product.component.html'
})

export class VerifyProductComponent {

    @Input() product: IProduct;

    constructor(private productsService: ProductsService) {

    }

    deleteVerify() {
        this.productsService.productDeleteFunc(this.product);
        this.cancelVerify();
    }

    cancelVerify() {
        this.productsService.verifyProduct = false;
    }
}