import {Injectable} from '@angular/core';
import {IShift} from '../interfaces/shift.interface';
import {ILocation} from '../interfaces/location.interface';
import {IStation} from '../interfaces/station.interface';
import {IJob} from '../interfaces/job.interface';

/**
 * Http Guard Service
 */

@Injectable()
export class HttpGuardService {

  /**
   * Method for guard shifts
   * @returns {Array<any>}
   * @memberof ShiftsService
   */

  guardReFreshShift(value): Array<any> {

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
   * @memberof ShiftsService
   */

  guardShifts(value): Array<any> {

    /**
     * Variable of resp
     * @type {Array<any>}
     * @memberof ShiftsService
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
