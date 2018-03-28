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
import {Router} from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage';

/**
 * Injectable
 */

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    /**
     * Creates an instance of ProjectInterceptor.
     * @param {Router} router
     * @param {LocalStorageService} storage
     * @memberof AuthInterceptor
     */

    constructor(
        public router: Router,
        public storage: LocalStorageService
    ) { }

    /**
     * Method Intercept
     * @param {HttpRequest<any>} request
     * @param {HttpHandler} next
     * @returns {Observable<HttpEvent<any>>}
     * @memberof AuthInterceptor
     */

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // if (this.storage.retrieve('token')) {
        request = request.clone({
            setHeaders: {
                // token: this.storage.retrieve('token'),
                'Content-Type': 'application/json'
            }
        });
        // }

        return next.handle(request).do(
            () => {
            },
            (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 404) {
                        // this.router.navigate(['/404']);
                        console.log('error 404');
                    }
                    if (err.status === 401) {
                        console.log('error 401');
                    }
                }
            }
        );
    }
}
