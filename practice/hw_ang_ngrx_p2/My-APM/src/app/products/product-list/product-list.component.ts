import {Component, OnInit, OnDestroy} from '@angular/core';

import {Subscription} from 'rxjs';

import {Product} from '../product';
import {ProductService} from '../product.service';
import {select, Store} from '@ngrx/store';
import {PRODUCT_ACTION} from '../state/product.action';
import {filter} from 'rxjs/operators';
import {p} from '@angular/core/src/render3';
import * as fromProduct from '../state/product.reducer';
import * as fromActionProduct from '../state/product.action';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;

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
    this.store
      .pipe(
        select(fromProduct.getCurrentProduct)
      )
      .subscribe(
      selectedProduct => this.selectedProduct = selectedProduct
    );

    this.productService.getProducts().subscribe(
      (products: Product[]) => this.products = products,
      (err: any) => this.errorMessage = err.error
    );

    this.store
      .pipe(
        select(fromProduct.getShowProductCode)
      )
      .subscribe(showProductCode => {
        console.log(showProductCode);
        this.displayCode = showProductCode;
      });
  }

  ngOnDestroy(): void {
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
