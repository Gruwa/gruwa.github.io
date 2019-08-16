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
  export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
  export const UPDATE_SUCCESS_PRODUCT = 'UPDATE_SUCCESS_PRODUCT';
  export const UPDATE_FAIL_PRODUCT = 'UPDATE_FAIL_PRODUCT';
  export const DELETE_PRODUCT = 'DELETE_PRODUCT';
  export const DELETE_SUCCESS_PRODUCT = 'DELETE_SUCCESS_PRODUCT';
  export const DELETE_FAIL_PRODUCT = 'DELETE_FAIL_PRODUCT';
  export const SAVE_PRODUCT = 'SAVE_PRODUCT';
  export const SAVE_SUCCESS_PRODUCT = 'SAVE_SUCCESS_PRODUCT';
  export const SAVE_FAIL_PRODUCT = 'SAVE_FAIL_PRODUCT';
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

export class UpdateProduct implements Action {
  readonly type = PRODUCT_ACTION.UPDATE_PRODUCT;

  constructor(public payload: Product) {
  }
}

export class UpdateSuccessProduct implements Action {
  readonly type = PRODUCT_ACTION.UPDATE_SUCCESS_PRODUCT;

  constructor(public payload: Product) {
  }
}

export class UpdateFailProduct implements Action {
  readonly type = PRODUCT_ACTION.UPDATE_FAIL_PRODUCT;

  constructor(public payload: string) {
  }
}

export class DeleteProduct implements Action {
  readonly type = PRODUCT_ACTION.DELETE_PRODUCT;

  constructor(public payload: Product) {
  }
}

export class DeleteSuccessProduct implements Action {
  readonly type = PRODUCT_ACTION.DELETE_SUCCESS_PRODUCT;

  constructor(public payload: Product) {
  }
}

export class DeleteFailProduct implements Action {
  readonly type = PRODUCT_ACTION.DELETE_FAIL_PRODUCT;

  constructor(public payload: string) {
  }
}

export class SaveProduct implements Action {
  readonly type = PRODUCT_ACTION.SAVE_PRODUCT;

  constructor(public payload: Product) {
  }
}

export class SaveSuccessProduct implements Action {
  readonly type = PRODUCT_ACTION.SAVE_SUCCESS_PRODUCT;

  constructor(public payload: Product) {
  }
}

export class SaveFailProduct implements Action {
  readonly type = PRODUCT_ACTION.SAVE_FAIL_PRODUCT;

  constructor(public payload: string) {
  }
}

export type ProductType = ToggleProduct
  | SetCurrentProduct
  | ClearCurrentProduct
  | InitializeCurrentProduct
  | LoadProduct
  | LoadSuccessProduct
  | LoadFailProduct
  | UpdateProduct
  | UpdateSuccessProduct
  | UpdateFailProduct
  | DeleteProduct
  | DeleteSuccessProduct
  | DeleteFailProduct
  | SaveProduct
  | SaveSuccessProduct
  | SaveFailProduct;
