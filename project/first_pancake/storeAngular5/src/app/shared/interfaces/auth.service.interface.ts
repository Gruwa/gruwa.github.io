import {Observable} from 'rxjs/Observable';

export interface IAuthService {
  
  /**
   * Method for registration admins
   */
  
  onRegistration: (value: object) => Observable<object>;

  /**
   * Method for login admins
   */

  onLoginUser: (value: object) => Observable<object>;

  /**
   * Method for log out from system
   */

  onLogOut: () => void;

  /**
   * Method for create password for admins
   */

  resetPasswordConfirm: (value: object) => Observable<object>;

  /**
   * Method for get new password for admins
   */

  forgotPassword: (value: object) => Observable<object>;
}
