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

    deleteVerifyForm() {
        console.log('this.productsData', this.productsService.productsData);
        this.productsService.deleteProduct(this.product);
        this.cancelVerifyForm();
    }

    cancelVerifyForm() {
        this.productsService.verifyEditForm = false;
    }
}