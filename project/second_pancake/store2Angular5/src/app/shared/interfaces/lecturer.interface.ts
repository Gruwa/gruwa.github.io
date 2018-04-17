import {IStudent} from './student.interface';

/**
 * Interface for creating lecturers
 */

export interface ILecturer extends IStudent{

  /**
   * Variable contain company name
   * @type {string}
   * @memberof ILecturer
   */

  company_name?: string;

   /**
    * Variable contain title
    * @type {string}
    * @memberof ILecturer
   */

  title?: string;

  /**
   * Variable contain information about me
   * @type {string}
   * @memberof ILecturer
   */

  about_me?: string;
}

