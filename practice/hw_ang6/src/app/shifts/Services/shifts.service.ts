import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {
  IShift,
  IShiftsSorted
} from '../../shared/interfaces/shift.interface';
import {HttpService} from '../../shared/services/http.service';
import {FlowService} from '../../shared/services/flow.service';
import * as moment from 'moment';

/**
 * Variable of month
 * @type {Array<string>}
 * @memberof ShiftsService
 */

const MONTH: Array<string> =
  [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

/**
 * Variable of day
 * @type {Array<string>}
 * @memberof ShiftsService
 */

const DAY: Array<string> =
  [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

/**
 * Auth Guard Service
 */

@Injectable()
export class ShiftsService {

  /**
   * Variable shifts
   * @memberof ShiftsService
   */

  public shifts: Array<IShift>;

  /**
   * Creates an instance of ShiftsService
   * @param {Router} router
   * @param {HttpService} httpService
   * @param {FlowService} flowService
   * @memberof ShiftsService
   */

  constructor(public router: Router,
              public httpService: HttpService,
              public flowService: FlowService) {
  }

  /**
   * Method for creating and sorting array of shifts
   * @param {Array<IShift>} value - raw array of shifts
   * @returns {Array<IShiftsSorted>}
   * @memberof ShiftsService
   */

  sortShifts(value: Array<IShift>): Array<IShiftsSorted> {

    this.shifts = value;

    /**
     * Variable of newObjectOfShifts
     * @type {Object}
     * @memberof ShiftsService
     */

    const newObjectOfShifts = {};

    /**
     * Variable of result
     * @type {Array}
     * @memberof ShiftsService
     */

    const result: Array<IShiftsSorted> = [];

    /**
     * Method for formating date of shifts
     * @param {any} dateStr - date of starting shifts
     * @returns {string}
     * @memberof ShiftsService
     */

    function getFormatedDate(dateStr: any): string {

      /**
       * Variable of date
       * @type {any}
       * @memberof ShiftsService
       */

      const date: any = new Date(dateStr);

      console.log(date);
      console.log(date.getDay());

      return DAY[date.getDay()] + ',' + ' ' + MONTH[date.getMonth()] + ' ' + date.getDate();
    }

    /**
     * Loop for creating new object of shifts
     * @memberof ShiftsService
     */

    for (let i = 0; i < value.length; i++) {

      /**
       * Variable of formatedDate
       * @type {any}
       * @memberof ShiftsService
       */

      const formatedDate: any = getFormatedDate(value[i].dateFrom);

      if (newObjectOfShifts[formatedDate]) {
        newObjectOfShifts[formatedDate].shifts.push(value[i]);
      } else {

        /**
         * Variable of object for creating new object
         * @type {any}
         * @memberof ShiftsService
         */

        const object: any = {
          'dateFrom': value[i].dateFrom,
          'dateFormated': formatedDate,
          'shifts': []
        };
        object.shifts.push(newObjectOfShifts[formatedDate]);
        newObjectOfShifts[formatedDate] = object;
        newObjectOfShifts[formatedDate].shifts = [value[i]];
      }
    }

    /**
     * Loop for creating new array of shifts
     * @memberof ShiftsService
     */

    for (const i in newObjectOfShifts) {
      newObjectOfShifts[i].shifts.sort(this.sortFunction);
      result.push(newObjectOfShifts[i]);
    }

    this.flowService.dataSpinner$.next(false);
    this.flowService.dataSmallSpinner$.next(false);
    return result.sort(this.sortFunction);
  }

  /**
   * Method of sorting
   * @param {IShiftsSorted} a - sorted shift
   * @param {IShiftsSorted} b - sorted shift
   * @returns {number}
   * @memberof ShiftsService
   */

  sortFunction(a: IShiftsSorted, b: IShiftsSorted): number {
    const dateA = new Date(a.dateFrom).getTime();
    const dateB = new Date(b.dateFrom).getTime();

    return dateA > dateB ? 1 : -1;
  }

  /**
   * Method of create dateFrom and dateTo for save request
   * @param {string} timeFrom
   * @param {string} timeTo
   * @param {string} date
   * @returns {Array}
   * @memberof ShiftsService
   */

  createDate(date: string, timeFrom: string, timeTo: string) {
    if ((timeFrom.substring(0, 2) > timeTo.substring(0, 2)) ||
      (timeFrom.substring(0, 2) === timeTo.substring(0, 2) && timeFrom.substring(3, 5) > timeTo.substring(3, 5))) {

      return [
        moment(new Date(date)).format('YYYY-MM-DD') + 'T' + timeFrom + ':00.000Z',
        moment(new Date(date)).add(1, 'days').format('YYYY-MM-DD') + 'T' + timeTo + ':00.000Z'
      ];
    } else {

      return [
        moment(new Date(date)).format('YYYY-MM-DD') + 'T' + timeFrom + ':00.000Z',
        moment(new Date(date)).format('YYYY-MM-DD') + 'T' + timeTo + ':00.000Z'
      ];
    }
  }

}
