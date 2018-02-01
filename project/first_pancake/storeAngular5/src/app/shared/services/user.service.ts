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

@Injectable()
export class UserService {
    private baseUrl: string = `${environment.apiRoot}vendor/`;
    private vendorParams: {
        vendor_uuid: string
    };
    private vendor_id: string;

    constructor(
        public http: HttpClient,
        public storage: LocalStorageService,
        // private toast: ToastsManager
    ) {
    }

    getVendorId(): string {
        if (!this.vendorParams) {
            this.vendor_id = this.storage.retrieve('vendor_id');

            return this.vendor_id;
        }
    }

    getHeaders() {
        const token = this.storage.retrieve('Token');
        const headers = new HttpHeaders({'Authorization': `JWT ${token}`});

        return headers;
    }

    setUrl() {
        const url: string = this.baseUrl + this.getVendorId() + '/users';

        return url;
    }

    onAddNewUser(data: any = {}, tab) {
        // const search: string = '';
        // const sort_field: string = '';
        // const ascType: boolean = true;
        //
        // if ( tabs[tab] ) {
        //
        //     return this.http.post(this.setUrl() + `/${tabs[tab]}/`, data, {
        //         headers: this.getHeaders()
        //     });
        // }
        //
        // this.getUsers( search, sort_field, ascType, tab);
    }

    getUsers( search: string = '',
              sort_field: string = '',
              ascType: boolean = true,
              tab: string = 'students',
              url: string = this.setUrl() + `/${tabs[tab]}/`
    ) {
        const query_params = new HttpParams();
        // const url = this.setUrl() + `/${tabs[tab]}/`;
      // this.toast.error('Registration failed');
        if (sort_field) {
            query_params.set('sort_field', sort_field);
            query_params.set('asc', ascType + '');
        }
        if (search) {
            query_params.set('search', search);

        }
        if ( tabs[tab] ) {
            return this.http.get(url, {
                headers: this.getHeaders(),
                params: query_params
            }).map(
                (response) => {
                  console.log('response', response)
                    this.storage.store(tab, response.toString());
                    return response['results'];
                }

            );
        }
    }

    onEditToggleStatusUser(data: any = {},
                           user,
                           tab: string) {
        // if ( tabs[tab] ) {
        //     return this.http.patch(this.setUrl() + `/${tabs[tab]}/` + user.id + '/', data, {
        //         headers: this.getHeaders()
        //     });
        // }
    }

    onDeleteUser(user, tab) {
       // if ( tabs[tab] ) {
       //      return this.http.delete(this.setUrl() + `/${tabs[tab]}/` + user.id + '/', {
       //          headers: this.getHeaders()
       //      });
       //  }
    }

    sentUploaderFile(data: any) {
        // return this.http.post(this.setUrl() + '/bulk-upload/', data, {
        //     headers: this.getHeaders()
        // });
    }

    getCheckEmail(email: any) {
        // return
      // this.http.get(this.setUrl() + '/email/' + email + '/', {
        //     headers: this.getHeaders()
        // }).map((resp: HttpResponse) => resp.json());
    }

    getSessionsFields(tab: string,
                      value: any,
                      sort_field?: any
    ) {
        // const query_params = new URLSearchParams();
        //
        // if (sort_field) {
        //     query_params.set('sort_field', sort_field.sort);
        //     query_params.set('asc', sort_field.asc + '');
        // }
        //
        // return this.http.get(this.setUrl() + (tab === 'students' ? /students/ : '/lecturers/')
        //     + value.id + '/sessions/', {
        //     headers: this.getHeaders(),
        //     params: query_params
        // }).map((resp: HttpResponse) => resp.json());
    }

    getGroupsFields(tab: string,
                    value: any,
                    sort_field?: any
    ) {
        // const query_params = new URLSearchParams();
        //
        // if (sort_field) {
        //     query_params.set('sort_field', sort_field.sort);
        //     query_params.set('asc', sort_field.asc + '');
        // }
        //
        // return this.http.get(this.setUrl() + (tab === 'students' ? /students/ : '/lecturers/')
        //     + value.id + '/groups/', {
        //     headers: this.getHeaders(),
        //     params: query_params
        // }).map((resp: HttpResponse) => resp.json());
    }

    getSessionsResults(params?: any) {
        // const urlPrams = new URLSearchParams();
        //
        // if (params) {
        //     Object.keys(params).forEach(key => {
        //         if (params[key]) {
        //             urlPrams.set(key, '' + params[key]);
        //         }
        //     });
        // }
        //
        // return this.http.get(this.setUrl() + '/groups/sessions/', {
        //     headers: this.getHeaders(), params: urlPrams
        // }).map((resp: HttpResponse) => resp.json());
    }

    getGroupsResults(params?: any) {

        // const urlPrams = new URLSearchParams();
        //
        // if (params) {
        //     Object.keys(params).forEach(key => {
        //         if (params[key]) {
        //             urlPrams.set(key, '' + params[key]);
        //         }
        //     });
        // }
        //
        // return this.http.get(this.setUrl() + '/groups/', {
        //     headers: this.getHeaders(), params: urlPrams
        // }).map((resp: HttpResponse) => resp.json());
    }

    addSessionField(data: any,
                    tab: any,
                    session: any
    ) {
        // if (tab === 'students') {
        //     return this.http.post(this.setUrl() + '/students/assign-session/', data, {
        //         headers: this.getHeaders()
        //     }).map((resp: HttpResponse) => resp.json());
        // }else if (tab === 'instructors') {
        //     return this.http.patch(this.setUrl() + '/lecturers/assign-session/' + session.id + '/', data, {
        //         headers: this.getHeaders()
        //     }).map((resp: HttpResponse) => resp.json());
        // }
    }

    addGroupField(data: any, body: any) {
        // return this.http.patch(this.setUrl() + '/groups/' + data.id + '/', body, {
        //     headers: this.getHeaders()
        // }).map((resp: HttpResponse) => resp.json());
    }

    onDeleteSession(tab: string, value: any, userActive: any) {
        // if (tab === 'students') {
        //
        //     return this.http.delete(this.setUrl() + '/students/'
        //         + userActive.id + '/remove-session/' + value.id + '/', {
        //         headers: this.getHeaders()
        //     });
        // } else if (tab === 'instructors') {
        //     const body: any = {};
        //
        //     return this.http.patch(this.setUrl() + '/lecturers/'
        //         + userActive.id + '/remove-session/' + value.id + '/', body,{
        //         headers: this.getHeaders()
        //     });
        // }
    }
}
