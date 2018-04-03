import {Injectable} from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import {Subject} from 'rxjs/Subject';
import {Router} from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage';
import {
  IShift,
  IShiftsSorted
} from '../../shared/interfaces/shift.interface';
import {HttpService} from '../../shared/services/http.service';
import {FakeService} from '../../shared/services/fake.service';


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
   * @memberof ShiftsService
   */

  constructor(public router: Router,
              public httpService: HttpService,
              public fakeService: FakeService,
              public localStorage: LocalStorageService) {
  }

  /**
   * Method for creating and sorting array of shifts
   * @param {Array<Types.IShift>} value - raw array of shifts
   * @returns {Array<Types.IShiftsSorted>}
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
       * Variable of month
       * @type {Array<string>}
       * @memberof ShiftsService
       */

      const month: Array<string> =
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

      const day: Array<string> =
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
       * Variable of date
       * @type {any}
       * @memberof ShiftsService
       */

      const date: any = new Date(dateStr);

      return day[date.getDay()] + ',' + ' ' + month[date.getMonth()] + ' ' + date.getDate();
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

    return result.sort(this.sortFunction);
  }

  /**
   * Method of sorting
   * @param {Types.IShiftsSorted} a - sorted shift
   * @param {Types.IShiftsSorted} b - sorted shift
   * @returns {number}
   * @memberof ShiftsService
   */

  sortFunction(a: IShiftsSorted, b: IShiftsSorted): number {
    const dateA = new Date(a.dateFrom).getTime();
    const dateB = new Date(b.dateFrom).getTime();

    return dateA > dateB ? 1 : -1;
  }

  /**
   * Method for getting the informaton of shift on id
   * @param {string} id - id shift
   * @returns {Types.IShift | boolean}
   * @memberof ShiftsService
   */

  getshiftById(id: string): IShift {
    if (this.shifts) {

      return this.shifts.find(item => item.id === id);
    } else {

      // console.log('dsdsd')
      // let k;
      // console.log(this.localStorage.retrieve('tab'))
      // k = this.getShiftsFromApi(this.localStorage.retrieve('tab'));
      //
      // console.log('k', k)
      // return k.find(item => item.ID === id);
    }
  }


  // getShiftsFromApi(tab) {
  //
  //    this.httpService.getShifts(tab).subscribe(
  //         (value: any) => {
  //
  //             console.log('next', value);
  //             let  l = [];
  //                 for (const i in value) {
  //                 l.push(value[i]);
  //             }
  //             return l;
  //             // this.shifts.sortShifts(value);
  //         },
  //         (error) => {
  //             // console.log(this.shiftsDataFAke);
  //             console.log('value');
  //             let  l = [];
  //                 for (const i in this.fakeService.shiftsDataFake) {
  //                 l.push(this.fakeService.shiftsDataFake[i]);
  //             }
  //             return l;
  //         }
  //     );
  // }
}
