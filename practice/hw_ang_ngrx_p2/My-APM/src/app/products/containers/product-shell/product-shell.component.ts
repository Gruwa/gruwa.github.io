import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

import {Observable} from 'rxjs';

import {Product} from '../../product';
import {ProductService} from '../../product.service';
import {select, Store} from '@ngrx/store';
import * as fromProduct from '../../state/product.reducer';
import * as fromActionProduct from '../../state/product.action';
import {State} from '../../interfaces/product.interface';

@Component({
  templateUrl: './product-shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductShellComponent implements OnInit {
  products$: Observable<Product[]>;
  errorMessage$: Observable<string>;
  displayCode$: Observable<boolean>;
  selectedProduct$: Observable<Product | null>;

  constructor(
    private productService: ProductService,
    private store: Store<State>,
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(new fromActionProduct.LoadProduct());

    // TODO - интересный вариант отписки потока
    this.selectedProduct$ = this.store
      .pipe(
        select(fromProduct.getCurrentProduct)
      );
    this.errorMessage$ = this.store
      .pipe(
        select(fromProduct.getErrorProducts)
      );
    this.products$ = this.store
      .pipe(
        select(fromProduct.getProducts)
      );
    this.displayCode$ = this.store
      .pipe(
        select(fromProduct.getShowProductCode)
      );
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
