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
