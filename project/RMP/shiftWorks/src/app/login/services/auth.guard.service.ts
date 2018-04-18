import {Injectable} from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import {IGroupRestaurant} from '../../shared/interfaces/group-restaurant.interface';

/**
 * Auth Guard Service
 */

@Injectable()
export class AuthGuardService {

  /**
   * Method for guard groups of restaurant
   * @returns {Array<IGroupRestaurant>}
   * @memberof AuthGuardService
   */

  guardLogin(value): Array<IGroupRestaurant> {

    /**
     * Variable of GuardObj
     * @type {Array<IGroupRestaurant>}
     * @memberof AuthGuardService
     */

    const GuardObj: Array<IGroupRestaurant> = [];

    for (let i = 0; i < value.length; i++) {

      /**
       * Variable of obj
       * @type {IGroupRestaurant}
       * @memberof AuthGuardService
       */

      const obj: IGroupRestaurant = {
        'id': value[i].ID,
        'description': value[i].Description
      };
      GuardObj.push(obj);
    }

    return GuardObj;
  }
}
