import {TestBed, inject, getTestBed, async} from '@angular/core/testing';
import {AuthService} from './auth.service';
import {HttpClient, HttpClientModule, HttpRequest, HttpParams} from '@angular/common/http';
import {AuthGuardService} from './auth-guard.service';
import {DataService} from '../../shared/services/data.service';
import {Injector} from '@angular/core';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../../../environments/environment';

const BODY = {
  login: 'login',
  password: 'password',
  remember: 'remember'
};

/**
 * BASEURL of api
 */

const BASEURL = `${environment.apiRoot}`;


describe('AuthService', () => {

  let injector: Injector;
  let dataService: DataService;
  let authGuardService: AuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        AuthService,
        DataService,
        AuthGuardService
      ],
    });

    injector = getTestBed();

    dataService = injector.get(DataService);

    authGuardService = injector.get(AuthGuardService);
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  it('should be created', async(
    inject([HttpClient, HttpTestingController], (http: HttpClient, backend: HttpTestingController) => {
      http.post(BASEURL + '/login', BODY).subscribe();

      backend.expectOne({
        url: BASEURL + '/login',
        method: 'POST'
      });
    })
  ));

  it(`should send an expected login request`, async(
    inject([HttpTestingController, AuthService], (backend: HttpTestingController, service: AuthService) => {
      service.onLoginRequest(BODY).subscribe();

      backend.expectOne((req: HttpRequest<any>) => {

        return req.url === BASEURL + '/login'
          && req.method === 'POST'
          && req.responseType === 'json'
          && req.body['login'] === 'login'
          && req.body['password'] === 'password';
      }, `POST to 'api/login' with form-encoded user and password`);
    })
  ));

  it(`should emit 'true' for 200 Ok`, async(inject([AuthService, HttpTestingController],
    (service: AuthService, backend: HttpTestingController) => {
      service.onLoginRequest({login: 'test@test.test', password: 'password'}).subscribe((next) => {
        expect(next).toBe(null);
      });

      backend.expectOne(BASEURL + '/login').flush(null, {status: 200, statusText: 'OK'});
    })
  ));
});
