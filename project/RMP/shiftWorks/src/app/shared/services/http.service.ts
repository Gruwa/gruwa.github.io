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
import {DataService} from './data.service';

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


  // /**
  //  * Created flow of tabs
  //  * @memberof ShiftsService
  //  */
  //
  // public dataOfShifts$: Observable<object>;

  // /**
  //  * Created flow of login
  //  * @memberof ShiftsService
  //  */
  //
  // public dataOfLogin$: Observable<object>;

  public dataOfShiftsFAke$;

  /**
   * Creates an instance of HttpService
   * @param {HttpClient} http
   * @param {GuardService} guardService
   * @memberof HttpService
   */


  constructor(public http: HttpClient,
              public guardService: GuardService,
              public fakeService: FakeService,
              public dataService: DataService) {
  }

  /**
   * Method for get shifts
   * @returns {Observable<object>}
   * @memberof HttpService
   */

  onLogin(body: object) {
    this.dataService.dataLogin$ = this.http.post(BASEURL + '/login', body).map(
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

  getShifts() {

    // TODO - activate for real api request
    //     this.dataService.dataShifts$ = this.http.get(BASEURL + '/shifts').map(
    //         (resp) => {
    //             return this.guardService.guardShifts(resp['items']);
    //         }
    //     ).publishReplay(1).refCount();
    this.dataService.dataShifts$ = Observable.from(this.fakeService.dataResp['items']);
    console.log('!!!!!getShifts htttpService!!!!!');

  }

  addAllObject() {
    // TODO - delete for real api request
    console.log('!!!!!htttp addAllObject!!!!!');
        return this.http.get(BASEURL + '');
  }

}
