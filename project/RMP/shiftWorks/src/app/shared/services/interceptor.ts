import {
  Injectable,
  ViewContainerRef
} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage';

/**
 * Injectable
 */

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  /**
   * Creates an instance of ProjectInterceptor.
   * @param {Router} router
   * @param {LocalStorageService} localStorage,
   * @memberof AuthInterceptor
   */

  constructor(public router: Router,
              public localStorage: LocalStorageService) {
  }

  /**
   * Method Intercept
   * @param {HttpRequest<any>} request
   * @param {HttpHandler} next
   * @returns {Observable<HttpEvent<any>>}
   * @memberof AuthInterceptor
   */

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // TODO -	correct when work with real api
    // if (this.localStorage.retrieve('token')) {
    request = request.clone({
      setHeaders: {
        // token: this.localStorage.retrieve('token'),
        'Content-Type': 'application/json',
        group: this.localStorage.retrieve('group')
      }
    });
    // } else {
    //     this.router.navigate(['/login']);
    // }

    return next.handle(request).do(
      (resp) => {
        console.log('intercept resp', resp);
        this.localStorage.store('token', resp['Token']);
        return resp;
      },
      (err: any) => {
        // if (err instanceof HttpErrorResponse) {
        //   if (err.status === 404) {
        //     console.log('error 404');
        //     this.router.navigate(['/404']);
        //   }
        //   if (err.status === 401) {
        //     console.log('error 401');
        //     this.router.navigate(['/login']);
        //   }
        // }
      }
    );
  }
}
