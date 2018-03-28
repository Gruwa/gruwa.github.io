/**
 * Export type for tab
 */

export type ITabTypes = 'upcoming' | 'my requests' | 'available';

/**
 * Export type for footer requests
 */

export type IFooterRequest = 'request pickup' | 'cancel request pickup' | 'request drop' | 'cancel drop request' | 'cancel request';

/**
 * Export type IShift
 */

export type IShift = {

    /**
     * Variable contain id
     * @type {string}
     * @memberof IShift
     */

    ID: string;

    /**
     * Variable contain IsDropRequest
     * @type {boolean}
     * @memberof IShift
     */

    IsDropRequest: boolean;

    /**
     * Variable contain IsPickupRequest
     * @type {boolean}
     * @memberof IShift
     */

    IsPickupRequest: boolean;

    /**
     * Variable contain IsVolunteers
     * @type {boolean}
     * @memberof IShift
     */

    IsVolunteers: boolean;

    /**
     * Variable contain Job
     * @type {string}
     * @memberof IShift
     */

    Job: string;

    /**
     * Variable contain JobID
     * @type {any}
     * @memberof IShift
     */

    JobID: any;

    /**
     * Variable contain Station
     * @type {any}
     * @memberof IShift
     */

    Station: any;

    /**
     * Variable contain StationID
     * @type {any}
     * @memberof IShift
     */

    StationID: any;

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
};

export type IShiftsSorted = {

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

export type IForm = {

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
     * @type {string}
     * @memberof IForm
     */

    location: string;

    /**
     * Variable station
     * @type {string}
     * @memberof IForm
     */

    station: string;

    /**
     * Variable jobTitle
     * @type {string}
     * @memberof IForm
     */

    jobTitle: string;

    /**
     * Variable status
     * @type {string}
     * @memberof IForm
     */

    status: string;

    /**
     * Variable shiftTitle
     * @type {string}
     * @memberof IForm
     */

    shiftTitleDescription: string;

    /**
     * Variable date
     * @type {any}
     * @memberof IForm
     */

    dateDescription: string;

    /**
     * Variable startTime
     * @type {any}
     * @memberof IForm
     */

    startTimeDescription: string;

    /**
     * Variable endTime
     * @type {any}
     * @memberof IForm
     */

    endTimeDescription: string;

    /**
     * Variable location
     * @type {string}
     * @memberof IForm
     */

    locationDescription: string;

    /**
     * Variable station
     * @type {string}
     * @memberof IForm
     */

    stationDescription: string;

    /**
     * Variable jobTitle
     * @type {string}
     * @memberof IForm
     */

    jobTitleDescription: string;

    /**
     * Variable status
     * @type {string}
     * @memberof IForm
     */

    statusDescription: string;
}