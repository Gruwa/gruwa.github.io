import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/retryWhen';
import {Subject} from 'rxjs/Subject';
import {LocalStorageService} from 'ngx-webstorage';
import {ToastsManager} from 'ng2-toastr';
import {Router} from '@angular/router';
import {IAuthService} from '../interfaces/auth.service.interface';

/**
 * AUTHURL for auth api
 */

const AUTHURL = `${environment.apiRoot}/admins`;

/**
 * Injectable for LocalStorageService
 */

@Injectable()
export class AuthService implements IAuthService {

  /**
   * Variable for check stateLogin
   * @type {Subject<any>}
   * @memberof AuthService
   */

  public stateLogin$ = new Subject<any>();

  /**
   * Variable for check active link
   * @type {string}
   * @memberof AuthService
   */

  public activeLink: string;

  /**
   * Variable for check email
   * @type {string}
   * @memberof AuthService
   */

  public checkEmail: string;

  /**
   * Creates an instance of AuthService.
   * @param {Router} router
   * @param {LocalStorageService} storage
   * @param {HttpClient} http
   * @param {ToastsManager} toast
   * @memberof AuthService
   */

  constructor(
    public http: HttpClient,
    public storage: LocalStorageService,
    private toast: ToastsManager,
    public router: Router
  ) { }

  /**
   * Method for registration admins
   * @param {object} admin - data of admin
   * @returns {Observable<object>}
   * @memberof AuthService
   */

  onRegistration(admin: object): Observable<object> {

    return this.http.post(AUTHURL, admin).catch(
      (error) => {
        this.toast.error('Registration failed');
        return Observable.throw(error);
      }
    );
  }

  /**
   * Method for login admins
   * @param {object} body - data of admin
   * @returns {Observable<object>}
   * @memberof AuthService
   */

  onLoginUser(body: object): Observable<object> {

    return this.http.post(AUTHURL + '/signin', body, )
      .map(
        (response) => {
          this.storage.store('token', response['token']);
          this.storage.store('activeUser', response['userId']);
          this.storage.store('activeUserName', response['admin'].first_name);
          return response;
        })
      .catch(
        (error) => {
          this.toast.error('Login failed');
          return Observable.throw(error);
        }
      );
  }

  /**
   * Method for log out from system
   * @memberof AuthService
   */

  onLogOut(): void {
    this.storage.clear('token');
    this.storage.clear('activeuser');
    this.storage.clear('activeUserName');
    this.router.navigate(['/main']);
  }

  /**
   * Method for create password for admins
   * @param {object} body - data of admin
   * @returns {Observable<object>}
   * @memberof AuthService
   */

  resetPasswordConfirm(body: object): Observable<object> {
    return this.http.post(AUTHURL + '/password', body)
      .map(
        (response) => {
          return response;
        }
      )
      .catch(
        (error) => {
          this.toast.error('Save Password failed');
          return Observable.throw(false);
        }
      );
  }

  /**
   * Method for get new password for admins
   * @param {object} body - data of admin
   * @returns {Observable<object>}
   * @memberof AuthService
   */

  forgotPassword(body: object): Observable<object> {
    return this.http.patch(AUTHURL + '/password/reset', body)
      .map(
        (response) => {
          return response;
        }
      )
      .catch(
        (error) => {
          this.toast.error('User not found');
          return Observable.throw(false);
        }
      );
  }

  /**
   * Method for check valid token
   * @returns {Observable<object>}
   * @memberof AuthService
   */

  validToken(): Observable<object> {
    const body: object = {
      token: this.storage.retrieve('token'),
      activeUser: this.storage.retrieve('activeUser')
    };
    return this.http.post(AUTHURL, body)
      .catch(
        (error) => {
          this.toast.error('Login failed');
          return Observable.throw(error);
        }
      );
  }

}
