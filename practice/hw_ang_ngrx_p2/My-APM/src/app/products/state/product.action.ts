import {Action} from '@ngrx/store';

export namespace PRODUCT_ACTION {
  export const TOGGLE_PRODUCT_CODE = 'TOGGLE_PRODUCT_CODE';
}

export class ToggleProduct implements Action {
  readonly type = PRODUCT_ACTION.TOGGLE_PRODUCT_CODE;

  constructor(public payload: boolean) {
  }
}

export type PRODUCT = ToggleProduct;
