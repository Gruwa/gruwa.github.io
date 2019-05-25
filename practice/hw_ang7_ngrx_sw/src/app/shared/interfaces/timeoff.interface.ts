import {IFrequency} from './frequency.interface';

/**
 * Export interface availability
 */

export interface IAvailability {

  /**
   * Variable contain comment
   * @type {string}
   * @memberof IAvailability
   */

  comment: string;

  /**
   * Variable contain dateFrom
   * @type {any}
   * @memberof IAvailability
   */

  dateFrom: any;

  /**
   * Variable contain endDate
   * @type {any}
   * @memberof IAvailability
   */

  dateTrough: any;

  /**
   * Variable contain startTime
   * @type {string}
   * @memberof IAvailability
   */

  startTime: string;

  /**
   * Variable contain frequency
   * @type {string}
   * @memberof IAvailability
   */

  frequency: string;

  /**
   * Variable contain id
   * @type {string}
   * @memberof IAvailability
   */

  id: string;

  /**
   * Variable contain endTime
   * @type {string}
   * @memberof IAvailability
   */

  endTime: string;

  /**
   * Variable contain title
   * @type {string}
   * @memberof IAvailability
   */

  title: string;

  /**
   * Variable contain description
   * @type {string}
   * @memberof IAvailability
   */

  description: string;

  /**
   * Variable contain frequencyList
   * @type {Array<IFrequency>}
   * @memberof IAvailability
   */

  frequencyList?: Array<IFrequency>;

  /**
   * Variable request status
   * @type {string}
   * @memberof IAvailability
   */

  requestStatus?: string;

  /**
   * Variable for color icon
   * @type {string}
   * @memberof IAvailability
   */

  requestStatusColor?: string;

  /**
   * Variable for description of request
   * @type {string}
   * @memberof IAvailability
   */

  requestDescription?: string;

  /**
   * Variable for frequencyOption
   * @type {string}
   * @memberof IAvailability
   */

  frequencyOption: string;
}
