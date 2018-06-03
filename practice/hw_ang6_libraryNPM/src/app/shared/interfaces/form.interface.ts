import {ILocation} from './location.interface';
import {IJob} from './job.interface';
import {IStation} from './station.interface';

/**
 * Export interface IForm
 */

export interface IForm {

  /**
   * Variable shiftTitle
   * @type {string}
   * @memberof IForm
   */

  shiftTitle: string;

  /**
   * Variable date
   * @type {any}
   * @memberof IForm
   */

  date: any;

  /**
   * Variable startTime
   * @type {any}
   * @memberof IForm
   */

  startTime: any;

  /**
   * Variable endTime
   * @type {any}
   * @memberof IForm
   */

  endTime: any;

  /**
   * Variable location
   * @type {Array<ILocation>}
   * @memberof IForm
   */

  location: string;

  /**
   * Variable station
   * @type {IStation}
   * @memberof IForm
   */

  station: string;

  /**
   * Variable job
   * @type {string}
   * @memberof IForm
   */

  job: string;

  /**
   * Variable status
   * @type {string}
   * @memberof IForm
   */

  status: string;

  /**
   * Variable locationList
   * @type {ILocation}
   * @memberof IForm
   */

  locationList?: ILocation;

  /**
   * Variable jobList
   * @type {IJob}
   * @memberof IForm
   */

  jobList?: IJob;

  /**
   * Variable stationList
   * @type {IStation}
   * @memberof IForm
   */

  stationList?: IStation;
}
