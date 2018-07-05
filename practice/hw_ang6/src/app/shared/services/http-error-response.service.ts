import {Injectable} from '@angular/core';
import {throwError} from 'rxjs';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FlowService} from './flow.service';
import {MainService} from './main.service';
import {HttpErrorResponse} from '@angular/common/http';

/**
 * Http Error Response Service
 */

@Injectable({
  providedIn: 'root'
})
export class HttpErrorResponseService {

  /**
   * Creates an instance of HttpErrorResponseService
   * @param {Router} router
   * @param {ToastrService} toastr
   * @param {MainService} mainService
   * @param {FlowService} flowService
   * @memberof HttpErrorResponseService
   */

  constructor(private router: Router,
              private flowService: FlowService,
              private toastr: ToastrService,
              private mainService: MainService) {
  }

  /**
   * Public method handle400Error
   * @param {HttpErrorResponse} error
   * @memberof HttpErrorResponseService
   */

  public handle400Error(error: HttpErrorResponse) {
    if (error && error.status === 400) {
      console.log('error ', error.status);

      this.toastr.error(error.statusText);
    }

    return throwError('');
  }

  /**
   * Public method handle401Error
   * @param {HttpErrorResponse} error
   * @memberof HttpErrorResponseService
   */

  public handle401Error(error: HttpErrorResponse) {
    if (error && error.status === 401) {
      console.log('error ', error.status);

      this.toastr.error(error.statusText);
      this.mainService.logOut();
    }

    return throwError('');
  }

  /**
   * Public method handle402Error
   * @param {HttpErrorResponse} error
   * @memberof HttpErrorResponseService
   */

  public handle402Error(error: HttpErrorResponse) {
    if (error && error.status === 402) {
      console.log('error ', error.status);

      this.toastr.error(error.statusText);
    }

    return throwError('');
  }

  /**
   * Public method handle403Error
   * @param {HttpErrorResponse} error
   * @memberof HttpErrorResponseService
   */

  public handle403Error(error: HttpErrorResponse) {
    if (error && error.status === 403) {
      console.log('error ', error.status);

      this.toastr.error(error.statusText);
    }

    return throwError('');
  }

  /**
   * Public method handle404Error
   * @param {HttpErrorResponse} error
   * @memberof HttpErrorResponseService
   */

  public handle404Error(error: HttpErrorResponse) {
    if (error && error.status === 404) {
      console.log('error ', error.status);

      this.toastr.error(error.statusText);
      this.flowService.dataSpinner$.next(false);
      this.router.navigate(['/404']);
    }

    return throwError('');
  }

  /**
   * Public method handle422Error
   * @param {HttpErrorResponse} error
   * @memberof HttpErrorResponseService
   */

  public handle422Error(error: HttpErrorResponse) {
    if (error && error.status === 422) {
      console.log('error ', error.status);

      this.toastr.error(error.statusText);
    }

    return throwError('');
  }

  /**
   * Public method handle500Error
   * @param {HttpErrorResponse} error
   * @memberof HttpErrorResponseService
   */

  public handle500Error(error: HttpErrorResponse) {
    if (error && error.status === 500) {
      console.log(error);

      if (error.error && error.error.Errors) {
        this.toastr.error(error.error.Errors[0].Detail);
        this.flowService.dataSmallSpinner$.next(false);
      } else {
        this.toastr.error(error.statusText);
      }
    }

    return throwError('');
  }

  /**
   * Public method handleDefaultError
   * @param {HttpErrorResponse} error
   * @memberof HttpErrorResponseService
   */

  public handleDefaultError(error: HttpErrorResponse) {
    if (error) {
      console.log('error ', error.status);

      this.toastr.error(error.statusText);
    }

    return throwError('');
  }
}

