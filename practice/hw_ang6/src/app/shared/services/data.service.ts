import {Injectable} from '@angular/core';
import {Subject, Observable} from 'rxjs';

/**
 * Data Service
 */

@Injectable()
export class DataService {

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
   * Created flow of data small spinner
   * @type {Subject<any>}
   * @memberof DataService
   */

  public dataSmallSpinner$ = new Subject<any>();

  /**
   * Created flow of show spinner
   * @type {Subject<any>}
   * @memberof DataService
   */

  public dataSpinner$ = new Subject<any>();

  /**
   * Created flow of active shift
   * @type {Subject<any>}
   * @memberof DataService
   */

  public dataActiveShift$: Observable<object>;

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

}
