import {Action} from '@ngrx/store';

export namespace AppAction {
  export const SPINNER_APP = 'SPINNER_APP';
  export const SMALL_SPINNER_APP = 'SMALL_SPINNER_APP';
  export const BUTTON_AUTH_APP = 'BUTTON_AUTH_APP';
}

export class SpinnerApp implements Action {
  readonly type = AppAction.SPINNER_APP;

  constructor(public payload: boolean) {
  }
}

export class SmallSpinnerApp implements Action {
  readonly type = AppAction.SMALL_SPINNER_APP;

  constructor(public payload: boolean) {
  }
}

export class ButtonAuthApp implements Action {
  readonly type = AppAction.BUTTON_AUTH_APP;

  constructor(public payload: boolean) {
  }
}

export type AppActionTypes = SpinnerApp
  | SmallSpinnerApp
  | ButtonAuthApp;
