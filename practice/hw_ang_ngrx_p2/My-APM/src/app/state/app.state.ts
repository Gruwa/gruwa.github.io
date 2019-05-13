import {UserState} from '../user/state/user.reducer';

export interface State {
  app: AppState;
  users: UserState;
  customers: any;
}

export interface AppState {
  hideWelcomePage: boolean;
}
