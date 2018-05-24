/**
 * Export interface IShift
 */

export interface IShift {

  /**
   * Variable contain shiftTitle
   * @type {string}
   * @memberof IShift
   */

  shiftTitle: string;

  /**
   * Variable contain shiftID
   * @type {string}
   * @memberof IShift
   */

  shiftID: string;

  /**
   * Variable contain IsDropRequest
   * @type {boolean}
   * @memberof IShift
   */

  isDropRequest: boolean;

  /**
   * Variable contain IsPickupRequest
   * @type {boolean}
   * @memberof IShift
   */

  isPickupRequest: boolean;

  /**
   * Variable contain IsVolunteers
   * @type {string}
   * @memberof IShift
   */

  job: string;

  /**
   * Variable contain JobID
   * @type {string}
   * @memberof IShift
   */

  jobID: string;

  /**
   * Variable contain Station
   * @type {string}
   * @memberof IShift
   */

  station: string;

  /**
   * Variable contain StationID
   * @type {string}
   * @memberof IShift
   */

  stationID: string;

  /**
   * Variable contain dateFrom
   * @type {any}
   * @memberof IShift
   */

  dateFrom: any;

  /**
   * Variable contain dateTo
   * @type {any}
   * @memberof IShift
   */

  dateTo: any;

  /**
   * Variable contain location
   * @type {string}
   * @memberof IShift
   */

  location: string;

  /**
   * Variable contain locationID
   * @type {string}
   * @memberof IShift
   */

  locationID: string;
}

/**
 * Export interface IShiftsSorted
 */

export interface IShiftsSorted {

  /**
   * Variable contain dateFormated. Formating date for title
   * @type {any}
   * @memberof IShiftsSorted
   */

  dateFormated: any;

  /**
   * Variable contain dateForm. Date of start shifts
   * @type {any}
   * @memberof IShiftsSorted
   */

  dateFrom: any;

  /**
   * Variable contain shifts of same date
   * @type {Array<IShift>}
   * @memberof IShiftsSorted
   */

  shifts: Array<IShift>;
}
