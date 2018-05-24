import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HttpGuardService} from './http-guard.service';
import 'rxjs/add/operator/publishReplay';
import {FlowService} from './flow.service';
import {ITabTypes} from '../interfaces/types.interface';
import {DataService} from './data.service';

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
   * @param {FlowService} flowService,
   * @param {DataService} dataService
   * @memberof HttpService
   */

  constructor(private http: HttpClient,
              private httpGuardService: HttpGuardService,
              private flowService: FlowService,
              private dataService: DataService) {
  }

  /**
   * Method for get shifts
   * @param {ITabTypes} tab
   * @memberof HttpService
   */

  getShifts(tab: ITabTypes = 'upcoming') {

    if (this.dataService.TABS[tab]) {
      this.flowService[`${this.dataService.FLOW[tab]}`] = this.getShiftsRequest(tab).map(
        (resp) => {
          console.log('httpService getShifts', resp); // TODO - Delete when ready
          return this.httpGuardService.guardShifts(resp);
        }
      ).publishReplay(1).refCount();
    }
    console.log('!!!!!getShifts htttpService!!!!!');
  }

  /**
   * Method for get request with shifts
   * @param {ITabTypes} tab
   * @memberof HttpService
   */

  getShiftsRequest(tab: ITabTypes = 'upcoming') {
    return this.http.get(this.dataService.BASEURL + '/shifts/' + this.dataService.TABS[tab]);
  }

  /**
   * Method for delete shifts
   * @param {string} id
   * @memberof HttpService
   */

  deleteShifts(id: string): any {
    console.log('!!!!!patch upcoming Shifts htttpService!!!!!');
    return this.http.delete(this.dataService.BASEURL + '/shifts/delete/' + id).map(
      (resp) => {
        console.log('httpService DELETEShifts', resp); // TODO - Delete when ready
        return resp;
      }
    );
  }

  /**
   * Method for patch shifts
   * @param {string} id
   * @param {object} body
   * @memberof HttpService
   */

  patchShifts(id: string, body: object): any {
    console.log('!!!!!patch upcoming Shifts htttpService!!!!!');
    return this.patchShiftsRequest(id, body).map(
      (resp) => {
        console.log('httpService patchShifts', resp); // TODO - Delete when ready
        return this.httpGuardService.guardReFreshShift(resp);
      }
    );
  }

  /**
   * Method for patch request with editing shift
   * @param {string} id
   * @param {object} body
   * @memberof HttpService
   */

  patchShiftsRequest(id: string, body: object) {
    return this.http.patch(this.dataService.BASEURL + '/shifts/' + id, body);
  }


  /**
   * Method add all object to db
   * @memberof HttpService
   */

  addAllObject() {
    // TODO - delete for real api request
    console.log('!!!!!htttp addAllObject!!!!!');
    return this.http.get(this.dataService.BASEURL + '');
  }

}
