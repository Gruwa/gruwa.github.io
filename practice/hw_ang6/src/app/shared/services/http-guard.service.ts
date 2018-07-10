import {Injectable} from '@angular/core';
import {IShift} from '../interfaces/shift.interface';
import {ILocation} from '../interfaces/location.interface';
import {IStation} from '../interfaces/station.interface';
import {IJob} from '../interfaces/job.interface';
import {IGroupRestaurant} from '../interfaces/group-restaurant.interface';
import {ISettings} from '../interfaces/settings.interface';
import {ITimeOff} from '../interfaces/timeoff.interface';
import {IContactInfoField} from '../interfaces/contact-info.interface';
import {ICellProviders} from '../interfaces/cell-providers.interface';
import {IState} from '../interfaces/state.interface';

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

  public guardContactInfo(value: any): any { // TODO - Rewrite when we will have more information

    console.log(value);

    const GuardObj = {};

    GuardObj['cellProvidersList'] = [];

    for (let i = 0; i < value.Data['CellProvidersList'].length; i++) {
      const obj: ICellProviders = {
        'id': value.Data['CellProvidersList'][i].ID,
        'description': value.Data['CellProvidersList'][i].Description
      };

      GuardObj['cellProvidersList'].push(obj);
    }

    GuardObj['statesList'] = [];

    for (let i = 0; i < value.Data['StatesList'].length; i++) {
      const obj: IState = {
        'id': value.Data['StatesList'][i].ID,
        'description': value.Data['StatesList'][i].Description
      };

      GuardObj['statesList'].push(obj);
    }

    GuardObj['contactInfo'] = [];

    for (let i = 0; i < value['Data']['ContactInfo'].length; i++) {

      const obj: IContactInfoField = {
        'id': value['Data']['ContactInfo'][i].ID,
        'description': value['Data']['ContactInfo'][i].Description,
        'value': value['Data']['ContactInfo'][i].Value
      };
      GuardObj['contactInfo'].push(obj);
    }

    return GuardObj;
  }

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

  public guardAvailabilities(value): Array<any> {

    /**
     * Variable of resp
     * @type {Array<any>}
     * @memberof HttpGuardService
     */

    const resp: Array<any> = [];
    resp['items'] = [];

    resp['frequencyList'] = [];

    for (let i = 0; i < value.Data['FrequencyList'].length; i++) {
      const obj: ILocation = {
        'id': value.Data['FrequencyList'][i].ID,
        'description': value.Data['FrequencyList'][i].Description
      };

      resp['frequencyList'].push(obj);
    }

    resp['items'] = [];

    for (let i = 0; i < value.Data.TimeOffs.length; i++) {
      const obj: ITimeOff = {
        'comment': value.Data.TimeOffs[i].Comment,
        'dateFrom': value.Data.TimeOffs[i].DateFrom,
        'dateTrough': value.Data.TimeOffs[i].DateTrough,
        'startTime': value.Data.TimeOffs[i].StartTime,
        'endTime': value.Data.TimeOffs[i].EndTime,
        'frequency': value.Data.TimeOffs[i].Frequency,
        'id': value.Data.TimeOffs[i].ID,
        'title': value.Data.TimeOffs[i].Title,
        'description': value.Data.TimeOffs[i].Title
      };

      resp['items'].push(obj);
    }

    return resp;

  }

  public guardAvailability(value) {

    const obj = {
      Data: {
        'comment': value.Comment,
        'dateFrom': value.DateFrom,
        'dateTrough': value.DateTrough,
        'startTime': value.StartTime,
        'endTime': value.EndTime,
        'frequency': value.Frequency,
        'id': value.ID,
        'title': value.Title
      }
    };

    return obj;
  }

  public guardShifts(value): Array<any> {

    /**
     * Variable of resp
     * @type {Array<any>}
     * @memberof HttpGuardService
     */

    const resp: Array<any> = [];
    resp['items'] = [];

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
