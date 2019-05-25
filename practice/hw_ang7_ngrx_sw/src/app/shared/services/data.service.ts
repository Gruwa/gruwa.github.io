import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {
  IFooterRequest,
  ITabTypesAvailability,
  ITabTypesShifts
} from '../interfaces/types.interface';
import {ISettings} from '../interfaces/settings.interface';

/**
 * Data Service
 */

@Injectable({providedIn: 'root'})
export class DataService {

  /**
   * Start of AVAILABILITY MODULE
   * Variables what working with availability module
   * @memberof DataService
   *
   **************************************************/

  /**
   * Variable LIST_REQUEST_STATUS_AVAILABILITY_COLOR
   * @type {object} - requests for shifts
   * @memberof DataService
   */

  public LIST_REQUEST_STATUS_AVAILABILITY_COLOR: object = {
    'A': '#24B35F',
    'R': '#CC4429',
    'N': '#A1A7B3'
  };

  /**
   * Variable LIST_REQUEST_STATUS_AVAILABILITY
   * @type {object} - requests for shifts
   * @memberof DataService
   */

  public LIST_REQUEST_STATUS_AVAILABILITY: object = {
    'A': 'check_circle',
    'R': 'not_interested',
    'N': 'query_builder'
  };

  /**
   * Variable LIST_REQUEST_STATUS_AVAILABILITY
   * @type {object} - requests for shifts
   * @memberof DataService
   */

  public LIST_REQUEST_STATUS_DESCRIPTION_AVAILABILITY: object = {
    'A': 'Approved',
    'R': 'Denied',
    'N': 'New'
  };

  /**
   * Variable LIST_REQUEST_STATUS_AVAILABILITY
   * @type {object} - requests for shifts
   * @memberof DataService
   */

  public FREQUENCY_WEEKLY_LIST_AVAILABILITY: object = {
    'D': '',
    'W': [
      {id: '0', description: 'Sunday'},
      {id: '1', description: 'Monday'},
      {id: '2', description: 'Tuesday'},
      {id: '3', description: 'Wednesday'},
      {id: '4', description: 'Thursday'},
      {id: '5', description: 'Friday'},
      {id: '6', description: 'Saturday'}
    ],
    'M': [
      {id: '1', description: '1'},
      {id: '2', description: '2'},
      {id: '3', description: '3'},
      {id: '4', description: '4'},
      {id: '5', description: '5'},
      {id: '6', description: '6'},
      {id: '7', description: '7'},
      {id: '8', description: '8'},
      {id: '9', description: '9'},
      {id: '10', description: '10'},
      {id: '11', description: '11'},
      {id: '12', description: '12'},
      {id: '13', description: '13'},
      {id: '14', description: '14'},
      {id: '15', description: '15'},
      {id: '16', description: '16'},
      {id: '17', description: '17'},
      {id: '18', description: '18'},
      {id: '19', description: '19'},
      {id: '20', description: '20'},
      {id: '21', description: '21'},
      {id: '22', description: '22'},
      {id: '23', description: '23'},
      {id: '24', description: '24'},
      {id: '25', description: '25'},
      {id: '26', description: '26'},
      {id: '27', description: '27'},
      {id: '28', description: '28'},
      {id: '29', description: '29'},
      {id: '30', description: '30'},
      {id: '31', description: '31'}
    ]
  };

  /**
   * variable for TABS of availability
   * @param {object} value - object of tabs
   * @memberof DataService
   */

  public TABS_AVAILABILITY = {
    'time off': 'timeoff',
    volunteer: 'volunteer'
  };

  /**
   * variable for TABS of availability
   * @param {Array<ITabTypesAvailability>} value - array of tabs for index of availability
   * @memberof DataService
   */

  public indexTABS_AVAILABILITY: Array<ITabTypesAvailability> = [
    'time off',
    'volunteer'
  ];


  /**
   * variable for FLOW of availability
   * @param {object} value - FLOW for api link
   * @memberof DataService
   */

  public FLOW_AVAILABILITY = {
    'time off': 'dataTimeOff$',
    'volunteer': 'dataVolunteer$'
  };

  public FLOW_AVAILABILITY_HTTP = {
    'time off': 'dataTimeOffHTTP$',
    'volunteer': 'dataVolunteerHTTP$'
  };
  /**
   * Variable LIST_DESCRIPTIONS
   * @type {object}
   * @memberof DataService
   */

  public LIST_DESCRIPTIONS_FORM_AVAILABILITY = {
    title: 'title',
    dateFrom: 'date from',
    dateTrough: 'date through',
    startTime: 'start time',
    endTime: 'end time',
    frequency: 'frequency',
    comment: 'manager comment',
    requestStatus: 'request status',
    frequencyOption: 'frequency option'
  };

  /**
   * Variable LIST_DESCRIPTIONS_KEY_FORM_AVAILABILITY
   * @type {object}
   * @memberof DataService
   */

  public LIST_DESCRIPTIONS_KEY_FORM_AVAILABILITY = [
    'title',
    'dateFrom',
    'dateTrough',
    'startTime',
    'endTime',
    'frequency',
    'comment',
    'requestDescription',
    'frequencyOption'
  ];

