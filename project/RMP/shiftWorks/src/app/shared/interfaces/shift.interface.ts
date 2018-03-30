import {IJobTitle, ILocation, IStation} from './form.interface';

/**
 * Export interface IShift
 */

export interface IShift extends IStation, IJobTitle, ILocation {

    /**
     * Variable contain id
     * @type {string}
     * @memberof IShift
     */

    id: string;

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
     * @type {boolean}
     * @memberof IShift
     */

    isVolunteers: boolean;

    /**
     * Variable contain Job
     * @type {any}
     * @memberof IShift
     */

    job: any;

    /**
     * Variable contain JobID
     * @type {any}
     * @memberof IShift
     */

    jobID: any;

    /**
     * Variable contain Station
     * @type {any}
     * @memberof IShift
     */

    station: any;

    /**
     * Variable contain StationID
     * @type {any}
     * @memberof IShift
     */

    stationID: any;

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
     * @type {any}
     * @memberof IShift
     */

    location: any;
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
