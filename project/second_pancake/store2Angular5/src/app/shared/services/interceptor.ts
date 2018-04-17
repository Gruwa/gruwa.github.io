import {Injectable, ViewContainerRef} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {Router} from '@angular/router';
import {ToastsManager} from 'ng2-toastr';
import {LocalStorageService} from 'ngx-webstorage';

/**
 * Injectable
 */

@Injectable()
export class ProjectInterceptor implements HttpInterceptor {

  /**
   * Creates an instance of ProjectInterceptor.
   * @param {Router} router
   * @param {LocalStorageService} storage
   * @param {ToastsManager} toast
   * @memberof ProjectInterceptor
   */

  constructor(public router: Router,
              public storage: LocalStorageService,
              private toast: ToastsManager) {

  }

  /**
   * Method Intercept
   * @param {HttpRequest<any>} request
   * @param {HttpHandler} next
   * @returns {Observable<HttpEvent<any>>}
   * @memberof ProjectInterceptor
   */

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.storage.retrieve('token')) {
      request = request.clone({
        setHeaders: {
          token: this.storage.retrieve('token'),
          'Content-Type': 'application/json'
        }
      });
    }

    return next.handle(request).do(() => {
      },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 404) {
            this.toast.error('Bad request!', 'Error 404');
            this.router.navigate(['/404']);
          }
          if (err.status === 401) {
            this.toast.error('Bad request!', 'Error 401');
            // this.router.navigate(['/']);
            // this.localStorage.clear('token');
            // this.localStorage.clear('activeUser');
            // this.authService.stateLogin$.next({
            //   eventType: true
            // });
          }
        }
      });
  }
}
