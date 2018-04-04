import {HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';


export const Methods = {
  Delete: 'DELETE',
  Get: 'GET',
  Head: 'HEAD',
  Jsonp: 'JSONP',
  Options: 'OPTIONS',
  Post: 'POST',
  Put: 'PUT',
  Patch: 'PATCH'
};


export interface AnyObject {
    [key: string]: any
}
@Injectable()
export class RequestItem {

    public composedUrl: string;

    public body: any;

    public headers: HttpHeaders = new HttpHeaders();

    public params: HttpParams;

    private updatedMethod: string;

    constructor(public url: string,
        public method: string = Methods.Get) {}

    private setInitialData(): void {
        this.updatedMethod = null;
        this.composedUrl = '';
        this.params = null;
        this.headers = new HttpHeaders();
        this.body = null;
    }

    replaceUrlParams(params: AnyObject): RequestItem {
        this.composedUrl = this.url;
        for (const key in params) {
          if (params.hasOwnProperty(key)) {
            this.composedUrl = this.composedUrl.replace(`<${key}>`, params[key]);
          }
        }
        return this;
    }

    setQueryParams(queryParams: AnyObject): RequestItem {
        this.params = this.params || new HttpParams();
        for (const key in queryParams) {
          if (queryParams.hasOwnProperty(key)) {
            this.params.set(key, queryParams[key])
          }
        }
        return this;
    }

    deleteQueryParams(...queryParamNames: Array < string > ): RequestItem {
        this.params = this.params || new HttpParams();
        for (const param of queryParamNames) {
            this.params.delete(param)
        }
        return this;
    }

    appendHeaders(headerParams: AnyObject): RequestItem {
        Object.keys(headerParams).forEach(key => {
            this.headers.has(key) ? this.headers.set(key, headerParams[key]) :
                this.headers.append(key, headerParams[key]);
        });
        return this;
    }

    clearHeaders(): RequestItem {
        this.headers = new HttpHeaders();
        return this;
    }

    deleteHeaders(...keys: Array < string > ): RequestItem {
        for (const header of keys) {
            this.headers.delete(header)
        }
        return this;
    }

    setBody(params: any): RequestItem {
        this.body = params;
        return this;
    }

    clearBody() {
        this.body = {};
        return this;
    }

    updateBody(params: AnyObject): RequestItem {
        this.body = { ...this.body,
            ...params
        };
        return this;
    }

    setRequestMethod(method: string): RequestItem {
        this.updatedMethod = method;
        return this;
    }

    generateRequest() {
      this.setInitialData();
      return new HttpRequest(
        this.updatedMethod || this.method,
        this.body,
        this.composedUrl || this.url,
        {
          headers: this.headers,
          params: this.params
      });
    }

}

const apiRequestFactory = {

    create: (url, method): RequestItem => {
        return new RequestItem(url, method);
    }

};

export function CreateRequestItem(url: string, method: string = Methods.Get) {

    return function (target: any, propertyKey: string | symbol) {
        target[propertyKey] = apiRequestFactory.create(url, method);
    }

}
