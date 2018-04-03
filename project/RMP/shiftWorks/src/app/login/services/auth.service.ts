import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/observable/from';
import {ITabTypes} from '../../shared/interfaces/types.interface';
import {AuthGuardService} from './auth.guard.service';
import {ILogin} from '../../shared/interfaces/login.interface';

/**
 * BASEURL of api
 */

const BASEURL = `${environment.apiRoot}`;

@Injectable()
export class AuthService {

  /**
   * Variable of tab
   * @type {ITabTypes}
   * @memberof AuthService
   */

  public tab: ITabTypes = 'upcoming';

  /**
   * Created flow of login
   * @memberof AuthService
   */

  public dataOfLogin$: Observable<object>;

  /**
   * Creates an instance of HttpService
   * @param {HttpClient} http
   * @param {AuthGuardService} authGuardService
   * @memberof AuthService
   */

  constructor(public http: HttpClient,
              public authGuardService: AuthGuardService) {
  }

  /**
   * Method for get shifts
   * @memberof AuthService
   */

  onLogin(body: object) {
    this.dataOfLogin$ = this.http.post(BASEURL + '/login', body).map(
      (resp: ILogin) => {
        console.log(resp);
        return this.authGuardService.guardLogin(resp['Items']);
      }
    ).publishReplay(1).refCount();
    console.log('!!!!!AuthService - GET LOGIN!!!!!'); //TODO - DELETE when will be ready auth
  }
}
