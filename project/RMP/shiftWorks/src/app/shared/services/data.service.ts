import {Injectable} from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import {Subject} from 'rxjs/Subject';
import {Router} from '@angular/router';
import {HttpService} from './http.service';
import {FakeService} from './fake.service';
import {LocalStorageService} from 'ngx-webstorage';
import {
  IShift,
  IShiftsSorted
} from '../interfaces/shift.interface';
import {Observable} from 'rxjs/Observable';

/**
 * Data Service
 */

@Injectable()
export class DataService {

  /**
   * Created flow of tabs
   * @type {Subject<any>}
   * @memberof DataService
   */

  public dataTab$ = new Subject<any>();

  /**
   * Created flow of SideBar
   * @type {Subject<any>}
   * @memberof DataService
   */

  public dataSideBar$ = new Subject<any>();

  /**
   * Created flow of save
   * @type {Subject<any>}
   * @memberof DataService
   */

  public dataSave$ = new Subject<any>();

  /**
   * Created flow of show spinner
   * @type {Subject<any>}
   * @memberof DataService
   */

  public dataSpinner$ = new Subject<any>();

  /**
   * Created flow of login
   * @type {Observable<object>}
   * @memberof ShiftsService
   */

  public dataLogin$: Observable<object>;

  /**
   * Created flow of ShiftsUpcoming$
   * @type {Observable<object>}
   * @memberof DataService
   */

  public dataShiftsUpcoming$: Observable<object>;

  /**
   * Created flow of dataShiftsMyReq$
   * @type {Observable<object>}
   * @memberof DataService
   */

  public dataShiftsMyReq$: Observable<object>;

  /**
   * Created flow of dataShiftsAvailable$
   * @type {Observable<object>}
   * @memberof DataService
   */

  public dataShiftsAvailable$: Observable<object>;

  /**
   * Creates an instance of dataGroupRestaurant$
   * @memberof DataService
   */


  public dataGroupRestaurant$: Observable<object>;

  /**
   * Creates an instance of DataService
   * @memberof DataService
   */

  constructor() {
  }

}
