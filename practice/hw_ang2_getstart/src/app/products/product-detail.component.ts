import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProduct } from './product';

@Component({
    templateUrl: 'app/products/product-detail.component.html'
})

export class ProductDetailComponent implements OnInit {
    pageTitle: string = 'Product Detail';
    product: IProduct;

    constructor(private _route: ActivatedRoute) { // конструктор предназначен для простой инициализации свойств, а не связи серва с сервисом
    }

    ngOnInit(): void { // один из методов lifecycle hooks(крюки жизненного цикла), т.е. методы которые будут вызваны в определенный момент, ngOnInit() => вызовится в момент инициализации компонета product-detail.component
        let id = +this._route.snapshot.params['id'];
        this.pageTitle += `: ${id}`;
    }
}
