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
import {ITabTypesAvailability, ITabTypesShifts} from '../interfaces/types.interface';
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
   * Method for get shifts
   * @param {ITabTypesShifts} tab
   * @returns {void}
   * @memberof HttpService
   */

  public getAvailability(tab: ITabTypesAvailability = 'time off'): void {
    if (this.dataService.TABS_AVAILABILITY[tab]) {
      this.flowService[`${this.dataService.FLOW_AVAILABILITY[tab]}`] =
        this.getAvailabilityRequest(tab, this.localStorage.retrieve('group').id).pipe(
          map(
            (resp) => {
              console.log('httpService getAvailability', resp); // TODO - Delete when ready
              return this.httpGuardService.guardAvailabilities(resp);
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

  private getAvailabilityRequest(tab: ITabTypesAvailability = 'time off', group: string): Observable<object> {
    return this.http.get(this.dataService.BASEURL + '/availability/' + this.dataService.TABS_AVAILABILITY[tab] + 's');
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
          console.log('getSettings getSettings', resp); // TODO - Delete when ready
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
    return this.http.get(this.dataService.BASEURL + '/settings');
  }

  /**
   * Method for patch guard settings
   * @param {object} body
   * @returns {Array<any>}
   * @memberof HttpService
   */

  public patchSettings(body: boolean): Observable<any> {
    return this.patchSettingsRequest(this.httpGuardRequestService.guardSettings(body)).pipe(
      map(
        (resp) => {
          console.log('httpService patchSettings', resp); // TODO - Delete when ready
          return this.httpGuardService.guardSettings(resp);
        }
      )
    );
  }

  /**
   * Method for patch request settings
   * @param {object} body
   * @returns {Observable<object>}
   * @memberof HttpService
   */

  private patchSettingsRequest(body: object): Observable<object> {
    return this.http.patch(this.dataService.BASEURL + '/settings', body);
  }

  /**
   * Method for get guard contact info
   * @returns {void}
   * @memberof HttpService
   */

  public getContactInfo(): void {
    this.flowService.dataContactInfo$ = this.getContactInfoRequest().pipe(
      map(
        (resp) => {
          console.log('getSettings getContactInfo', resp); // TODO - Delete when ready
          return this.httpGuardService.guardContactInfo(resp);
        }
      ),
      publishReplay(1),
      refCount()
    );
  }

  /**
   * Method for get contact info
   * @returns {Observable<object>}
   * @memberof HttpService
   */

  private getContactInfoRequest(): Observable<object> {
    return this.http.get(this.dataService.BASEURL + '/contactinfo');
  }

  /**
   * Method for patch contact info
   * @param {object} body
   * @returns {Observable<any>}
   * @memberof HttpService
   */

  public patchContactInfo(body: object): Observable<any> {
    return this.patchContactInfoRequest(this.httpGuardRequestService.guardContactInfo(body)).pipe(
      map(
        (resp) => {
          console.log('httpService patchContactInfo', resp); // TODO - Delete when ready
          return this.httpGuardService.guardSettings(resp);
        }
      )
    );
  }

  /**
   * Method for patch contact info
   * @param {object} body
   * @returns {Observable<object>}
   * @memberof HttpService
   */

  private patchContactInfoRequest(body: object): Observable<object> {
    return this.http.patch(this.dataService.BASEURL + '/contactinfo', body);
  }

  /**
   * Method for delete availability
   * @param {string} id
   * @memberof HttpService
   */

  public deleteAvailability(id: string): Observable<any> {
    return this.deleteAvailabilityRequest(id).pipe(
      map(
        (resp) => {
          console.log('httpService deleteAvailability', resp);
          return resp;
        }
      )
    );
  }

  /**
   * Method for delete availability request
   * @param {string} id
   * @returns {Observable<object>}
   * @memberof HttpService
   */

  private deleteAvailabilityRequest(id: string): Observable<object> {
    return this.http.delete(this.dataService.BASEURL + '/availability/'
      + this.dataService.TABS_AVAILABILITY[this.localStorage.retrieve('tabavailability')] + 's/' + id);
  }

  /**
   * Method for patch availability
   * @param {object} body
   * @param {string} id
   * @returns {Observable<any>}
   * @memberof HttpService
   */

  public patchAvailability(body: object, id: string): Observable<any> {
    return this.patchAvailabilityRequest(this.httpGuardRequestService.guardAvailability(body), id).pipe(
      map(
        (resp) => {
          console.log('httpService patchContactInfo', resp); // TODO - Delete when ready
          return this.httpGuardService.guardAvailability(resp);
        }
      )
    );
  }

  /**
   * Method for patch availability request
   * @param {object} body
   * @param {string} id
   * @returns {Observable<object>}
   * @memberof HttpService
   */

  private patchAvailabilityRequest(body: object, id: string): Observable<object> {
    return this.http.patch(this.dataService.BASEURL + '/availability/'
      + this.dataService.TABS_AVAILABILITY[this.localStorage.retrieve('tabavailability')] + 's/' + id, body);
  }
}
