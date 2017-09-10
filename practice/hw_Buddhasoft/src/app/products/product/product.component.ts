import { 
    Component, 
    OnInit 
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { 
    ProductsService, 
    IProduct 
} from './../../shared';

@Component({
    templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {

    product: IProduct;

    constructor( 
        private productsService: ProductsService,
        private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.product = this.productsService.getProductById(+this.activatedRoute.snapshot.params['id']);
    }

    editProduct() {
        this.productsService.editProduct(this.product);
    }

    deleteProduct() {
        return this.productsService.deleteForm = true;
    }

    isDeleteFormOpened() {
        return this.productsService.deleteForm;
    }
}