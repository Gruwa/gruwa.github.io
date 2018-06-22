import {Injectable} from '@angular/core';
import {IShift} from '../interfaces/shift.interface';
import {ILocation} from '../interfaces/location.interface';
import {IStation} from '../interfaces/station.interface';
import {IJob} from '../interfaces/job.interface';
import {IGroupRestaurant} from '../interfaces/group-restaurant.interface';
import {ISettings} from '../interfaces/settings.interface';

/**
 * Http Guard Service
 */

@Injectable({
  providedIn: 'root'
})
export class HttpGuardService {

  /**
   * Method for guard settings of user
   * @returns {Array<ISettings>}
   * @memberof HttpGuardService
   */

  public guardSettings(value: any): Array<ISettings> {

    const GuardObj: Array<ISettings> = [];

    console.log(value);

    for (let i = 0; i < value['Data'].length; i++) {

      const obj: ISettings = {
        'id': value['Data'][i].ID,
        'description': value['Data'][i].Description,
        'checked': value['Data'][i].Checked
      };
      GuardObj.push(obj);
    }

    return GuardObj;
  }

  /**
   * Method for guard groups of restaurant
   * @returns {Array<IGroupRestaurant>}
   * @memberof HttpGuardService
   */

  public guardRestaurants(value): Array<IGroupRestaurant> {

    /**
     * Variable of GuardObj
     * @type {Array<IGroupRestaurant>}
     * @memberof HttpGuardService
     */

    const GuardObj: Array<IGroupRestaurant> = [];

    for (let i = 0; i < value['Data'].length; i++) {

      /**
       * Variable of obj
       * @type {IGroupRestaurant}
       * @memberof HttpGuardService
       */

      const obj: IGroupRestaurant = {
        'id': value['Data'][i].ID,
        'description': value['Data'][i].Description
      };
      GuardObj.push(obj);
    }

    return GuardObj;
  }

  /**
   * Method for guard mark state
   * @returns {Array<any>}
   * @memberof HttpGuardService
   */

  public guardMarkState(value): Array<any> {

    const resp: Array<any> = [];
    resp['items'] = [];

    const obj: object = {
      'isDropRequest': value['Data'].IsDropRequest,
      'isPickupRequest': value['Data'].IsPickupRequest
    };

    resp['items'].push(obj);

    return resp;
  }

  /**
   * Method for guard shifts
   * @returns {Array<any>}
   * @memberof HttpGuardService
   */

  public guardReFreshShift(value): Array<any> {

    const resp: Array<any> = [];
    resp['items'] = [];

    const obj: IShift = {
      'shiftTitle': value['Data'].ShiftTitle,
      'shiftID': value['Data'].ShiftID,
      'isDropRequest': value['Data'].IsDropRequest,
      'isPickupRequest': value['Data'].IsPickupRequest,
      'job': value['Data'].Job,
      'jobID': value['Data'].JobID,
      'station': value['Data'].Station,
      'stationID': value['Data'].StationID,
      'dateFrom': value['Data'].DateFrom,
      'dateTo': value['Data'].DateTo,
      'location': value['Data'].Location,
      'locationID': value['Data'].LocationID
    };

    resp['items'].push(obj);

    return resp;
  }

  /**
   * Method for guard shifts
   * @returns {Array<any>}
   * @memberof HttpGuardService
   */

  public guardShifts(value): Array<any> {

    /**
     * Variable of resp
     * @type {Array<any>}
     * @memberof HttpGuardService
     */

    const resp: Array<any> = [];
    resp['items'] = [];

    // resp['locationList'] = [];
    // resp['stationList'] = [];
    // resp['jobList'] = [];
    // for (let i = 0; i < value['LocationList'].length; i++) {
      //   const obj: ILocation = {
      //     'id': value['LocationList'][i].ID,
      //     'description': value['LocationList'][i].Description
      //   };
      //
      //   resp['locationList'].push(obj);
      // }
      // for (let i = 0; i < value['StationList'].length; i++) {
      //   const obj: IStation = {
      //     'id': value['StationList'][i].ID,
      //     'description': value['StationList'][i].Description
      //   };
      //
      //   resp['stationList'].push(obj);
      // }
      // for (let i = 0; i < value['JobList'].length; i++) {
      //   const obj: IJob = {
      //     'id': value['JobList'][i].ID,
      //     'description': value['JobList'][i].Description
      //   };
      //
      //   resp['jobList'].push(obj);
      // }
      // TODO - for timeoff

      for (let i = 0; i < value['Data'].length; i++) {
        const obj: IShift = {
          'shiftTitle': value['Data'][i].ShiftTitle,
          'shiftID': value['Data'][i].ShiftID,
          'isDropRequest': value['Data'][i].IsDropRequest,
          'isPickupRequest': value['Data'][i].IsPickupRequest,
          'job': value['Data'][i].Job,
          'jobID': value['Data'][i].JobID,
          'station': value['Data'][i].Station,
          'stationID': value['Data'][i].StationID,
          'dateFrom': value['Data'][i].DateFrom,
          'dateTo': value['Data'][i].DateTo,
          'location': value['Data'][i].Location,
          'locationID': value['Data'][i].LocationID
        };

        resp['items'].push(obj);
      }

      console.log('http-guard guardShifts', resp); // TODO - Delete when ready
      return resp;
    }
  }