  /**
   * End of AVAILABILITY MODULE
   *
   **************************************************/

  /**
   * variable for LOCAL_STORAGE
   * @param {object}
   * @memberof DataService
   */

  public LOCAL_STORAGE: object = {
    'group': 'group',
    'tab': 'tab',
    'token': 'token',
    'user': 'user',
    'tabavailability': 'tabavailability'
  };

  /**
   * variable for METHOD_HTTP_REQUESTS
   * @param {object}
   * @memberof DataService
   */

  public METHODS_HTTP_REQUEST: object = {
    'dataAvailability$': 'getAvailability()'
  };

  /**
   * variable for HttpSuccessResponse
   * @param {object} value - description of success
   * @memberof DataService
   */

  public httpSuccessResponse = {
    'save': 'Save success',
    'delete': 'Delete success',
    'login': 'Login success'
  };

  /**
   * variable for httpErrorResponse
   * @param {object} value - description of success
   * @memberof DataService
   */

  public errorResponse = {
    'emptyRequired': 'You have incorrect required fields',
    'noChanges': 'No changes'
  };

  /**
   * variable for TABS
   * @param {object} value - object of tabs
   * @memberof DataService
   */

  public TABS = {
    upcoming: 'upcoming',
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
   * variable for MAINURL
   * @param {string} value - main url
   * @memberof DataService
   */

  public MAINURL = `${environment.mainUrl}`;

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
   * Variable LIST_FLOWS
   * @type {object}
   * @memberof DataService
   */

  public LIST_FLOWS = {
    'dataRestaurants$': 'dataRestaurants$',
    'dataContactInfo$': 'dataContactInfo$',
    'dataShiftsUpcoming$': 'dataShiftsUpcoming$',
    'dataShiftsAvailable$': 'dataShiftsAvailable$',
    'dataSettings$': 'dataSettings$',
    'dataAvailability$': 'dataAvailability$'
  };

  /**
   * Variable LIST_FLOWS_SWITCH
   * @type {object}
   * @memberof DataService
   */

  public LIST_FLOWS_SWITCH = {
    'dataContactInfo$': 'dataContactInfoSwitch$',
    'dataSettings$': 'dataSettingsSwitch$',
    'dataAvailability$': 'dataAvailabilitySwitch$'
  };

  /**
   * Variable LIST_ROUTE_FLOWS
   * @type {object}
   * @memberof DataService
   */

  public LIST_ROUTE_FLOWS = {
    'dataRestaurants$': [
      'dataRestaurants$'
    ],
    'contactinfo': [
      'dataContactInfo$'
    ],
    ':group': [
      'dataShiftsUpcoming$',
      'dataShiftsAvailable$'
    ],
    'settings': [
      'dataSettings$'
    ],
    'availability': [
      'dataTimeOff$',
      'dataVolunteer$'
    ]
  };

  /**
   * Variable LIST_FIELDS
   * @type {object}
   * @memberof DataService
   */

  public LIST_FIELDS = {
    title: 'request title',
    date: 'date',
    startTime: 'start time',
    endTime: 'end time',
    location: 'location',
    station: 'station',
    jobTitle: 'job title',
    status: 'status'
  };

  /**
   * Variable LIST_FIELDS
   * @type {object}
   * @memberof DataService
   */

  public LIST_FIELDS_FORM_INFO = {
    email: 'email',
    phonePrimary: 'phone',
    enableSMS: 'enable SMS',
    cellProvider: 'cell provider',
    address1: 'address line 1',
    address2: 'address line 2',
    city: 'city',
    state: 'state',
    zip: 'ZIP'
  };

  /**
   * Variable LIST_FIELDS
   * @type {object}
   * @memberof DataService
   */

  public LIST_FIELDS_KEY_FORM_INFO = [
    'email',
    'phonePrimary',
    'enableSMS',
    'cellProvider',
    'address1',
    'address2',
    'city',
    'state',
    'zip'
  ];

  /**
   * Variable of object of list side bar menu
   * @type {object}
   * @memberof DataService
   */

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

  /**
   * Variable of point of side bar list
   * @type {object}
   * @memberof DataService
   */

  public SIDE_BAR_LIST = {
    shifts: 'shifts',
    'my availability': 'availability',
    'contact info': 'contactinfo',
    settings: 'settings',
    logout: 'logout'
  };

  /**
   * Array of settings lists
   * @type {object}
   * @memberof DataService
   */

  public SETTINGS_LIST: Array<ISettings> = [
    {
      id: 'pickup',
      description: 'Shift Available for Pickup',
      value: false
    },
    {
      id: 'update',
      description: 'Schedule Update',
      value: false
    },
    {
      id: 'delete',
      description: 'Schedule Delete',
      value: false
    },
    {
      id: 'Reminder30',
      description: 'Reminder 30 min before Shift Start',
      value: false
    },
    {
      id: 'Reminder60',
      description: 'Reminder 1 hour before Shift Start',
      value: false
    },
    {
      id: 'Reminder120',
      description: 'Reminder 2 hours before Shift Start',
      value: false
    }
  ];
}
