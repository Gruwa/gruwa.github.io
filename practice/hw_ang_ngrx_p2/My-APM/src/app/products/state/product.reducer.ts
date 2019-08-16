import {ProductType, PRODUCT_ACTION} from './product.action';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ProductState} from '../interfaces/product.interface';

const initialState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  products: [],
  error: ''
};

const getProductFeatureState = createFeatureSelector<ProductState>('products'); // селектор на вызов 'products' всего стейта

export const getShowProductCode = createSelector( // создаем селектор на конкретную фичу
  getProductFeatureState,
  state => state.showProductCode
);

export const getCurrentProductId = createSelector( // создаем селектор на конкретную фичу
  getProductFeatureState,
  state => state.currentProductId
);

export const getCurrentProduct = createSelector( // создаем селектор на конкретную фичу
  getProductFeatureState,
  getCurrentProductId,
  (state, currentProductId) => {
    if (currentProductId === 0) {
      return {
        id: 0,
        productName: '',
        productCode: 'New',
        description: '',
        starRating: 0,
      };
    } else {
      return currentProductId ? state.products.find(p => p.id === currentProductId) : null;
    }
  }
);

export const getProducts = createSelector( // создаем селектор на конкретную фичу
  getProductFeatureState,
  state => state.products
);

export const getErrorProducts = createSelector( // создаем селектор на конкретную фичу
  getProductFeatureState,
  state => state.error
);

export function productReducer(state: ProductState = initialState, action: ProductType): ProductState {
  switch (action.type) {

    case PRODUCT_ACTION.TOGGLE_PRODUCT_CODE:
      return {
        ...state,
        showProductCode: action.payload
      };

    case PRODUCT_ACTION.CLEAR_CURRENT_PRODUCT:
      return {
        ...state,
        currentProductId: null
      };

    case PRODUCT_ACTION.INITIALIZE_CURRENT_PRODUCT:
      return {
        ...state,
        currentProductId: 0
      };

    case PRODUCT_ACTION.SET_CURRENT_PRODUCT:
      return {
        ...state,
        currentProductId: action.payload.id
      };

    case PRODUCT_ACTION.LOAD_SUCCESS_PRODUCT:
      return {
        ...state,
        products: action.payload
      };

    case PRODUCT_ACTION.LOAD_FAIL_PRODUCT:
      return {
        ...state,
        products: [],
        error: action.payload
      };

    case PRODUCT_ACTION.UPDATE_SUCCESS_PRODUCT:
      const updateProducts = state.products
        .map(item => action.payload.id === item.id ? action.payload : item);

      return {
        ...state,
        products: updateProducts,
        currentProductId: action.payload.id,
        error: ''
      };

    case PRODUCT_ACTION.UPDATE_FAIL_PRODUCT:
      return {
        ...state,
        error: action.payload
      };

    case PRODUCT_ACTION.SAVE_SUCCESS_PRODUCT:
      const newListOfProducts = state.products.concat(action.payload);

      return {
        ...state,
        products: newListOfProducts
      };

    case PRODUCT_ACTION.SAVE_FAIL_PRODUCT:
      return {
        ...state,
        products: state.products,
        error: action.payload
      };

    case PRODUCT_ACTION.DELETE_SUCCESS_PRODUCT:
      const newState = state.products.slice();

      newState.splice(newState.indexOf(action.payload), 1);

      return {
        ...state,
        products: newState
      };

    case PRODUCT_ACTION.DELETE_FAIL_PRODUCT:
      return {
        ...state,
        products: state.products,
        error: action.payload
      };

    default:
      return state;
  }
}
