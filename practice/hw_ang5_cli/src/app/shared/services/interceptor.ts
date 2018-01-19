import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {Router} from '@angular/router';
import {ToastsManager} from 'ng2-toastr';

@Injectable()
export class ProjectInterceptor implements HttpInterceptor {
  constructor(
    public router: Router,
    public toast: ToastsManager) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).do(() => {},
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 404) {
            this.toast.error('Bad request!', 'Error 404');
          }
        }
      });
  }
}
