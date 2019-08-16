import {createFeatureSelector, createSelector} from '@ngrx/store';
import {IAppState} from './app.state';
import {AppAction, AppActionTypes} from './app.action';

const initialLoginState: IAppState = {
  dataSmallSpinner: false,
  dataSpinner: false,
  buttonAuth: false
};

const getAppFeatureState = createFeatureSelector<IAppState>('app');

// export const getLoginData = createSelector( // создаем селектор на конкретную фичу
//   getLoginFeatureState,
//   state => state.login
// );

export function appReducer(state: IAppState = initialLoginState, action: AppActionTypes): IAppState {
  switch (action.type) {

    case AppAction.SPINNER_APP:
      return {
        ...state,
        dataSpinner: action.payload
      };

    case AppAction.SMALL_SPINNER_APP:
      return {
        ...state,
        dataSpinner: action.payload
      };

    case AppAction.BUTTON_AUTH_APP:
      return {
        ...state,
        dataSpinner: action.payload
      };

    default:
      return state;
  }
}
