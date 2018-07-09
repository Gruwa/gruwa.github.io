import {Injectable} from '@angular/core';
import {ITimeOff} from '../../shared/interfaces/timeoff.interface';

/**
 * Availability Service
 */

@Injectable()
export class AvailabilityService {

  /**
   * Method getAvailabilityActive
   * @returns {void}
   * @memberof AvailabilityService
   */

  public getAvailabilityActive(items: any, id: string): ITimeOff {
    return items['items'].find(item => item.id === id);
  }

  // /**
  //  * Method getAvailabilityActive
  //  * @returns {void}
  //  * @memberof AvailabilityService
  //  */
  //
  // public setAvailability(items: any, id: string): ITimeOff {
  //   items['items'].find(item => item.id === id);
  //
  //   this.dataService[`${FLOW[this.tab]}`].subscribe((data) => {
  //     for (const key in data['items']) {
  //       if (data['items'][key].shiftID === resp.items[0].shiftID) {
  //         data['items'][key] = resp.items[0];
  //       }
  //     }
  //   });
  //
  //   for (let i = 0; i > items.length; i++) {
  //     if (items[i].id === id) {
  //       items.splice(i, 1);
  //     }
  //   }
  //
  // }
}
