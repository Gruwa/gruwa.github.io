import {
  Injectable
} from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import {HttpGuardService} from './http-guard.service';
import {
  map,
  publishReplay,
  refCount
} from 'rxjs/operators';
import {FlowService} from './flow.service';
import {ITabTypesShifts} from '../interfaces/types.interface';
import {DataService} from './data.service';
import {HttpGuardRequestService} from './http-guard-request.service';
import {LocalStorageService} from 'ngx-webstorage';
import {Observable} from 'rxjs';

/**
 * Http Service
 */

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  /**
   * Variable of tab
   * @type {ITabTypesShifts}
   * @memberof HttpService
   */

  public tab: ITabTypesShifts;

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
   * @param {HttpGuardRequestService} httpGuardRequestService
   * @param {FlowService} flowService
   * @param {DataService} dataService
   * @param {LocalStorageService} localStorage
   * @memberof HttpService
   */

  constructor(private http: HttpClient,
              private httpGuardService: HttpGuardService,
              private httpGuardRequestService: HttpGuardRequestService,
              private flowService: FlowService,
              private dataService: DataService,
              private localStorage: LocalStorageService) {
  }

  /**
   * Method for get shifts
   * @param {ITabTypesShifts} tab
   * @returns {void}
   * @memberof HttpService
   */

  public getShifts(tab: ITabTypesShifts = 'upcoming'): void {
    if (this.dataService.TABS[tab]) {
      this.flowService[`${this.dataService.FLOW[tab]}`] = this.getShiftsRequest(tab, this.localStorage.retrieve('group').id).pipe(
        map(
          (resp) => {
            console.log('httpService getShifts', resp); // TODO - Delete when ready
            return this.httpGuardService.guardShifts(resp);
          }
        ),
        publishReplay(1),
        refCount()
      );
    }
  }

  /**
   * Method for get request with shifts
   * @param {ITabTypesShifts} tab
   * @param {string} group
   * @returns {Observable<object>}
   * @memberof HttpService
   */

  private getShiftsRequest(tab: ITabTypesShifts = 'upcoming', group: string): Observable<object> {
    return this.http.get(this.dataService.BASEURL + '/shifts/' + this.dataService.TABS[tab]);
  }

  /**
   * Method for patch guard shifts
   * @param {string} id
   * @param {object} body
   * @returns {Array<any>}
   * @memberof HttpService
   */

  public patchMarkState(id: string, body: object): Observable<any> {
    return this.patchMarkStateRequest(id, this.httpGuardRequestService.guardMarkState(body)).pipe(
      map(
        (resp) => {
          console.log('httpService patchMarkState', resp); // TODO - Delete when ready
          return this.httpGuardService.guardMarkState(resp);
        }
      )
    );
  }

  /**
   * Method for patch request with editing shift
   * @param {string} id
   * @param {object} body
   * @returns {Observable<object>}
   * @memberof HttpService
   */

  private patchMarkStateRequest(id: string, body: object): Observable<object> {
    return this.http.patch(this.dataService.BASEURL + '/shifts/' + id + '/markstate', body);
  }

  /**
   * Method for get guard restaurants
   * @returns {void}
   * @memberof HttpService
   */

  public getRestaurants(): void {
    this.flowService.dataRestaurants$ = this.getRestaurantsRequest().pipe(
      map(
        (resp) => {
          console.log('httpService getRestaurants', resp); // TODO - Delete when ready
          return this.httpGuardService.guardRestaurants(resp);
        }
      ),
      publishReplay(1),
      refCount()
    );
  }

  /**
   * Method for get restaurants
   * @returns {Observable<object>}
   * @memberof HttpService
   */

  private getRestaurantsRequest(): Observable<object> {
    return this.http.get(this.dataService.BASEURL + '/restaurants');
  }

  /**
   * Method for get guard settings
   * @returns {void}
   * @memberof HttpService
   */

  public getSettings(): void {
    this.flowService.dataSettings$ = this.getSettingsRequest().pipe(
      map(
        (resp) => {
          console.log('getSettings getRestaurants', resp); // TODO - Delete when ready

          return this.httpGuardService.guardSettings(resp);
        }
      ),
      publishReplay(1),
      refCount()
    );
  }

  /**
   * Method for get settings
   * @returns {Observable<object>}
   * @memberof HttpService
   */

  private getSettingsRequest(): Observable<object> {
    return this.http.get(this.dataService.BASEURL + '/settings', {
      headers: new HttpHeaders().set('groupID', this.localStorage.retrieve('group').id)
  });
  }

  /**
   * Method for patch guard settings
   * @param {string} id
   * @param {object} body
   * @returns {Array<any>}
   * @memberof HttpService
   */

  public patchSettings(body: boolean): Observable<any> {
    return this.patchSettingsRequest(this.httpGuardRequestService.guardSettings(body)).pipe(
      map(
        (resp) => {
          console.log('httpService patchMarkState', resp); // TODO - Delete when ready
          return this.httpGuardService.guardSettings(resp);
        }
      )
    );
  }

  /**
   * Method for patch request settings
   * @param {string} id
   * @param {object} body
   * @returns {Observable<object>}
   * @memberof HttpService
   */

  private patchSettingsRequest(body: object): Observable<object> {
    return this.http.patch(this.dataService.BASEURL + '/settings', body, {
      headers: new HttpHeaders().set('groupID', this.localStorage.retrieve('group').id)
    });
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
