import {Injectable} from '@angular/core';
import {ITimeOff} from '../../shared/interfaces/timeoff.interface';
import {takeUntil} from 'rxjs/operators';

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
  // public setAvailability(id: string) {
  //   this.flowService[`${this.dataService.FLOW_AVAILABILITY[this.localStorage.retrieve('tabavailability')]}`].pipe(
  //     takeUntil(this.ngUnsubscribe)
  //   ).subscribe(
  //     (data) => {
  //       for (const key in data['items']) {
  //         if (data['items'][key].id === id) {
  //           data['items'].splice(key, 1);
  //           this.router.navigate(['/availability']);
  //         }
  //       }
  //     });
  //
  // }
}
