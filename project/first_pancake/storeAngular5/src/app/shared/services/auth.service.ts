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


@Injectable()
export class AuthService {
  public authUrl: string = `${environment.apiRoot}/admin`;
  public headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  public stateLogin$ = new Subject<any>();

  constructor(public http: HttpClient,
              public localStorageService: LocalStorageService,
              private toast: ToastsManager
  ) {
  }

  getHeaders() {
    const token = this.localStorageService.retrieve('token')

    let header = {
      'Content-Type': 'application/json'
    };

    if (token) {
      header['token'] = token;
    }

    let headers: HttpHeaders = new HttpHeaders(header);

    return headers;
  }

  onRegistration(admin: any) {


    return this.http.post(this.authUrl, admin, {headers: this.getHeaders()}).catch(
      (error) => {
        this.toast.error('Registration failed');
        return Observable.throw(error);
      }
    );
  }

  onLoginUser(body: any) {

console.log(this.getHeaders())

    return this.http.post(this.authUrl + '/signin', body, {headers: this.getHeaders()})
      .map(
      (response) => {
        this.localStorageService.store('token', response['token']);
        this.localStorageService.store('activeUser', response['userId']);
        return response;
      })
      .catch(
        (error) => {
          this.toast.error('Login failed');
          return Observable.throw(error);
        }
      );
  }

  validToken() {
    const body = {
      token: this.localStorageService.retrieve('token'),
      activeUser: this.localStorageService.retrieve('activeUser')
    };
    return this.http.post(this.authUrl, body, {headers: this.getHeaders()})
      .catch(
        (error) => {
          this.toast.error('Login failed');
          return Observable.throw(error);
        }
      );
  }

}
