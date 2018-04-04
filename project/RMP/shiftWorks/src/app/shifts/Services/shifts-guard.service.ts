import {Injectable} from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import {ILogin} from '../../shared/interfaces/login.interface';
import {IGroupRestaurant} from '../../shared/interfaces/group-restaurant.interface';

@Injectable()
export class GuardShiftsService {

  /**
   * Method for guard shifts
   * @returns {ILogin}
   * @memberof AuthGuardService
   */

  guardLogin(value) {

    /**
     * Variable of GuardObj
     * @type {Array<IGroupRestaurant>}
     * @memberof AuthGuardService
     */

    const GuardObj: Array<IGroupRestaurant> = [];


    for (let i = 0; i > value.length; i++) {

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
