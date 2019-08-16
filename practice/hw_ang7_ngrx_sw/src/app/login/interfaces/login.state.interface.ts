import * as fromRoot from '../../state/app.state';
import {IGroupRestaurant} from '../../shared/interfaces/group-restaurant.interface';

/**
 * Export interface IState
 * with extends ILoginState
 */

export interface IState extends fromRoot.IState {
  login: ILoginState;
}

/**
 * Export interface ILoginState
 */

export interface ILoginState {
  dataRestaurants: IGroupRestaurant[];
  login: ILoginUser | ILoginUserData;
}

/**
 * Export interface ILoginUser
 */

export interface ILoginUser {
  login: string;
  password: string;
  remember: boolean;
}

/**
 * Export interface ILoginUserData
 */

export interface ILoginUserData extends ILoginUser, IGroupRestaurant {
}

/**
 * Export interface ILogin
 */

export interface ILogin {

  /**
   * Variable contain id
   * @type {string}
   * @memberof ILogin
   */

  id: string;

  /**
   * Variable contain token
   * @type {string}
   * @memberof ILogin
   */

  token: string;

  /**
   * Variable contain success
   * @type {string}
   * @memberof ILogin
   */

  success: string;

  /**
   * Variable contain message
   * @type {string}
   * @memberof ILogin
   */

  message: string;

  /**
   * Variable contain items
   * @type {Array<any>}
   * @memberof ILogin
   */

  // TODO - when will be ready IGroup add type
  items: Array<any>;
}
