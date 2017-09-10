import { Router } from '@angular/router';
import { 
    Component, 
    Inject, 
    OnInit 
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { 
    ImageResult, 
    ResizeOptions 
} from 'ng2-imageupload';

import { 
    ProductsService, 
    IProduct 
} from './../../shared';

@Component({
    templateUrl: './edit-product.component.html'
})
export class EditProductComponent implements OnInit {

    product: IProduct;
    imgUrl: string = "";

    resizeOptions: ResizeOptions = {
        resizeMaxHeight: 128,
        resizeMaxWidth: 128
    };

    constructor(private productsService: ProductsService,
                private router: Router) {

    }

    ngOnInit() {
        this.product = this.productsService.activeProduct;
        if(this.product === undefined) {
            this.router.navigate(['/products']);
        }
    }
    
    selected(imageResult?: ImageResult) {
        this.imgUrl = imageResult.resized
                    && imageResult.resized.dataURL
                    || imageResult.dataURL;
    }

    saveEditForm(formValues: IProduct, newProductForm: NgForm) {
        this.productsService.saveEditForm(formValues, this.imgUrl);
        newProductForm.resetForm();
        this.link();
        
        this.productsService.productEditData$.next(true);
    }

    cancelEditForm(newProductForm: NgForm) {
        newProductForm.resetForm();
    }

    link() {
        this.router.navigate(['/products']);
    }
    
}