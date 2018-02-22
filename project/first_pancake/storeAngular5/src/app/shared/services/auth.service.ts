import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
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

const AUTHURL = `${environment.apiRoot}/admins`;

@Injectable()
export class AuthService {

  public stateLogin$ = new Subject<any>();

  public headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  public activeLink: string;
  public checkEmail: string;

  constructor(public http: HttpClient,
              public localStorageService: LocalStorageService,
              private toast: ToastsManager,
              public router: Router) {
  }

  /**
   * Method for get headers
   */

  getHeaders() {

    let headers = {
      'Content-Type': 'application/json'
    };

    return headers;
  }

  /**
   * Method for registration admins
   */

  onRegistration(admin: any) {

    return this.http.post(AUTHURL, admin, {headers: this.getHeaders()}).catch(
      (error) => {
        this.toast.error('Registration failed');
        return Observable.throw(error);
      }
    );
  }

  /**
   * Method for login admins
   */

  onLoginUser(body: any) {

    return this.http.post(AUTHURL + '/signin', body, {headers: this.getHeaders()})
      .map(
        (response) => {
          this.localStorageService.store('token', response['token']);
          this.localStorageService.store('activeUser', response['userId']);
          this.localStorageService.store('activeUserName', response['admin'].first_name);
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
   */

  onLogOut() {
    this.localStorageService.clear('token');
    this.localStorageService.clear('activeuser');
    this.localStorageService.clear('activeUserName');
    this.router.navigate(['/main']);
  }

  /**
   * Method for create password for admins
   */

  resetPasswordConfirm(body: any) {
    console.log(body);
    return this.http.post(AUTHURL + '/password', body, {headers: this.getHeaders()})
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
   */

  forgotPassword(body: any) {
    return this.http.patch(AUTHURL + '/password/reset', body, {headers: this.getHeaders()})
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
   */

  validToken() {
    const body = {
      token: this.localStorageService.retrieve('token'),
      activeUser: this.localStorageService.retrieve('activeUser')
    };
    return this.http.post(AUTHURL, body, {headers: this.getHeaders()})
      .catch(
        (error) => {
          this.toast.error('Login failed');
          return Observable.throw(error);
        }
      );
  }

}
