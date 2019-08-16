import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {ProductService} from '../product.service';
import * as productActions from '../state/product.action';
import {merge, Observable, of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {Product} from '../product';
import {Action} from '@ngrx/store';

@Injectable()
export class ProductEffects {

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  @Effect()
  loadProducts$: Observable<Action> = this.actions$
    .pipe(
      ofType(productActions.PRODUCT_ACTION.LOAD_PRODUCT),
      mergeMap((action: productActions.LoadProduct) => this.productService.getProducts()
        .pipe(
          map((products: Product[]) => new productActions.LoadSuccessProduct(products)),
          catchError(err => of(new productActions.LoadFailProduct(err)))
        ))
    );

  @Effect()
  updateProducts$: Observable<Action> = this.actions$
    .pipe(
      ofType(productActions.PRODUCT_ACTION.UPDATE_PRODUCT),
      map((action: productActions.UpdateProduct) => action.payload),
      mergeMap((product: Product) => this.productService.updateProduct(product)
        .pipe(
          map((updateProduct) => new productActions.UpdateSuccessProduct(updateProduct)),
          catchError(err => of(new productActions.UpdateFailProduct(err)))
        ))
    );

  @Effect()
  saveProducts$: Observable<Action> = this.actions$
    .pipe(
      ofType(productActions.PRODUCT_ACTION.SAVE_PRODUCT),
      map((action: productActions.SaveProduct) => action.payload),
      mergeMap((product: Product) => this.productService.createProduct(product)
        .pipe(
          map((updateProduct) => {
            console.log(updateProduct);
            return new productActions.SaveSuccessProduct(updateProduct);
          }),
          catchError(err => of(new productActions.SaveFailProduct(err)))
        ))
    );

  @Effect()
  deleteProducts$: Observable<Action> = this.actions$
    .pipe(
      ofType(productActions.PRODUCT_ACTION.DELETE_PRODUCT),
      map((action: productActions.DeleteProduct) => action.payload),
      mergeMap((product: Product) => this.productService.deleteProduct(product)
        .pipe(
          map((deleteProduct: Product) => new productActions.DeleteSuccessProduct(deleteProduct)),
          catchError(err => of(new productActions.DeleteFailProduct(err)))
        ))
    );
}
