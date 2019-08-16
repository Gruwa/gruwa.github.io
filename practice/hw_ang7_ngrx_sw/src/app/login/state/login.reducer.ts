import {ILoginState} from '../interfaces/login.state.interface';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {LoginAction, LoginActionsTypes} from './login.action';

const initialLoginState: ILoginState = {
  dataRestaurants: [],
  login: null,
};

const getLoginFeatureState = createFeatureSelector<ILoginState>('login');

export const getLoginData = createSelector( // создаем селектор на конкретную фичу
  getLoginFeatureState,
  state => state.login
);

export function loginReducer(state: ILoginState = initialLoginState, action: LoginActionsTypes): ILoginState {
  switch (action.type) {

    case LoginAction.LOGIN_DATA_LOGIN:
      return {
        ...state,
        login: action.payload
      };

    default:
      return state;
  }
}
