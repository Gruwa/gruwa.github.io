import {
  Injectable
} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import {
  Observable,
  throwError
} from 'rxjs';
import {
  catchError,
  map,
  tap
} from 'rxjs/operators';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage';
import {FlowService} from './flow.service';
import {ToastrService} from 'ngx-toastr';
import {DataService} from './data.service';
import {MainService} from './main.service';
import {HttpErrorResponseService} from './http-error-response.service';

/**
 * Injectable
 */

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  /**
   * Creates an instance of ProjectInterceptor.
   * @param {Router} router
   * @param {LocalStorageService} localStorage,
   * @param {ActivatedRoute} route
   * @param {FlowService} flowService
   * @param {ToastrService} toastr
   * @param {DataService} dataService
   * @param {MainService} mainService
   * @param {HttpErrorResponseService} httpErrorResponseService
   * @memberof AuthInterceptor
   */

  constructor(private router: Router,
              private route: ActivatedRoute,
              private localStorage: LocalStorageService,
              private flowService: FlowService,
              private toastr: ToastrService,
              private dataService: DataService,
              private mainService: MainService,
              private httpErrorResponseService: HttpErrorResponseService) {
  }

  /**
   * Method Intercept
   * @param {HttpRequest<any>} request
   * @param {HttpHandler} next
   * @returns {Observable<HttpEvent<any>>}
   * @memberof AuthInterceptor
   */

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.localStorage.retrieve('token')
      && this.route.snapshot.children[0].params['group']
      && this.route.snapshot.children[0].children[0].params['id']) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.localStorage.retrieve('token'),
          'Content-Type': 'application/json',
          groupID: this.localStorage.retrieve('group').id, // TODO - change description on id
          id: this.route.snapshot.children[0].children[0].params['id']
        }
      });
    } else if (this.localStorage.retrieve('token')
      && this.route.snapshot.children[0].params['group']) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.localStorage.retrieve('token'),
          'Content-Type': 'application/json',
          groupID: this.localStorage.retrieve('group').id
        }
      });
    } else if (this.localStorage.retrieve('token') && this.localStorage.retrieve('group')) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.localStorage.retrieve('token'),
          'Content-Type': 'application/json',
          groupID: this.localStorage.retrieve('group').id
        }
      });
    } else if (this.localStorage.retrieve('token')) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.localStorage.retrieve('token'),
          'Content-Type': 'application/json'
        }
      });
    } else {
      request = request.clone({
        setHeaders: {
          Authorization: '',
          'Content-Type': 'application/json',
          groupID: ''
        }
      });
    }

    return next.handle(request).pipe(
      map(
        (resp) => {
          if (resp.type !== 0) {
            const token = <object>resp;
            this.localStorage.store('token', token['body']['Token']);
          }
          return resp;
        }
      ),
      tap(() => {
          this.flowService.dataSpinner$.next(false);
        }
      ),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          switch ((<HttpErrorResponse>err).status) {
            case 404:
              return this.httpErrorResponseService.handle404Error(err);
            case 401:
              return this.httpErrorResponseService.handle401Error(err);
            case 400:
              return this.httpErrorResponseService.handle400Error(err);
            case 500:
              return this.httpErrorResponseService.handle500Error(err);
            case 403:
              return this.httpErrorResponseService.handle403Error(err);
            case 422:
              return this.httpErrorResponseService.handle422Error(err);
            case 402:
              return this.httpErrorResponseService.handle402Error(err);
            default:
              return this.httpErrorResponseService.handleDefaultError(err);
          }
        } else {
          return throwError(err);
        }
      })
    );
  }
}
