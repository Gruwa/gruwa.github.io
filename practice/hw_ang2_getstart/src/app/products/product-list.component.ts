import { Component, OnInit } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    // selector: 'pm-products',
    // moduleId: module.id, // при указании moduleId, не нужно ниже указывать полный путь, можно использовать относительный (например templateUrl: 'product-list.component.html',).
    templateUrl: 'app/products/product-list.component.html', // подключение темплейта расположенного в штмл фале
    styleUrls: ['app/products/product-list.component.css'] // подключение css стилей внутрь ангуляра, а не строчкой в штмл
})

export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List!';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    listFilter: string;
    errorMessage: string;
    products: IProduct[];

    constructor(private _productService: ProductService) {

    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        this._productService.getProducts()
        .subscribe(products => this.products = products,
        error => this.errorMessage = <any>error);
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List:' + message;
    }
}
