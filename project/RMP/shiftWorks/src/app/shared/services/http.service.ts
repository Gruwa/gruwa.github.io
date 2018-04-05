import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {HttpGuardService} from './http-guard.service';
import 'rxjs/add/operator/publishReplay';
import {Subject} from 'rxjs/Subject';
import {FakeService} from './fake.service';
import 'rxjs/add/observable/from';
import {DataService} from './data.service';
import {ActivatedRoute} from '@angular/router';
import {IAnyObject} from '../interfaces/any-object.interface';
import {ITabTypes} from '../interfaces/types.interface';
import {LocalStorageService} from 'ngx-webstorage';

/**
 * BASEURL of api
 */

const BASEURL = `${environment.apiRoot}`;

/**
 * TABS for api link
 */

const TABS = {
  upcoming: 'upcoming',
  'my requests': 'myrequests',
  available: 'available'
};

/**
 * FLOW for api link
 */

const FLOW = {
  upcoming: 'dataShiftsUpcoming$',
  'my requests': 'dataShiftsMyReq$',
  available: 'dataShiftsAvailable$'
};

@Injectable()
export class HttpService {

  /**
   * Variable of tab
   * @type {ITabTypes}
   * @memberof HttpService
   */

  public tab: ITabTypes;

  /**
   * Variable of headers
   * @type {HttpHeaders}
   * @memberof HttpService
   */

  public headers: HttpHeaders = new HttpHeaders();

  /**
   * Creates an instance of HttpService
   * @param {HttpClient} http
   * @param {GuardService} guardService
   * @param {DataService} dataService
   * @param {ActivatedRoute} route
   * @memberof HttpService
   */


  constructor(public http: HttpClient,
              public httpGuardService: HttpGuardService,
              public fakeService: FakeService,
              public dataService: DataService,
              public route: ActivatedRoute,
              public localStorage: LocalStorageService) {
  }

  // /**
  //  * Method for get getGroupHeadersObject
  //  * @returns {IAnyObject}
  //  * @memberof HttpService
  //  */
  //
  // getGroupHeadersObject(): IAnyObject {
  //   const headersObject = {};
  //   const id = this.route.snapshot.children[0].children[0].params['id'];
  //   console.log(this.route.snapshot);
  //   if (id) {
  //     headersObject['id'] = id;
  //   }
  //
  //   return headersObject;
  // }

  /**
   * Method for get shifts
   * @param {ITabTypes} tab
   * @memberof HttpService
   */

  getShifts(tab: ITabTypes = 'upcoming') {

    if (TABS[tab]) {
      this.dataService[`${FLOW[tab]}`] = this.http.get(BASEURL + '/shifts/' + TABS[tab]).map(
        (resp) => {
          console.log('httpService getShifts', resp); // TODO - Delete when ready
          return this.httpGuardService.guardShifts(resp);
        }
      ).publishReplay(1).refCount();
    }
    console.log('!!!!!getShifts htttpService!!!!!');
  }

  /**
   * Method for patch shifts
   * @param {ITabTypes} tab
   * @memberof HttpService
   */

  patchShifts(tab: ITabTypes = 'upcoming') {

    if (TABS[tab]) {
      this.http.get(BASEURL + '/shifts/' + TABS[tab]).map(
        (resp) => {
          console.log('httpService getShifts', resp); // TODO - Delete when ready
          return this.httpGuardService.guardShifts(resp);
        }
      );
    }
    console.log('!!!!!getShifts htttpService!!!!!');
  }

  addAllObject() {
    // TODO - delete for real api request
    console.log('!!!!!htttp addAllObject!!!!!');
    // return this.http.get(BASEURL + '');
  }

}
