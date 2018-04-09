import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {HttpGuardService} from './http-guard.service';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/observable/from';
import {DataService} from './data.service';
import {ActivatedRoute} from '@angular/router';
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

/**
 * Http Service
 */

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
   * @param {HttpGuardService} httpGuardService
   * @param {DataService} dataService
   * @param {ActivatedRoute} route
   * @memberof HttpService
   */


  constructor(public http: HttpClient,
              public httpGuardService: HttpGuardService,
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

  /**
   * Method add all object to db
   * @memberof HttpService
   */

  addAllObject() {
    // TODO - delete for real api request
    console.log('!!!!!htttp addAllObject!!!!!');
    // return this.http.get(BASEURL + '');
  }

}
