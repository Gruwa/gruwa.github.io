import {USER, USER_ACTION} from './user.action';
import {User} from '../user';

export interface UserState {
  showUserName: boolean;
  currentUser: User;
}

const initialState: UserState = {
  showUserName: true,
  currentUser: null,
};

export function userReducer(state: UserState = initialState, action: USER) {
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
