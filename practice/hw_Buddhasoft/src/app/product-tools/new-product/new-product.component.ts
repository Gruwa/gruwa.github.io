import { Router } from '@angular/router';
import { 
    FormControl, 
    FormGroup, 
    Validator, 
    Validators 
} from '@angular/forms';
import { 
    Component, 
    OnInit 
} from '@angular/core';
import { 
    ImageResult, 
    ResizeOptions 
} from 'ng2-imageupload';

import { 
    ProductsService, 
    IProduct 
} from './../../shared';

@Component({
    templateUrl: './new-product.component.html'
})
export class NewProductComponent implements OnInit {

    title: FormControl;
    description: FormControl;
    price: FormControl;
    imageUrl: FormControl;
    productForm: FormGroup;
    imgUrl: string = "";
    resizeOptions: ResizeOptions = {
        resizeMaxHeight: 128,
        resizeMaxWidth: 128
    };

    constructor(
        private productsService: ProductsService,
        private router: Router) {

    }
    
    ngOnInit() {
        this.title = new FormControl('', [ Validators.required, 
            Validators.minLength(2),
            Validators.maxLength(15),]);
        this.description = new FormControl('', [ Validators.required, 
            Validators.minLength(2)]);
        this.price = new FormControl('', Validators.required);
        this.productForm = new FormGroup({
            title: this.title,
            description: this.description,
            price: this.price
        })
                
    }
            
    saveCreateForm(formValues: IProduct, productForm: any) {
        if(this.productForm.valid) {
            this.productsService.saveCreateForm(formValues, this.imgUrl);
            this.productForm.reset();
            this.router.navigate(['/products']);
        }

        this.productsService.productNewData$.next(true);
    }
    
    selected(imageResult?: ImageResult) {
        this.imgUrl = imageResult.resized
                    && imageResult.resized.dataURL
                    || imageResult.dataURL;
    }
    
    cancelCreateForm() {
        this.productForm.reset();
    }

    validateTitle() {
        return this.title.valid || this.title.untouched;
    }

    validateDescription() {
        return this.description.valid || this.description.untouched;
    }

    validatePrice() {
        return this.price.valid || this.price.untouched;
    }
}