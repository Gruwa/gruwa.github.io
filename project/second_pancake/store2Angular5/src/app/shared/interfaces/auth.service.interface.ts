import {Observable} from 'rxjs/Observable';

/**
 * Interface for creating Auth Service
 */


export interface IAuthService {

  /**
   * Method for registration admins
   * @params {object} value
   * @returns {Observable<object>}
   * @memberof IAuthService
   */

  onRegistration: (value: object) => Observable<object>;

  /**
   * Method for login admins
   * @params {object} value
   * @returns {Observable<object>}
   * @memberof IAuthService
   */

  onLoginUser: (value: object) => Observable<object>;

  /**
   * Method for log out from system
   * @returns {void}
   * @memberof IAuthService
   */

  onLogOut: () => void;

  /**
   * Method for create password for admins
   * @params {object} value
   * @returns {Observable<object>}
   * @memberof IAuthService
   */

  resetPasswordConfirm: (value: object) => Observable<object>;

  /**
   * Method for get new password for admins
   * @params {object} value
   * @returns {Observable<object>}
   * @memberof IAuthService
   */

  forgotPassword: (value: object) => Observable<object>;
}
