import {Injectable, ViewContainerRef} from '@angular/core';
// import {Http, Response, Headers, URLSearchParams} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/retryWhen';

import {LocalStorageService} from 'ngx-webstorage';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpClientModule, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {ToastsManager} from 'ng2-toastr';

const tabs = {
  instructors: 'lecturers',
  students: 'students',
  admins: 'admins'
};

const BASEURL = `${environment.apiRoot}`;

@Injectable()
export class UserService {
  private baseUrl: string = `${environment.apiRoot}vendor/`;
  private vendorParams: {
    vendor_uuid: string
  };
  private vendor_id: string;

  constructor(public http: HttpClient,
              public storage: LocalStorageService,
              // private toast: ToastsManager
  ) {
  }

  /**
   * Service method for get Headers
   */

  getHeaders() {
    const token = this.storage.retrieve('Token');
    let headers = new HttpHeaders({'token': `${token}`});
    headers = new HttpHeaders({'Content-Type': 'application/json'});

    return headers;
  }

  /**
   * Service method for add new user
   */

  onAddNewUser(data: any = {}, tab) {
    if (tabs[tab]) {
      return this.http.post(BASEURL + `/${tabs[tab]}`, data, {
        headers: this.getHeaders()
      });
    }

    this.getUsers(tab);
  }

  /**
   * Service method for get list of Student, Instructor, Admin
   */

  getUsers(tab: string = 'students') {
    if (tabs[tab]) {
      return this.http.get(BASEURL + `/${tabs[tab]}/`, {
        headers: this.getHeaders()
      }).map(
        (response) => {
          this.storage.store(tab, response.toString());
          return response['users'];
        }
      );
    }
  }

  getChartUsers() {
    return this.http.get(BASEURL + '/chart/', {
      headers: this.getHeaders()
    });
  }

  /**
   * Service method for chek email in db
   */

  getCheckEmail(email: any, tab: string) {
    return this.http.get(BASEURL + '/' + tab + '/email/' + email + '/', {
      headers: this.getHeaders()
    })
      .map(
        (resp) => {
          console.log(resp['user']);
          return resp['user'];
        });
  }

  /**
   * Service method for change status of Student, Instructor, Admin
   */

  onEditToggleStatusUser(data,
                         tab: string) {
    if (tabs[tab]) {
      return this.http.post(BASEURL + `/${tabs[tab]}/status/`, data, {
        headers: this.getHeaders()
      });
    }
  }

  /**
   * Service method for delete user
   */

  onDeleteUser(user, tab) {
    if (tabs[tab]) {
      return this.http.delete(BASEURL + `/${tabs[tab]}/delete/` + user._id + '/', {
        headers: this.getHeaders()
      });
    }
  }

  /**
   * Service method for edit user
   */

  onEditUser(data: any = {}, tab) {
    console.log(data);
    const email = data.user.email;
    if (tabs[tab]) {
      return this.http.patch(BASEURL + `/${tabs[tab]}` + '/edit/' + email, data, {
        headers: this.getHeaders()
      });
    }

    this.getUsers(tab);
  }
}
