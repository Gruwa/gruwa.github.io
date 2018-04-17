import {IAddress} from './adress.interface';

/**
 * Interface for creating students
 */

export interface IStudent {

  /**
   * Required variable contain first name
   * @type {string}
   * @memberof IStudent
   */

  first_name: string;

  /**
   * Required variable contain last name
   * @type {string}
   * @memberof IStudent
   */

  last_name: string;

  /**
   * Required variable contain email
   * @type {string}
   * @memberof IStudent
   */

  email: string;

  /**
   * Variable contain title
   * @type {string}
   * @memberof IStudent
   */

  avatar?: string;

  /**
   * Variable contain created date
   * @type {any}
   * @memberof IStudent
   */

  created_date?: any;

  /**
   * Variable contain state
   * @type {boolean}
   * @memberof IStudent
   */

  active?: boolean;

  /**
   * Variable contain id
   * @type {string}
   * @memberof IStudent
   */

  _id?: string;

  /**
   * Variable contain address
   * @type {IAddress}
   * @memberof IStudent
   */

  address?: IAddress;
}

