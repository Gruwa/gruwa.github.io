import {
  Injectable,
  OnDestroy
} from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import {HttpGuardService} from './http-guard.service';
import {Subject} from 'rxjs';
import {
  map,
  publishReplay,
  refCount,
  takeUntil
} from 'rxjs/operators';
import {FlowService} from './flow.service';
import {ITabTypesShifts} from '../interfaces/types.interface';
import {DataService} from './data.service';
import {HttpGuardRequestService} from './http-guard-request.service';
import {ActivatedRoute} from '@angular/router';

/**
 * Http Service
 */

@Injectable({
  providedIn: 'root'
})
export class HttpService implements OnDestroy {

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
   * Variable of ngUnsubscribe
   * @type {Subject<void>}
   * @memberof DetailsShiftsComponent
   */

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  /**
   * Creates an instance of HttpService
   * @param {HttpClient} http
   * @param {HttpGuardService} httpGuardService
   * @param {HttpGuardRequestService} httpGuardRequestService
   * @param {FlowService} flowService
   * @param {DataService} dataService
   * @memberof HttpService
   */

  constructor(private http: HttpClient,
              private httpGuardService: HttpGuardService,
              private httpGuardRequestService: HttpGuardRequestService,
              private flowService: FlowService,
              private dataService: DataService,
              private route: ActivatedRoute) {

    this.flowService.dataHttpRequest$.pipe(
      takeUntil(this.ngUnsubscribe),
      map((data) => {
        return this.dataHttpRequestGuard(data);
      })
    ).subscribe(this.dataHttpRequest.bind(this));
  }

  /**
   * Method ngOnDestroy
   * @returns {void}
   * @memberof DetailsShiftsComponent
   */

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  /**
   * Method for get shifts
   * @param {ITabTypesShifts} tab
   * @memberof HttpService
   */

  getShifts(tab: ITabTypesShifts = 'upcoming') {

    if (this.dataService.TABS[tab]) {
      this.flowService[`${this.dataService.FLOW[tab]}`] = this.getShiftsRequest(tab).pipe(
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
    console.log('!!!!!getShifts htttpService!!!!!');
  }

  /**
   * Method for get request with shifts
   * @param {ITabTypesShifts} tab
   * @memberof HttpService
   */

  getShiftsRequest(tab: ITabTypesShifts = 'upcoming') {
    return this.http.get(this.dataService.BASEURL + '/shifts/' + this.dataService.TABS[tab]);
  }

  /**
   * Method for delete shifts
   * @param {string} id
   * @memberof HttpService
   */

  deleteShifts(id: string): any {
    console.log('!!!!!patch upcoming Shifts htttpService!!!!!');
    return this.http.delete(this.dataService.BASEURL + '/shifts/delete/' + id).pipe(
      map(
        (resp) => {
          console.log('httpService DELETEShifts', resp); // TODO - Delete when ready
          return resp;
        }
      )
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
    return this.patchShiftsRequest(id, body).pipe(
      map(
        (resp) => {
          console.log('httpService patchShifts', resp); // TODO - Delete when ready
          return this.httpGuardService.guardReFreshShift(resp);
        }
      )
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


  dataHttpRequestGuard(data: any) {
    if (data.patchMarkState) {
      data.patchMarkState.data = this.httpGuardRequestService.guardMarkState(data.patchMarkState.data);
      return data;
    }
  }

  dataHttpRequest(data: any) {
    if (data.patchMarkState) {
      this.patchMarkStateRequest(data.patchMarkState.id, data.patchMarkState.data).pipe(
        map(
          (resp) => {
            console.log('httpService patchMarkState', resp); // TODO - Delete when ready
            return this.httpGuardService.guardMarkState(resp);
          }
        )
      ).subscribe((resp) => {
        this.flowService.dataHttpResponse$.next({

        });
      });
    }
  }

  /**
   * Method for patch shifts
   * @param {string} id
   * @param {object} body
   * @memberof HttpService
   */

  patchMarkState(id: string, body: object): any {
    console.log('!!!!!patch MarkState Shifts htttpService!!!!!');
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
   * @memberof HttpService
   */

  patchMarkStateRequest(id: string, body: object) {
    return this.http.patch(this.dataService.BASEURL + '/markstate/' + id, body);
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
