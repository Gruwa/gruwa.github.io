import {Action} from '@ngrx/store';

export namespace USER_ACTION {
  export const MASK_USER_NAME = 'MASK_USER_NAME';
}

export class MaskUser implements Action {
  readonly type = USER_ACTION.MASK_USER_NAME;

  constructor(public payload: boolean) {
  }
}

export type USER = MaskUser;
