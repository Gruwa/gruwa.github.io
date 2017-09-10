import { 
    Component, 
    Input 
} from '@angular/core';

import { 
    ProductsService, 
    IProduct 
} from '../../shared';

@Component({
    selector: 'delete-product',
    templateUrl: './delete-product.component.html'
})
export class DeleteProductComponent {

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