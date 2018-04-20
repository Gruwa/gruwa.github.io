import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/observable/from';
import {ITabTypes} from '../../shared/interfaces/types.interface';
import {AuthGuardService} from './auth.guard.service';
import {ILogin} from '../../shared/interfaces/login.interface';
import {DataService} from '../../shared/services/data.service';

/**
 * BASEURL of api
 */

const BASEURL = `${environment.apiRoot}`;

/**
 * Auth Service
 */

@Injectable()
export class AuthService {

  /**
   * Variable of tab
   * @type {ITabTypes}
   * @memberof AuthService
   */

  public tab: ITabTypes = 'upcoming';

  /**
   * Creates an instance of HttpService
   * @param {HttpClient} http
   * @param {AuthGuardService} authGuardService
   * @param {DataService} dataService
   * @memberof AuthService
   */

  constructor(public http: HttpClient,
              public authGuardService: AuthGuardService,
              public dataService: DataService) {
  }

  /**
   * Method for put shifts in flow
   * @param {object} body
   * @memberof AuthService
   */

  onLogin(body: object) {
    this.dataService.dataLogin$ = this.onLoginRequest(body).map(
      (resp: ILogin) => {
        console.log(resp); // TODO - DELETE when will be ready auth
        return this.authGuardService.guardLogin(resp['Items']);
      }
    ).publishReplay(1).refCount();
    console.log('!!!!!AuthService - GET LOGIN!!!!!'); // TODO - DELETE when will be ready auth
  }

  /**
   * Method for get shifts
   * @param {object} body
   * @memberof AuthService
   */

  onLoginRequest(body: object) {
    return this.http.post(BASEURL + '/login', body);
  }
}
