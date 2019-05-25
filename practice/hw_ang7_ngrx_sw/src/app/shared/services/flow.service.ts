import {Injectable} from '@angular/core';
import {
  Subject,
  Observable,
  BehaviorSubject
} from 'rxjs';

/**
 * Data Service
 */

@Injectable({
  providedIn: 'root'
})
export class FlowService {


  /**
   * Variable buttonAuth of login component
   * @type {BehaviorSubject}
   * @memberof FlowService
   */

  public buttonAuth$ = new BehaviorSubject(false);

  /**
   * Created flow of dataAvailability$ of Availability component
   * @type {Observable<object>}
   * @memberof FlowService
   */

  public dataAvailability$ = new BehaviorSubject<object>(null);

  /**
   * Created flow of dataTimeOff$ of Availability component
   * @type {BehaviorSubject}
   * @memberof FlowService
   */

  public dataTimeOff$ = new BehaviorSubject<object>(null);

  /**
   * Created flow of dataVolunteer$ of Availability component
   * @type {BehaviorSubject}
   * @memberof FlowService
   */

  public dataVolunteer$ = new BehaviorSubject<object>(null);

  /**
   * Created flow of dataAvailabilitySwitch$ of Availability component
   * @type {BehaviorSubject}
   * @memberof FlowService
   */

  public dataAvailabilitySwitch$ = new BehaviorSubject(null);


  /**
   * Creates an instance of dataSettings$ of Settings component
   * @memberof FlowService
   */

  public dataSettings$ = new BehaviorSubject(null);

  /**
   * Created flow of dataSettingsSwitch$ of Availability component
   * @type {BehaviorSubject}
   * @memberof FlowService
   */

  public dataSettingsSwitch$ = new BehaviorSubject(null);

  /**
   * Created flow of contact info
   * @type {BehaviorSubject}
   * @memberof FlowService
   */

  public dataContactInfo$ = new BehaviorSubject(null);

  /**
   * Created flow of dataSettingsSwitch$ of Availability component
   * @type {BehaviorSubject}
   * @memberof FlowService
   */

  public dataContactInfoSwitch$ = new BehaviorSubject(null);

  /**
   * Variable activeItem$ of Side Bar component
   * @type {Array<IAvailability>}
   * @memberof FlowService
   */

  public activeItem$ = new BehaviorSubject(null);

  /**
   * Created flow for cleaning our flows
   * @type {Subject<any>}
   * @memberof FlowService
   */

  public dataCleanFlow$ = new Subject<any>();

  /**
   * Created flow of SideBar
   * @type {Subject<any>}
   * @memberof FlowService
   */

  public dataSideBar$ = new Subject<any>();

  /**
   * Created flow of dataSideBarGroupRestaurants
   * @type {Subject<any>}
   * @memberof FlowService
   */

  public dataSideBarGroupRestaurants$ = new Subject<any>();

  /**
   * Created flow of SideBarClose$
   * @type {Subject<any>}
   * @memberof FlowService
   */

  public dataSideBarClose$ = new Subject<any>();

  /**
   * Created flow of data small spinner
   * @type {Subject<any>}
   * @memberof FlowService
   */

  public dataSmallSpinner$ = new Subject<any>();

  /**
   * Created flow of show spinner
   * @type {Subject<any>}
   * @memberof FlowService
   */

  public dataSpinner$ = new Subject<any>();

  /**
   * Created flow of save time off
   * @type {Subject<any>}
   * @memberof FlowService
   */

  public dataEventTimeOff$ = new Subject<any>();

  /**
   * Created flow of show restaurants spinner
   * @type {Subject<any>}
   * @memberof FlowService
   */

  public dataSpinnerRestaurants$ = new Subject<any>();

  /**
   * Created flow of form data & actions
   * @type {Subject<any>}
   * @memberof FlowService
   */

  public dataForm$ = new Subject<any>();

  /**
   * Created flow of restaurants
   * @type {Observable<object>}
   * @memberof FlowService
   */

  public dataRestaurants$ = new BehaviorSubject(null);


  /**
   * Created flow of ShiftsUpcoming$
   * @type {Observable<object>}
   * @memberof FlowService
   */

  public dataShiftsUpcoming$: Observable<object>;

  /**
   * Created flow of dataShiftsAvailable$
   * @type {Observable<object>}
   * @memberof FlowService
   */

  public dataShiftsAvailable$: Observable<object>;

  /**
   * Created flow of login$
   * @type {BehaviorSubject<object>}
   * @memberof FlowService
   */

  public login$: BehaviorSubject<object> = new BehaviorSubject(null);

  /**
   * Created flow of groupRestaurants$
   * @type {BehaviorSubject<object>}
   * @memberof FlowService
   */

  public dataGroupRestaurants$: BehaviorSubject<object> = new BehaviorSubject(null);

  /**
   * Created flow of dataPopupActive$
   * @type {BehaviorSubject<boolean>}
   * @memberof FlowService
   */

  public dataPopupActive$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  /**
   * Created flow of dataPopupPassword$
   * @type {BehaviorSubject<string>}
   * @memberof FlowService
   */

  public dataPopupPassword$: BehaviorSubject<string> = new BehaviorSubject(null);
}
