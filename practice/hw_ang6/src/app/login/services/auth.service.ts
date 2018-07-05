import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ITabTypesShifts} from '../../shared/interfaces/types.interface';
import {FlowService} from '../../shared/services/flow.service';
import {DataService} from '../../shared/services/data.service';
import {Observable} from 'rxjs';
import {HttpService} from '../../shared/services/http.service';
import {ToastrService} from 'ngx-toastr';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage';
import {HttpGuardRequestService} from '../../shared/services/http-guard-request.service';

/**
 * Auth Service
 */

@Injectable()
export class AuthService {

  /**
   * Variable of tab
   * @type {ITabTypesShifts}
   * @memberof AuthService
   */

  public tab: ITabTypesShifts = 'upcoming';

  /**
   * Creates an instance of HttpService
   * @param {HttpClient} http
   * @param {FlowService} flowService
   * @param {DataService} dataService
   * @param {ToastrService} toastr
   * @param {HttpService} httpService
   * @param {LocalStorageService} localStorage
   * @param {HttpGuardRequestService} httpGuardRequestService
   * @param {Router} router
   * @param {ActivatedRoute} activeRoute
   * @memberof AuthService
   */

  constructor(private http: HttpClient,
              private flowService: FlowService,
              private dataService: DataService,
              private toastr: ToastrService,
              private httpService: HttpService,
              private router: Router,
              private localStorage: LocalStorageService,
              private httpGuardRequestService: HttpGuardRequestService,
              private activeRoute: ActivatedRoute) {
  }

  /**
   * Method for put shifts in flow
   * @param {object} body
   * @param {string} redirecturl
   * @returns {void}
   * @memberof AuthService
   */

  public onLogin(body: object, redirecturl: string): void {
    this.onLoginRequest(this.httpGuardRequestService.guardlogin(body)).subscribe((resp) => {
      this.localStorage.store('user', body['login']);
      this.httpService.getRestaurants();
      this.flowService.dataSmallSpinner$.next(true);

      if (!redirecturl || redirecturl === '/login/schedule') {
        this.router.navigate(['/login/schedule']);
      } else {
        this.router.navigate([redirecturl]);
      }
    });
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
}
