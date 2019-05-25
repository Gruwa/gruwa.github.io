import {Component, OnInit, OnDestroy} from '@angular/core';

import {Observable, Subscription} from 'rxjs';

import {Product} from '../product';
import {ProductService} from '../product.service';
import {select, Store} from '@ngrx/store';
import {PRODUCT_ACTION} from '../state/product.action';
import {filter, takeWhile} from 'rxjs/operators';
import {p} from '@angular/core/src/render3';
import * as fromProduct from '../state/product.reducer';
import * as fromActionProduct from '../state/product.action';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products$: Observable<Product[]>;
  errorMessage$: Observable<string>;
  pageTitle = 'Products';
  errorMessage: string;
  componentActive = true;
  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  sub: Subscription;

  constructor(
    private productService: ProductService,
    private store: Store<fromProduct.State>,
  ) {
  }

  ngOnInit(): void {
    // TODO - интересный вариант отписки потока

    this.store
      .pipe(
        select(fromProduct.getCurrentProduct),
        takeWhile(() => this.componentActive),
      )
      .subscribe(
        selectedProduct => this.selectedProduct = selectedProduct
      );

    this.errorMessage$ = this.store
      .pipe(
        select(fromProduct.getErrorProducts)
      );

    this.store.dispatch(new fromActionProduct.LoadProduct());

    this.products$ = this.store
      .pipe(
        select(fromProduct.getProducts)
      );

    // this.productService.getProducts().subscribe(
    //   (products: Product[]) => this.products = products,
    //   (err: any) => this.errorMessage = err.error
    // );

    this.store
      .pipe(
        select(fromProduct.getShowProductCode),
        takeWhile(() => this.componentActive),
      )
      .subscribe(showProductCode => {
        this.displayCode = showProductCode;
      });
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new fromActionProduct.ToggleProduct(value));
  }

  newProduct(): void {
    this.store.dispatch(new fromActionProduct.InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(new fromActionProduct.SetCurrentProduct(product));
  }

}
