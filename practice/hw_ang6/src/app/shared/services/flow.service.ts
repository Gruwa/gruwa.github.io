import {Injectable} from '@angular/core';
import {
  Subject,
  Observable
} from 'rxjs';

/**
 * Data Service
 */

@Injectable({providedIn: 'root'})
export class FlowService {

  /**
   * Created flow of SideBar
   * @type {Subject<any>}
   * @memberof DataService
   */

  public dataSideBar$ = new Subject<any>();

  /**
   * Created flow of dataSideBarGroupRestaurants
   * @type {Subject<any>}
   * @memberof DataService
   */

  public dataSideBarGroupRestaurants$ = new Subject<any>();

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
   * Created flow of show restaurants spinner
   * @type {Subject<any>}
   * @memberof DataService
   */

  public dataSpinnerRestaurants$ = new Subject<any>();

  /**
   * Created flow of restaurants
   * @type {Observable<object>}
   * @memberof ShiftsService
   */

  public dataRestaurants$: Observable<object>;

  /**
   * Created flow of contact info
   * @type {Observable<object>}
   * @memberof ShiftsService
   */

  public dataContactInfo$: Observable<object>;

  /**
   * Created flow of ShiftsUpcoming$
   * @type {Observable<object>}
   * @memberof DataService
   */

  public dataShiftsUpcoming$: Observable<object>;

  /**
   * Created flow of dataShiftsAvailable$
   * @type {Observable<object>}
   * @memberof DataService
   */

  public dataShiftsAvailable$: Observable<object>;

  /**
   * Creates an instance of dataSettings$
   * @memberof DataService
   */

  public dataSettings$: Observable<object>;

  /**
   * Created flow of dataTimeOff$
   * @type {Observable<object>}
   * @memberof DataService
   */

  public dataTimeOff$: Observable<object>;

  /**
   * Created flow of dataVolunteer$
   * @type {Subject<any>}
   * @memberof DataService
   */

  public dataVolunteer$: Observable<object>;

}
