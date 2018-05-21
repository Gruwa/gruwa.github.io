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
import {tap, map} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage';
import {DataService} from './data.service';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs';

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
   * @param {DataService} dataService
   * @memberof AuthInterceptor
   */

  constructor(public router: Router,
              public route: ActivatedRoute,
              public localStorage: LocalStorageService,
              public dataService: DataService,
              private toastr: ToastrService) {
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
          token: this.localStorage.retrieve('token'),
          'Content-Type': 'application/json',
          group: this.route.snapshot.children[0].params['group'],
          id: this.route.snapshot.children[0].children[0].params['id']
        }
      });
    }
    if (this.localStorage.retrieve('token')
      && this.route.snapshot.children[0].params['group']) {
      request = request.clone({
        setHeaders: {
          token: this.localStorage.retrieve('token'),
          'Content-Type': 'application/json',
          group: this.route.snapshot.children[0].params['group']
        }
      });
    } else {
      request = request.clone({
        setHeaders: {
          token: '',
          'Content-Type': 'application/json',
          group: ''
        }
      });
    }

    return next.handle(request).pipe(map(
      (resp) => {
        if (resp.type !== 0) {
          const token = <object>resp;
          this.localStorage.store('token', token['body']['Token']);
        }
        return resp;
      }
    ), tap(() => {
      },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 404) {
            console.log('error 404');
            this.dataService.dataSpinner$.next(false);
            this.router.navigate(['/404']);
          }
          if (err.status === 401) {
            console.log('error 401');
            this.dataService.dataSpinner$.next(false);
            this.router.navigate(['/login']);
          }
          if (err.status === 550) {
            console.log('error 550');
            this.dataService.dataSmallSpinner$.next(false);
          }
          if (err.status === 551) {
            console.log('error 551');
            this.dataService.dataSmallSpinner$.next(false);
            window.location.href = '/' +
              this.route.snapshot.children[0].params['group'] + '/' +
              'shifts' + '/' +
              this.route.snapshot.children[0].children[0].params['id'];
          }
        }
      }
    ));
  }
}
