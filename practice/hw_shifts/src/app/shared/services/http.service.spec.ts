import {TestBed, inject, getTestBed, async} from '@angular/core/testing';
import {HttpService} from './http.service';
import {environment} from '../../../environments/environment';
import {DataService} from './data.service';
import {Injector} from '@angular/core';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient, HttpClientModule, HttpRequest} from '@angular/common/http';
import {HttpGuardService} from './http-guard.service';

/**
 * BASEURL of api
 */

const BASEURL = `${environment.apiRoot}`;

describe('HttpService', () => {

  let injector: Injector;
  let dataService: DataService;
  let httpGuardService: HttpGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        HttpService,
        DataService,
        HttpGuardService
      ],
    });

    injector = getTestBed();

    dataService = injector.get(DataService);

    httpGuardService = injector.get(HttpGuardService);
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  it('should be created', async(
    inject([HttpClient, HttpTestingController], (http: HttpClient, backend: HttpTestingController) => {
      http.get(BASEURL + '/shifts/' + 'upcoming').subscribe();

      backend.expectOne({
        url: BASEURL + '/shifts/' + 'upcoming',
        method: 'GET'
      });
    })
  ));

  it(`should send an expected login request`, async(
    inject([HttpTestingController, HttpService], (backend: HttpTestingController, service: HttpService) => {
      service.getShiftsRequest('upcoming').subscribe();

      backend.expectOne((req: HttpRequest<any>) => {

        return req.url === BASEURL + '/shifts/' + 'upcoming'
          && req.method === 'GET'
          && req.responseType === 'json';
      }, `POST to 'api/login' with form-encoded user and password`);
    })
  ));

  it(`should emit 'true' for 200 Ok`, async(inject([HttpService, HttpTestingController],
    (service: HttpService, backend: HttpTestingController) => {
      service.getShiftsRequest('upcoming').subscribe((next) => {
        expect(next).toBe(null);
      });

      backend.expectOne(BASEURL + '/shifts/' + 'upcoming').flush(null, {status: 200, statusText: 'OK'});
    })
  ));
});
