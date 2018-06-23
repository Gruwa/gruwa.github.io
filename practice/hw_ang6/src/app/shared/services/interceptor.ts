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
import {Observable} from 'rxjs';
import {
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
   * @memberof AuthInterceptor
   */

  constructor(private router: Router,
              private route: ActivatedRoute,
              private localStorage: LocalStorageService,
              private flowService: FlowService,
              private toastr: ToastrService,
              private dataService: DataService,
              private mainService: MainService) {
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
          groupID: this.route.snapshot.children[0].params['group'], // TODO - change description on id
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
              this.mainService.logOut();
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
      )
    );
  }
}
