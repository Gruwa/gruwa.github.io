import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IProduct } from './product';

@Component({
    templateUrl: 'app/products/product-detail.component.html'
})

export class ProductDetailComponent implements OnInit { // ProductDetailComponent реализует интерфес OnInit, т.е. должен реализовать все его свойства и методы 
    pageTitle: string = 'Product Detail';
    product: IProduct;

    constructor(private _route: ActivatedRoute, // конструктор предназначен для простой инициализации свойств, а не связи серва с сервисом
                private _router: Router) {
    }

    ngOnInit(): void { // один из методов lifecycle hooks(крюки жизненного цикла), т.е. методы которые будут вызваны в определенный момент, ngOnInit() => вызовится в момент инициализации компонета product-detail.component
        // void => указывается в типе, если ничего не возвращается
        let id = +this._route.snapshot.params['id'];
        this.pageTitle += `: ${id}`;
    }

    onBack(): void {
        this._router.navigate(['/products']);
    }
}
