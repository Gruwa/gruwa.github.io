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

    for (let i = 0; i < value['Items'].length; i++) {

      /**
       * Variable of obj
       * @type {IGroupRestaurant}
       * @memberof HttpGuardService
       */

      const obj: IGroupRestaurant = {
        'id': value['Items'][i].ID,
        'description': value['Items'][i].Description
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
      'isDropRequest': value['Items'].IsDropRequest,
      'isPickupRequest': value['Items'].IsPickupRequest
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
      'shiftTitle': value['Items'].ShiftTitle,
      'shiftID': value['Items'].ShiftID,
      'isDropRequest': value['Items'].IsDropRequest,
      'isPickupRequest': value['Items'].IsPickupRequest,
      'job': value['Items'].Job,
      'jobID': value['Items'].JobID,
      'station': value['Items'].Station,
      'stationID': value['Items'].StationID,
      'dateFrom': value['Items'].DateFrom,
      'dateTo': value['Items'].DateTo,
      'location': value['Items'].Location,
      'locationID': value['Items'].LocationID
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
    resp['locationList'] = [];
    resp['stationList'] = [];
    resp['jobList'] = [];
    resp['items'] = [];

    for (let i = 0; i < value['LocationList'].length; i++) {
      const obj: ILocation = {
        'id': value['LocationList'][i].ID,
        'description': value['LocationList'][i].Description
      };

      resp['locationList'].push(obj);
    }
    for (let i = 0; i < value['StationList'].length; i++) {
      const obj: IStation = {
        'id': value['StationList'][i].ID,
        'description': value['StationList'][i].Description
      };

      resp['stationList'].push(obj);
    }
    for (let i = 0; i < value['JobList'].length; i++) {
      const obj: IJob = {
        'id': value['JobList'][i].ID,
        'description': value['JobList'][i].Description
      };

      resp['jobList'].push(obj);
    }
    for (let i = 0; i < value['Items'].length; i++) {
      const obj: IShift = {
        'shiftTitle': value['Items'][i].ShiftTitle,
        'shiftID': value['Items'][i].ShiftID,
        'isDropRequest': value['Items'][i].IsDropRequest,
        'isPickupRequest': value['Items'][i].IsPickupRequest,
        'job': value['Items'][i].Job,
        'jobID': value['Items'][i].JobID,
        'station': value['Items'][i].Station,
        'stationID': value['Items'][i].StationID,
        'dateFrom': value['Items'][i].DateFrom,
        'dateTo': value['Items'][i].DateTo,
        'location': value['Items'][i].Location,
        'locationID': value['Items'][i].LocationID
      };

      resp['items'].push(obj);
    }

    console.log('http-guard guardShifts', resp); // TODO - Delete when ready
    return resp;
  }
}
