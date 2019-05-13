import {UserActionTypes, USER_ACTION} from './user.action';
import {User} from '../user';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface UserState {
  showUserName: boolean;
  currentUser: User;
}

const initialState: UserState = {
  showUserName: true,
  currentUser: null,
};

const getUserFeatureState = createFeatureSelector<UserState>('users'); // селектор на вызов 'users' всего стейта

export const getShowUserName = createSelector( // создаем селектор на конкретную фичу
  getUserFeatureState,
  state => state.showUserName
);

export function userReducer(state: UserState = initialState, action: UserActionTypes): UserState {
  switch (action.type) {
    case USER_ACTION.MASK_USER_NAME:
      return {
        ...state,
        showUserName: action.payload
      };
    default:
      return state;
  }
}
