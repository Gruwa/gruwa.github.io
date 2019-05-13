import {PRODUCT, PRODUCT_ACTION} from './product.action';
import {Product} from '../product';
import * as fromRoot from '../../state/app.state';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface State extends fromRoot.State {
  products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
}

const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: []
};

const getProductFeatureState = createFeatureSelector<ProductState>('products'); // селектор на вызов 'products' всего стейта

export const getShowProductCode = createSelector( // создаем селектор на конкретную фичу
  getProductFeatureState,
  state => state.showProductCode
);

export const getCurrentProduct = createSelector( // создаем селектор на конкретную фичу
  getProductFeatureState,
  state => state.currentProduct
);

export const getProducts = createSelector( // создаем селектор на конкретную фичу
  getProductFeatureState,
  state => state.products
);

export function productReducer(state: ProductState = initialState, action: PRODUCT): ProductState {
  switch (action.type) {
    case PRODUCT_ACTION.TOGGLE_PRODUCT_CODE:
      return {
        ...state,
        showProductCode: action.payload
      };
    default:
      return state;
  }
}
