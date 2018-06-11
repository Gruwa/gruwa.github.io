import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {
  IFooterRequest,
  ITabTypesShifts
} from '../interfaces/types.interface';

/**
 * Data Service
 */

@Injectable({providedIn: 'root'})
export class DataService {

  /**
   * variable for HttpErrorResponse
   * @param {object} value - description of errors
   * @memberof DataService
   */

  public httpErrorResponse = {
    '404': 'Page not found',
    '401': 'Authorisation error',
    '500': 'Global error',
    '550': 'Try again later',
    '551': 'Please refresh your data',
    '552': 'Error ID Group'
  };

  /**
   * variable for HttpSuccessResponse
   * @param {object} value - description of success
   * @memberof DataService
   */

  public httpSuccessResponse = {
    'save': 'Save success',
    'delete': 'Delete success'
  };

  /**
   * variable for TABS
   * @param {object} value - object of tabs
   * @memberof DataService
   */

  public TABS = {
    upcoming: 'upcoming',
    'my requests': 'myrequests',
    available: 'available'
  };

  /**
   * variable for TABS
   * @param {Array<ITabTypesShifts>} value - array of tabs for index
   * @memberof DataService
   */

  public indexTABS: Array<ITabTypesShifts> = [
    'upcoming',

    'available'
  ];

  /**
   * variable for FLOW
   * @param {object} value - FLOW for api link
   * @memberof DataService
   */

  public FLOW = {
    upcoming: 'dataShiftsUpcoming$',

    available: 'dataShiftsAvailable$'
  };

  /**
   * variable for BASEURL
   * @param {string} value - base url for api link
   * @memberof DataService
   */

  public BASEURL = `${environment.apiRoot}`;

  /**
   * Variable FOOTER_REQUESTS
   * @type {Array<IFooterRequest>} - requests for shifts
   * @memberof DataService
   */

  public FOOTER_REQUESTS: Array<IFooterRequest> = [
    'request drop',
    'cancel drop request',
    'request pickup',
    'cancel request pickup',
    'cancel request'
  ];

  /**
   * Variable STATUS
   * @type {object} - status of shifts
   * @memberof DataService
   */

  public STATUS = {
    scheduled: 'scheduled',
    'drop request': 'drop request',
    'pickup request': 'pickup request',
    'cancel request': 'cancel request'
  };

  /**
   * Variable SHIFT_ACTIVE
   * @type {object}
   * @memberof DataService
   */

  public SHIFT_ACTIVE = {
    upcoming: 'isDropRequest',
    available: 'isPickupRequest'
  };

  /**
   * Variable SHIFT_REQUEST
   * @type {object}
   * @memberof DataService
   */

  public SHIFT_REQUEST = {
    upcoming: 'pickup request',
    available: 'drop request'
  };

  /**
   * Variable LIST_FIELDS
   * @type {object}
   * @memberof DataService
   */

  public LIST_FIELDS = {
    title: 'request title',
    date: 'sate',
    startTime: 'start time',
    endTime: 'end time',
    location: 'location',
    station: 'station',
    jobTitle: 'job title',
    status: 'status'
  };

  public SIDE_BAR_LIST_MENU = [
    {
      icon: 'compare_arrows',
      description: 'shifts'
    },
    {
      icon: 'insert_invitation',
      description: 'my availability'
    },
    {
      icon: 'phone',
      description: 'contact info'
    },
    {
      icon: 'settings',
      description: 'settings'
    },
    {
      icon: 'power_settings_new',
      description: 'logout'
    }
  ];

  public SIDE_BAR_LIST = {
    shifts: 'shifts',
    'my availability': 'myrequests',
    'contact info': 'available',
    settings: 'settings',
    logout: 'logout'
  };
}
