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

const AUTHURL = `${environment.apiRoot}/admin`;

@Injectable()
export class AuthService {

  public headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  public stateLogin$ = new Subject<any>();

  constructor(public http: HttpClient,
              public localStorageService: LocalStorageService,
              private toast: ToastsManager,
              public router: Router
  ) { }

  getHeaders() {

    let headers = {
      'Content-Type': 'application/json'
    };

    return headers;
  }

  onRegistration(admin: any) {

    return this.http.post(AUTHURL, admin, {headers: this.getHeaders()}).catch(
      (error) => {
        this.toast.error('Registration failed');
        return Observable.throw(error);
      }
    );
  }

  onLoginUser(body: any) {

    return this.http.post(AUTHURL + '/signin', body, {headers: this.getHeaders()})
      .map(
      (response) => {
        this.localStorageService.store('token', response['token']);
        this.localStorageService.store('activeUser', response['userId']);
        this.localStorageService.store('activeUserName', response['admin'].firstName)
        return response;
      })
      .catch(
        (error) => {
          this.toast.error('Login failed');
          return Observable.throw(error);
        }
      );
  }

  onLogOut() {
    this.localStorageService.clear('token');
    this.localStorageService.clear('activeuser');
    this.localStorageService.clear('activeUserName');
    this.router.navigate(['/main']);
  }

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
