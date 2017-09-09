import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ProductsService, IProduct } from './../shared'; 

@Component({
    templateUrl: './products.component.html'
})

export class ProductsComponent implements OnInit {

    products: IProduct[];
    
    constructor(private productsService: ProductsService,
                private router: Router ) {

    }

    ngOnInit() {
        this.productsService.getData();
        this.products = this.productsService.productsData;
    }

    boolean() {
        return true;
    }
   
}