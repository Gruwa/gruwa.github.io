import {Injectable} from '@angular/core';
import {IShift} from '../interfaces/shift.interface';
import {ILocation} from '../interfaces/location.interface';
import {IGroupRestaurant} from '../interfaces/group-restaurant.interface';
import {ISettings} from '../interfaces/settings.interface';
import {IAvailability} from '../interfaces/timeoff.interface';
import {IContactInfoField} from '../interfaces/contact-info.interface';
import {ICellProviders} from '../interfaces/cell-providers.interface';
import {IState} from '../interfaces/state.interface';
import {IRequestStatusAvailability} from '../interfaces/types.interface';
import {DataService} from './data.service';
import {LocalStorageService} from 'ngx-webstorage';

/**
 * Http Guard Service
 */

@Injectable({
  providedIn: 'root'
})
export class HttpGuardService {

  /**
   * Creates an instance of HttpGuardService
   * @param {DataService} dataService
   * @param {LocalStorageService} localStorage
   * @memberof HttpGuardService
   */

  constructor(private dataService: DataService,
              private localStorage: LocalStorageService) {
  }

  /**
   * Method for guard settings of user
   * @returns {Array<ISettings>}
   * @memberof HttpGuardService
   */

  public guardContactInfo(value: any): any {

    const GuardObj = {};

    GuardObj['cellProviderList'] = [];

    if (value.Data['CellProviderList']) {
      for (let i = 0; i < value.Data['CellProviderList'].length; i++) {
        const obj: ICellProviders = {
          'id': value.Data['CellProviderList'][i].ID,
          'description': value.Data['CellProviderList'][i].Description
        };

        GuardObj['cellProviderList'].push(obj);
      }
    }

    GuardObj['stateList'] = [];

    if (value.Data['StateList']) {
      for (let i = 0; i < value.Data['StateList'].length; i++) {
        const obj: IState = {
          'id': value.Data['StateList'][i].ID,
          'description': value.Data['StateList'][i].Description
        };

        GuardObj['stateList'].push(obj);
      }
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
   * @param {any} value
   * @memberof HttpGuardService
   */

  public guardSettings(value: any): Array<ISettings> {

    const GuardObj: Array<ISettings> = [];

    for (let i = 0; i < value['Data']['Settings'].length; i++) {

      const obj: ISettings = {
        'id': value['Data']['Settings'][i].ID,
        'description': value['Data']['Settings'][i].Description,
        'value': value['Data']['Settings'][i].Value
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
        'description': value['Data'][i].Description,
         'serverName': value['Data'][i].ServerName,
         'unitID': value['Data'][i].UnitID,
         'localEmployeeID': value['Data'][i].LocalEmployeeID
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
   * Method for guard availability
   * @returns {Array<any>}
   * @memberof HttpGuardService
   */

  public guardAvailability(value, tab): Array<any> {
    const resp: Array<any> = [];

    resp[tab] = [];

    if (value.Data['FrequencyList']) {
      resp['frequencyList'] = [];

      for (let i = 0; i < value.Data['FrequencyList'].length; i++) {
        const obj: ILocation = {
          'id': value.Data['FrequencyList'][i].ID,
          'description': value.Data['FrequencyList'][i].Description
        };

        resp['frequencyList'].push(obj);
      }
    }

    for (let i = 0; i < value.Data.Availability.length; i++) {
      let requestStatus: IRequestStatusAvailability;
      let requestStatusColor: string;

      if (tab === this.dataService.indexTABS_AVAILABILITY[0]) {
        if (this.dataService.LIST_REQUEST_STATUS_AVAILABILITY[value.Data.Availability[i].RequestStatus]) {
          requestStatus = value.Data.Availability[i].RequestStatus;
        } else {
          requestStatus = 'N';
        }
        requestStatusColor = this.dataService.LIST_REQUEST_STATUS_AVAILABILITY_COLOR[requestStatus];
      } else {
        requestStatus = null;
        requestStatusColor = null;
      }

      const obj: IAvailability = {
        'comment': value.Data.Availability[i].Comment,
        'dateFrom': value.Data.Availability[i].DateFrom,
        'dateTrough': value.Data.Availability[i].DateTrough,
        'startTime': value.Data.Availability[i].StartTime,
        'endTime': value.Data.Availability[i].EndTime,
        'frequency': value.Data.Availability[i].Frequency,
        'id': value.Data.Availability[i].ID,
        'title': value.Data.Availability[i].Title,
        'description': value.Data.Availability[i].Title,
        'requestStatus': this.dataService.LIST_REQUEST_STATUS_AVAILABILITY[requestStatus],
        'requestStatusColor': requestStatusColor,
        'requestDescription': this.dataService.LIST_REQUEST_STATUS_DESCRIPTION_AVAILABILITY[requestStatus],
        'frequencyOption': value.Data.Availability[i].FrequencyOption
      };

      resp[tab].push(obj);
    }

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

    return resp;
  }
}
