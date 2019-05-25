import {Injectable} from '@angular/core';
import {DataService} from './data.service';

/**
 * Http Guard Request Service
 */

@Injectable({
  providedIn: 'root'
})
export class HttpGuardRequestService {

  /**
   * Creates an instance of HttpGuardRequestService
   * @param {DataService} dataService
   * @memberof HttpGuardRequestService
   */

  constructor(private dataService: DataService) {
  }

  /**
   * Method for guard contact info
   * @returns {Array<any>}
   * @memberof HttpGuardRequestService
   */

  public guardContactInfo(value, oldData): any {
    const GuardObj = {
      Data: {
        ContactInfo: []
      }
    };

    for (let i = 0; i < oldData['contactInfo'].length; i++) {
      for (let k = 0; k < this.dataService.LIST_FIELDS_KEY_FORM_INFO.length; k++) {
        if (oldData['contactInfo'][i].id === this.dataService.LIST_FIELDS_KEY_FORM_INFO[i]) {
          oldData['contactInfo'][i].value = value[this.dataService.LIST_FIELDS_KEY_FORM_INFO[i]];
        }
        if (oldData['contactInfo'][i].id === 'state') {

          oldData['contactInfo'][i].value = value['stateField'];
        }
      }

    }

    for (let i = 0; i < oldData['contactInfo'].length; i++) {

      const obj = {
        'ID': oldData['contactInfo'][i].id,
        'Description': oldData['contactInfo'][i].description,
        'Value': oldData['contactInfo'][i].value
      };

      GuardObj['Data']['ContactInfo'].push(obj);
    }
    return GuardObj;
  }

  /**
   * Method for guard contact info
   * @returns {Array<any>}
   * @memberof HttpGuardRequestService
   */

  public guardAvailability(value): any {
    const obj = {
      'Comment': value.comment,
      'DateFrom': value.dateFrom,
      'DateTrough': value.dateTrough,
      'StartTime': value.startTime,
      'EndTime': value.endTime,
      'Frequency': value.frequency,
      'ID': value.id,
      'Title': value.title,
      'FrequencyOption': value.frequencyOption
    };

    const result = {};
    result['Data'] = {};
    result['Data']['Availability'] = [];
    result['Data']['Availability'].push(obj);
    return result;
  }

  /**
   * Method for guard mark state
   * @returns {Array<any>}
   * @memberof HttpGuardRequestService
   */

  public guardSettings(value): any {
    const GuardObj = {};

    GuardObj['Data'] = {};
    GuardObj['Data']['Settings'] = [];

    for (let i = 0; i < value.length; i++) {

      const obj = {
        'ID': value[i].id,
        'Description': value[i].description,
        'Value': value[i].value
      };
      GuardObj['Data']['Settings'].push(obj);
    }

    return GuardObj;
  }

  /**
   * Method for guard mark state
   * @returns {Array<any>}
   * @memberof HttpGuardRequestService
   */

  public guardMarkState(value): any {
    const obj = {
      Data: {
        'IsDropRequest': value.isDropRequest,
        'IsPickupRequest': value.isPickupRequest
      }
    };

    return obj;
  }

  /**
   * Method for login request
   * @returns {Array<any>}
   * @memberof HttpGuardRequestService
   */

  public guardlogin(value): any {
    const obj = {
      Data: {
        'Username': value.login,
        'Password': value.password,
        'Remember': value.remember,
        'GroupID': value.groupId,
        'ServerName': value.serverName,
         'Group': value.group,
         'UnitID': value.unitID,
         'LocalEmployeeID': value.localEmployeeID
      }
    };

    return obj;
  }
}
