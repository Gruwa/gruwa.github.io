import {Observable} from 'rxjs/Observable';

/**
 * Interface for user service
 */

export interface IUserService {

  /**
   * Service method for add new user
   * @params {any} value1
   * @params {string} value2
   * @returns {Observable<object>}
   * @memberof IUserService
   */

  onAddNewUser: (value1: any, value2: string) => Observable<object>;

  /**
   * Service method for get list of Student, Instructor, Admin
   * @params {string} value
   * @returns {Observable<object>}
   * @memberof IUserService
   */

  getUsers: (value: string) => Observable<object>;

  /**
   * Service method for get chart of Student, Instructor, Admin
   * @returns {Observable<object>}
   * @memberof IUserService
   */

  getChartUsers: () => Observable<object>;

  /**
   * Service method for chek email in db
   * @params {string} value1
   * @params {string} value2
   * @returns {Observable<object>}
   * @memberof IUserService
   */

  getCheckEmail: (value1: string, value2: string) => Observable<object>;

  /**
   * Service method for change status of Student, Instructor, Admin
   * @params {object} value1
   * @params {string} value2
   * @returns {Observable<object>}
   * @memberof IUserService
   */

  onEditToggleStatusUser: (value1: object, value2: string) => Observable<object>;

  /**
   * Service method for delete user
   * @params {object} value1
   * @params {string} value2
   * @returns {Observable<object>}
   * @memberof IUserService
   */

  onDeleteUser: (value1: object, value2: string) => Observable<object>;

  /**
   * Service method for edit user
   * @params {any} value1
   * @params {string} value2
   * @returns {Observable<object>}
   * @memberof IUserService
   */

  onEditUser: (value1: any, value2: string) => Observable<object>;
}
