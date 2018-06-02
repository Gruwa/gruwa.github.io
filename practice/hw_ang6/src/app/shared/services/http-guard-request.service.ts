import {Injectable} from '@angular/core';
import {IShiftMArkState} from '../interfaces/mark-state-shift.interface';

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

  guardMarkState(value) {

    const obj = {
      data: {
        'IsDropRequest': value.isDropRequest,
        'IsPickupRequest': value.isPickupRequest
      }
    };

    return obj;
  }
}
