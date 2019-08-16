import {Action} from '@ngrx/store';
import {ILoginUser, ILoginUserData} from '../interfaces/login.state.interface';

export namespace LoginAction {
  export const LOGIN_DATA_LOGIN = 'LOGIN_DATA_LOGIN';
}

export class LoginDataLogin implements Action {
  readonly type = LoginAction.LOGIN_DATA_LOGIN;

  constructor(public payload: ILoginUserData | ILoginUser) {
  }
}

// export class LoginDataLogin implements Action {
//   readonly type = LoginAction.LOGIN_DATA;
//
//   constructor(public payload: ILoginUserData) {
//   }
// }

export type LoginActionsTypes = LoginDataLogin;
