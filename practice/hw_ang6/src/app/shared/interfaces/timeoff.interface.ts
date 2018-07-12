import {IFrequency} from './frequency.interface';

/**
 * Export interface TimeOff
 */

export interface ITimeOff {

  /**
   * Variable contain comment
   * @type {string}
   * @memberof ITimeOff
   */

  comment: string;

  /**
   * Variable contain dateFrom
   * @type {any}
   * @memberof ITimeOff
   */

  dateFrom: any;

  /**
   * Variable contain endDate
   * @type {any}
   * @memberof ITimeOff
   */

  dateTrough: any;

  /**
   * Variable contain startTime
   * @type {string}
   * @memberof ITimeOff
   */

  startTime: string;

  /**
   * Variable contain frequency
   * @type {string}
   * @memberof ITimeOff
   */

  frequency: string;

  /**
   * Variable contain id
   * @type {string}
   * @memberof ITimeOff
   */

  id: string;

  /**
   * Variable contain endTime
   * @type {string}
   * @memberof ITimeOff
   */

  endTime: string;

  /**
   * Variable contain title
   * @type {string}
   * @memberof ITimeOff
   */

  title: string;

  /**
   * Variable contain description
   * @type {string}
   * @memberof ITimeOff
   */

  description: string;

  /**
   * Variable contain frequencyList
   * @type {Array<IFrequency>}
   * @memberof ITimeOff
   */

  frequencyList?: Array<IFrequency>;

}
