import { Router } from '@angular/router';
import { 
    AfterContentChecked, 
    Component, 
    OnInit 
} from '@angular/core';

import { 
    ProductsService, 
    IProduct 
} from './../shared'; 

@Component({
    templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit, AfterContentChecked {

    products: IProduct[];
    
    constructor(
        private productsService: ProductsService,
        private router: Router ) {

    }

    ngOnInit() {
        this.productsService.getInitialData();
    }
    
    ngAfterContentChecked() {
        this.products = this.productsService.productsData;
    }
   
}