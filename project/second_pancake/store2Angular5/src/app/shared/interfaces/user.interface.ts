import {IAddress} from './adress.interface';

/**
 * Interface for creating users
 */

export interface UserInterface {

  /**
   * Variable contain company name
   * @type {string}
   * @memberof UserInterface
   */

  company_name?: string;

  /**
   * Required variable contain first name
   * @type {string}
   * @memberof UserInterface
   */

  first_name?: string;

  /**
   * Required variable contain last name
   * @type {string}
   * @memberof UserInterface
   */

  last_name?: string;

  /**
   * Required variable contain email
   * @type {string}
   * @memberof UserInterface
   */

  email?: string;

  /**
   * Variable contain title
   * @type {string}
   * @memberof UserInterface
   */

  title?: string;

  /**
   * Variable contain information about me
   * @type {string}
   * @memberof UserInterface
   */

  about_me?: string;

  /**
   * Variable contain link on avatar
   * @type {string}
   * @memberof UserInterface
   */

  avatar?: string;

  /**
   * Variable contain created date
   * @type {any}
   * @memberof UserInterface
   */

  created_date?: any;

  /**
   * Variable contain state
   * @type {boolean}
   * @memberof UserInterface
   */

  active?: boolean;

  /**
   * Variable contain id
   * @type {string}
   * @memberof UserInterface
   */

  _id?: string;

  /**
   * Variable contain address
   * @type {IAddress}
   * @memberof UserInterface
   */

  address?: IAddress;
}

