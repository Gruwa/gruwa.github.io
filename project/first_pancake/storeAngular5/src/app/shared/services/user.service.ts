import {Injectable, ViewContainerRef} from '@angular/core';
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
import {IUserService} from '../interfaces/user.sevice.interface';

type tabTypes = "students" | "admins" | "instructors";

/**
 * Variable for navigate tabs
 */

const tabs = {
  instructors: 'lecturers',
  students: 'students',
  admins: 'admins'
};

/**
 * BASEURL for api
 */

const BASEURL = `${environment.apiRoot}`;

/**
 * Injectable for LocalStorageService
 */

@Injectable()
export class UserService implements IUserService{

  /**
   * Creates an instance of UserService.
   * @param {HttpClient} http
   * @param {LocalStorageService} storage
   * @memberof UserService
   */

  constructor(
    public http: HttpClient,
    public storage: LocalStorageService) {
  }

  /**
   * Service method for add new user
   * @param data - data of new user
   * @param tab - types of users
   * @returns {Observable<object>}
   * @memberof UserService
   */

  onAddNewUser(data: any = {}, tab: tabTypes): Observable<object> {
    if (tabs[tab]) {
      return this.http.post(BASEURL + `/${tabs[tab]}`, data);
    }

    this.getUsers(tab);
  }

  /**
   * Service method for get list of Student, Instructor, Admin
   * @param tab - types of users
   * @returns {Observable<object>}
   * @memberof UserService
   */

  getUsers(tab: tabTypes = 'students'): Observable<object> {
    if (tabs[tab]) {
      return this.http.get(BASEURL + `/${tabs[tab]}/`).map(
        (response) => {
          this.storage.store(tab, response.toString());
          return response['users'];
        }
      );
    }
  }

  /**
   * Service method for get chart of Student, Instructor, Admin
   * @returns {Observable<object>}
   * @memberof UserService
   */

  getChartUsers(): Observable<object> {
    return this.http.get(BASEURL + '/chart/');
  }

  /**
   * Service method for chek email in db
   * @param email - email of user
   * @param tab - types of users
   * @returns {Observable<object>}
   * @memberof UserService
   */

  getCheckEmail(email: string, tab: tabTypes): Observable<object> {
    return this.http.get(BASEURL + '/' + tab + '/email/' + email + '/')
      .map(
        (resp) => {
          console.log(resp['user']);
          return resp['user'];
        });
  }

  /**
   * Service method for change status of Student, Instructor, Admin
   * @param data - data of status of user
   * @param tab - types of users
   * @returns {Observable<object>}
   * @memberof UserService
   */

  onEditToggleStatusUser(data: object, tab: tabTypes): Observable<object> {
    if (tabs[tab]) {
      return this.http.post(BASEURL + `/${tabs[tab]}/status/`, data);
    }
  }

  /**
   * Service method for delete user
   * @param user - data of user
   * @param tab - types of users
   * @returns {Observable<object>}
   * @memberof UserService
   */

  onDeleteUser(user: object, tab: tabTypes): Observable<object> {
    if (tabs[tab]) {
      return this.http.delete(BASEURL + `/${tabs[tab]}/delete/` + user['_id'] + '/');
    }
  }

  /**
   * Service method for edit user
   * @param data - data of user
   * @param tab - types of users
   * @returns {Observable<object>}
   * @memberof UserService
   */

  onEditUser(data: any = {}, tab: tabTypes): Observable<object> {
    const email: string = data.user.email;
    if (tabs[tab]) {
      return this.http.patch(BASEURL + `/${tabs[tab]}` + '/edit/' + email, data);
    }
    this.getUsers(tab);
  }
}
