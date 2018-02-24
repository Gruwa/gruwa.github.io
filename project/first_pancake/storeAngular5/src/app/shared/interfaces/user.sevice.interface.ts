import {Observable} from 'rxjs/Observable';

export interface IUserService {

  /**
   * Service method for add new user
   */

  onAddNewUser: (value1: any, value2: string) => Observable<object>;

  /**
   * Service method for get list of Student, Instructor, Admin
   */

  getUsers: (value: string) => Observable<object>;

  /**
   * Service method for get chart of Student, Instructor, Admin
   */

  getChartUsers: () => Observable<object>;

  /**
   * Service method for chek email in db
   */

  getCheckEmail: (value1: string, value2: string) => Observable<object>;

  /**
   * Service method for change status of Student, Instructor, Admin
   */

  onEditToggleStatusUser: (value1: object, value2: string) => Observable<object>;

  /**
   * Service method for delete user
   */

  onDeleteUser: (value1: object, value2: string) => Observable<object>;

  /**
   * Service method for edit user
   */

  onEditUser: (value1: any, value2: string) => Observable<object>;
}
