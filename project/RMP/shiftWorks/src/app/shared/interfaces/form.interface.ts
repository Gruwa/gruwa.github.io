/**
 * Export interface IForm
 */

export interface IForm extends IStation, IJobTitle, ILocation {

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

/**
 * Export interface ILocation
 */

export interface ILocation {
    locationGroup?: Array<string>;
}

/**
 * Export interface IStation
 */

export interface IStation {
    stationGroup?: Array<string>;
}

/**
 * Export interface IJobTitle
 */

export interface IJobTitle {
    jobTitleGroup?: Array<string>;
}
