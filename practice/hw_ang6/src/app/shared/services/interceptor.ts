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
import {FlowService} from './flow.service';
import {ToastrService} from 'ngx-toastr';
import {DataService} from './data.service';

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
   * @memberof AuthInterceptor
   */

  constructor(private router: Router,
              private route: ActivatedRoute,
              private localStorage: LocalStorageService,
              private flowService: FlowService,
              private toastr: ToastrService,
              private dataService: DataService) {
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

    return next.handle(request).map(
      (resp) => {
        if (resp.type !== 0) {
          const token = <object>resp;
          this.localStorage.store('token', token['body']['Token']);
        }
        return resp;
      }
    ).do(() => {
      },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 404) {
            console.log('error 404');
            this.toastr.error(this.dataService.httpErrorResponse['404']);
            this.flowService.dataSpinner$.next(false);
            this.router.navigate(['/404']);
          }
          if (err.status === 401) {
            console.log('error 401');
            this.toastr.error(this.dataService.httpErrorResponse['401']);
            this.flowService.dataSpinner$.next(false);
            this.router.navigate(['/login']);
          }
          if (err.status === 500) {
            console.log('error 500'); // other error on backend part
            this.toastr.error(this.dataService.httpErrorResponse['500']);
            this.flowService.dataSmallSpinner$.next(false);
          }
          if (err.status === 550) {
            console.log('error 550'); // other error on backend part
            this.toastr.error(this.dataService.httpErrorResponse['550']);
            this.flowService.dataSmallSpinner$.next(false);
          }
          if (err.status === 551) {
            console.log('error 551'); // if data on mobile is old
            this.toastr.error(this.dataService.httpErrorResponse['551']);
            this.flowService.dataSmallSpinner$.next(false);
            setTimeout(() => {
              window.location.href = '/' +
                this.route.snapshot.children[0].params['group'] + '/' +
                'shifts' + '/' +
                this.route.snapshot.children[0].children[0].params['id'];
            }, 1200);
          }
          if (err.status === 552) {
            console.log('error 552'); // other error on backend part
            this.toastr.error(this.dataService.httpErrorResponse['552']);
            this.flowService.dataSmallSpinner$.next(false);
          }
        }
      }
    );
  }
}
