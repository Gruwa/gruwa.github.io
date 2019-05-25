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
  refCount,
  shareReplay,
  switchMap
} from 'rxjs/operators';
import {FlowService} from './flow.service';
import {
  ITabTypesAvailability,
  ITabTypesShifts
} from '../interfaces/types.interface';
import {DataService} from './data.service';
import {HttpGuardRequestService} from './http-guard-request.service';
import {LocalStorageService} from 'ngx-webstorage';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

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
   * Variable of settings
   * @type {string}
   * @memberof HttpService
   */

  public settings: string = '';

  /**
   * Variable of availability
   * @type {string}
   * @memberof HttpService
   */

  public availability: string = '';

  /**
   * Variable of contactInfo
   * @type {string}
   * @memberof HttpService
   */

  public contactInfo: string = '';

  /**
   * Creates an instance of HttpService
   * @param {HttpClient} http
   * @param {HttpGuardService} httpGuardService
   * @param {HttpGuardRequestService} httpGuardRequestService
   * @param {FlowService} flowService
   * @param {DataService} dataService
   * @param {LocalStorageService} localStorage
   * @param {Router} router
   * @memberof HttpService
   */

  constructor(private http: HttpClient,
              private flowService: FlowService,
              private httpGuardService: HttpGuardService,
              private httpGuardRequestService: HttpGuardRequestService,
              private dataService: DataService,
              private localStorage: LocalStorageService,
              private router: Router) {
  }

  /**
   * Method for get shifts
   * @param {object} body
   * @returns {Observable<object>}
   * @memberof AuthService
   */

  public onLoginRequest(body: object): Observable<object> {
    return this.http.post(this.dataService.BASEURL + '/login', body);
  }

  /**
   * Method for get shifts
   * @param {ITabTypesShifts} tab
   * @returns {void}
   * @memberof HttpService
   */

  public getShifts(tab: ITabTypesShifts = 'upcoming'): void {
    if (this.dataService.TABS[tab]) {
      if (this.localStorage.retrieve(this.dataService.LOCAL_STORAGE['group'])) {
        this.flowService[`${this.dataService.FLOW[tab]}`] = this.getShiftsRequest(tab,
          this.localStorage.retrieve(this.dataService.LOCAL_STORAGE['group']).id).pipe(
          map(
            (resp) => {
              return this.httpGuardService.guardShifts(resp);
            }
          ),
          publishReplay(1),
          refCount()
        );
        this.flowService.dataCleanFlow$.next({
          description: `${this.dataService.FLOW[tab]}`
        });
      } else {
        this.router.navigate(['/login']);
      }
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
    // this.flowService.dataRestaurants$ = this.getRestaurantsRequest().pipe(
    //   map(
    //     (resp) => {
    //       return this.httpGuardService.guardRestaurants(resp);
    //     }
    //   ),
    //   publishReplay(1),
    //   refCount()
    // );
    // this.flowService.dataCleanFlow$.next({
    //   description: `${this.dataService.LIST_FLOWS['dataRestaurants$']}`
    // });
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
    this.flowService.dataSettingsSwitch$.pipe(
      switchMap((value) => {
        if (value === '') {
          if (this.localStorage.retrieve(this.dataService.LOCAL_STORAGE['group'])) {
            return this.getSettingsRequest().pipe(
              shareReplay()
            );
          } else {
            this.router.navigate(['/login']);
            return new Observable();
          }
        } else {
          return new Observable();
        }
      })).subscribe((resp) => {
      this.flowService.dataSettings$.next(this.httpGuardService.guardSettings(resp));
      this.flowService.dataCleanFlow$.next({
        description: `${this.dataService.LIST_FLOWS['dataSettings$']}`
      });
      this.settings = this.localStorage.retrieve('group').activeId;
    });
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
   * Method for put guard settings
   * @param {object} body
   * @returns {Array<any>}
   * @memberof HttpService
   */

  public putSettings(body: boolean): Observable<any> {
    return this.putSettingsRequest(this.httpGuardRequestService.guardSettings(body)).pipe(
      map(
        (resp) => {
          return this.httpGuardService.guardSettings(resp);
        }
      )
    );
  }

  /**
   * Method for put request settings
   * @param {object} body
   * @returns {Observable<object>}
   * @memberof HttpService
   */

  private putSettingsRequest(body: object): Observable<object> {
    return this.http.put(this.dataService.BASEURL + '/settings', body);
  }

  /**
   * Method for get guard contact info
   * @returns {void}
   * @memberof HttpService
   */

  public getContactInfo(): void {
    this.flowService.dataContactInfoSwitch$.pipe(
      switchMap((value) => {
        if (value === '') {
          if (this.localStorage.retrieve(this.dataService.LOCAL_STORAGE['group'])) {
            return this.getContactInfoRequest().pipe(
              shareReplay()
            );
          } else {
            this.router.navigate(['/login']);
            return new Observable();
          }
        } else {
          return new Observable();
        }
      })).subscribe((resp) => {
      this.flowService.dataContactInfo$.next(this.httpGuardService.guardContactInfo(resp));
      this.flowService.dataCleanFlow$.next({
        description: `${this.dataService.LIST_FLOWS['dataContactInfo$']}`
      });
      this.contactInfo = this.localStorage.retrieve('group').activeId;
    });
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
   * @param {any} oldData
   * @returns {Observable<any>}
   * @memberof HttpService
   */

  public patchContactInfo(body: object, oldData: any): Observable<any> {
    return this.patchContactInfoRequest(this.httpGuardRequestService.guardContactInfo(body, oldData)).pipe(
      map(
        (resp) => {
          return this.httpGuardService.guardContactInfo(resp);
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
   * Method for get shifts
   * @returns {void}
   * @memberof HttpService
   */

  public getAvailability(): void {
    for (const tab in this.dataService.FLOW_AVAILABILITY) {
      if (this.dataService.TABS_AVAILABILITY[tab]) {
        this.flowService.dataAvailabilitySwitch$.pipe(
          switchMap(value => {
            if (value === '') {
              if (this.localStorage.retrieve(this.dataService.LOCAL_STORAGE['group'])) {
                return this.getAvailabilityRequest(
                  <ITabTypesAvailability>tab,
                  this.localStorage.retrieve(this.dataService.LOCAL_STORAGE['group']).id
                ).pipe(
                  shareReplay()
                );
              } else {
                this.router.navigate(['/login']);
                return new Observable();
              }
            } else {
              return new Observable();
            }
          })).subscribe((resp) => {
          this.flowService[`${this.dataService.FLOW_AVAILABILITY[tab]}`].next(this.httpGuardService.guardAvailability(resp, tab));
          this.availability = this.localStorage.retrieve('group').activeId;
        });
      }
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
   * Method for delete availability
   * @param {string} id
   * @memberof HttpService
   */

  public deleteAvailability(id: string): Observable<any> {
    return this.deleteAvailabilityRequest(id).pipe(
      map(
        (resp) => {
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
      + this.dataService.TABS_AVAILABILITY[this.localStorage.retrieve(this.dataService.LOCAL_STORAGE['tabavailability'])] + 's/' + id);
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
          return this.httpGuardService.guardAvailability(
            resp,
            this.localStorage.retrieve(this.dataService.LOCAL_STORAGE['tabavailability']))
            [this.localStorage.retrieve(this.dataService.LOCAL_STORAGE['tabavailability'])][0];
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
      + this.dataService.TABS_AVAILABILITY[
        this.localStorage.retrieve(this.dataService.LOCAL_STORAGE['tabavailability'])] + 's/' + id, body);
  }

  /**
   * Method for post availability
   * @param {object} body
   * @returns {void}
   * @memberof HttpService
   */

  public postAvailability(body: object): Observable<object> {
    return this.postAvailabilityRequest(this.httpGuardRequestService.guardAvailability(body)).pipe(
      map(
        (resp) => {
          return this.httpGuardService.guardAvailability(
            resp,
            this.localStorage.retrieve(this.dataService.LOCAL_STORAGE['tabavailability']))
            [this.localStorage.retrieve(this.dataService.LOCAL_STORAGE['tabavailability'])][0];
        }
      )
    );
  }

  /**
   * Method for post availability request
   * @param {object} body
   * @returns {Observable<object>}
   * @memberof HttpService
   */

  public postAvailabilityRequest(body: object): Observable<object> {
    return this.http.post(this.dataService.BASEURL + '/availability/'
      + this.dataService.TABS_AVAILABILITY[this.localStorage.retrieve(this.dataService.LOCAL_STORAGE['tabavailability'])] + 's/', body);
  }
}
