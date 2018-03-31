import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import * as Types from '../interfaces/types.interface';
import {GuardService} from './guard.service';
import 'rxjs/add/operator/publishReplay';
import {Subject} from 'rxjs/Subject';
import {FakeService} from './fake.service';
import 'rxjs/add/observable/from';

/**
 * BASEURL of api
 */

const BASEURL = `${environment.apiRoot}`;

/**
 * TABS for api link
 */

const TABS = {
  upcoming: 'upcoming',
  'my requests': 'my requests',
  available: 'available'
};

@Injectable()
export class HttpService {

  /**
   * Variable of tab
   * @type {Types.ITabTypes}
   * @memberof HttpService
   */

  public tab: Types.ITabTypes = 'upcoming';


  /**
   * Created flow of tabs
   * @memberof ShiftsService
   */

  public dataOfShifts$: Observable<object>;

  /**
   * Created flow of login
   * @memberof ShiftsService
   */

  public dataOfLogin$: Observable<object>;

  public dataOfShiftsFAke$;

  /**
   * Creates an instance of HttpService
   * @param {HttpClient} http
   * @param {GuardService} guardService
   * @memberof HttpService
   */


  constructor(public http: HttpClient,
              public guardService: GuardService,
              public fakeService: FakeService) {
  }

  /**
   * Method for get shifts
   * @returns {Observable<object>}
   * @memberof HttpService
   */

  onLogin(body: object) {
    this.dataOfLogin$ = this.http.post(BASEURL + '/login', body).map(
      (resp) => {
        console.log(resp);
        return this.guardService.guardShifts(resp['items']);
      }
    ).publishReplay(1).refCount();
    console.log('!!!!!htttpService - GET LOGIN!!!!!');

  }

  /**
   * Method for get shifts
   * @param {Types.ITabTypes} tab
   * @returns {Observable<object>}
   * @memberof HttpService
   */

  getShifts(tab: Types.ITabTypes = 'upcoming') {
    // if (TABS[tab]) {
    // TODO - activate for real api request
    //     this.dataOfShifts$ = this.http.get(BASEURL + `/${TABS[tab]}/` + '/our/api/link').map(
    //         (resp) => {
    //             return this.guardService.guardShifts(resp['items']);
    //         }
    //     ).publishReplay(1).refCount();
    this.dataOfShifts$ = Observable.from(this.fakeService.dataResp['items']);
    console.log('!!!!!htttpService!!!!!');
    // }
  }

}
