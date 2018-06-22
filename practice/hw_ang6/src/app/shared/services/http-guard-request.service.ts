import {Injectable} from '@angular/core';

/**
 * Http Guard Request Service
 */

@Injectable({
  providedIn: 'root'
})
export class HttpGuardRequestService {

  /**
   * Method for guard mark state
   * @returns {Array<any>}
   * @memberof ShiftsService
   */

  public guardSettings(value) {

    const obj = {
      Data: value
    };
    return obj;
  }

  /**
   * Method for guard mark state
   * @returns {Array<any>}
   * @memberof ShiftsService
   */

  public guardMarkState(value) {

    const obj = {
      Data: {
        'IsDropRequest': value.isDropRequest,
        'IsPickupRequest': value.isPickupRequest
      }
    };

    return obj;
  }

  /**
   * Method for login request
   * @returns {Array<any>}
   * @memberof ShiftsService
   */

  public guardlogin(value) {

    const obj = {
      Data: {
        'Username': value.login,
        'Password': value.password,
        'Remember': value.remember
      }
    };

    return obj;
  }
}
