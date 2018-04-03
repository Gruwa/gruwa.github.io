
/**
 * Export interface ILogin
 */

export interface ILogin {
  id: string;
  token: string;
  success: string;
  message: string;
  items: Array<any>; // TODO - when ready IGroup add type
}
