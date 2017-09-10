import { 
    Component, 
    Input 
} from '@angular/core';

import { 
    ProductsService, 
    IProduct 
} from '../../shared';

@Component({
    selector: 'verify-product',
    templateUrl: './verify-product.component.html'
})
export class VerifyProductComponent {

    @Input() product: IProduct;

    constructor(private productsService: ProductsService) {

    }

    deleteProduct() {
        this.productsService.deleteProduct(this.product);
        this.closeForm();
    }

    closeForm() {
        this.productsService.verifyEditForm = false;
    }
}