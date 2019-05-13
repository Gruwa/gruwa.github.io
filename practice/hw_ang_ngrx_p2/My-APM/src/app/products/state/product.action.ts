import {Action} from '@ngrx/store';
import {Product} from '../product';

export namespace PRODUCT_ACTION {
  export const TOGGLE_PRODUCT_CODE = 'TOGGLE_PRODUCT_CODE';
  export const SET_CURRENT_PRODUCT = 'SET_CURRENT_PRODUCT';
  export const CLEAR_CURRENT_PRODUCT = 'CLEAR_CURRENT_PRODUCT';
  export const INITIALIZE_CURRENT_PRODUCT = 'INITIALIZE_CURRENT_PRODUCT';
  export const LOAD_PRODUCT = 'LOAD_PRODUCT';
  export const LOAD_SUCCESS_PRODUCT = 'LOAD_SUCCESS_PRODUCT';
  export const LOAD_FAIL_PRODUCT = 'LOAD_FAIL_PRODUCT';
}

export class ToggleProduct implements Action {
  readonly type = PRODUCT_ACTION.TOGGLE_PRODUCT_CODE;

  constructor(public payload: boolean) {
  }
}

export class SetCurrentProduct implements Action {
  readonly type = PRODUCT_ACTION.SET_CURRENT_PRODUCT;

  constructor(public payload: Product) {
  }
}

export class ClearCurrentProduct implements Action {
  readonly type = PRODUCT_ACTION.CLEAR_CURRENT_PRODUCT;
}

export class InitializeCurrentProduct implements Action {
  readonly type = PRODUCT_ACTION.INITIALIZE_CURRENT_PRODUCT;
}

export class LoadProduct implements Action {
  readonly type = PRODUCT_ACTION.LOAD_PRODUCT;
}

export class LoadSuccessProduct implements Action {
  readonly type = PRODUCT_ACTION.LOAD_SUCCESS_PRODUCT;

  constructor(public payload: Product[]) {
  }
}

export class LoadFailProduct implements Action {
  readonly type = PRODUCT_ACTION.LOAD_FAIL_PRODUCT;

  constructor(public payload: string) {
  }
}

export type ProductType = ToggleProduct
  | SetCurrentProduct
  | ClearCurrentProduct
  | InitializeCurrentProduct
  | LoadProduct
  | LoadSuccessProduct
  | LoadFailProduct;
