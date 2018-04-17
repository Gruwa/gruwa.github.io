import {Injectable} from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import {Router} from '@angular/router';
import {
  IShift,
  IShiftsSorted
} from '../../shared/interfaces/shift.interface';
import {HttpService} from '../../shared/services/http.service';
import {DataService} from '../../shared/services/data.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import {LocalStorageService} from 'ngx-webstorage';

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
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];


/**
 * FLOW for api link
 */

const FLOW = {
  upcoming: 'dataShiftsUpcoming$',
  'my requests': 'dataShiftsMyReq$',
  available: 'dataShiftsAvailable$'
};

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
   * @param {DataService} dataService
   * @memberof ShiftsService
   */

  constructor(public router: Router,
              public httpService: HttpService,
              public dataService: DataService,
              public localService: LocalStorageService) {
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

    this.dataService.dataSpinner$.next(false);
    this.dataService.dataSmallSpinner$.next(false);
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

  // /**
  //  * Method for getting date for details shifts
  //  * @param {IShift} shift
  //  * @returns {Array<object>}
  //  * @memberof ShiftsService
  //  */
  //
  // getDate(shift: IShift): Array<object> {
  //
  //   let t = new Date(shift.dateFrom).getMonth();
  //   console.log('Date', t);
  //
  //   let date: Array<object>;
  //
  //   return date;
  // }

  // /**
  //  * Method for getting the information of shift on id
  //  * @param {string} id - id shift
  //  * @returns {IShift}
  //  * @memberof ShiftsService
  //  */
  //
  // getshiftById(id: string): IShift {
  //   let array = [];
  //
  //   this.dataService[FLOW[this.localService.retrieve('tab')]].subscribe((resp) => {
  //     console.log(this.localService.retrieve('tab'));
  //     console.log(resp);
  //     for (const key in resp) {
  //       if (key === 'items') {
  //         array = array.concat(resp[key]);
  //         console.log(array);
  //       }
  //     }
  //   });
  //         return array.find(item => item.shiftID === id);
  //
  //
  //   // if (array === []) {
  //   // console.log('else');
  //   // this.httpService.getShifts(this.localService.retrieve('tab'));
  //   // this.getshiftById(id);
  //   //
  //   // }
  //
  //
  //   // if (this.shifts) {
  //   //
  //   //   console.log(this.shifts.find(item => item.shiftID === id));
  //   //
  //   //
  //   // } else {
  //
  //   // }
  //
  // }
  //
  //
  // // getShiftsFromApi(tab) {
  // //
  // //    this.httpService.getShifts(tab).subscribe(
  // //         (value: any) => {
  // //
  // //             console.log('next', value);
  // //             let  l = [];
  // //                 for (const i in value) {
  // //                 l.push(value[i]);
  // //             }
  // //             return l;
  // //             // this.shifts.sortShifts(value);
  // //         },
  // //         (error) => {
  // //             // console.log(this.shiftsDataFAke);
  // //             console.log('value');
  // //             let  l = [];
  // //                 for (const i in this.fakeService.shiftsDataFake) {
  // //                 l.push(this.fakeService.shiftsDataFake[i]);
  // //             }
  // //             return l;
  // //         }
  // //     );
  // // }
}
