import {TestBed, inject, getTestBed, async} from '@angular/core/testing';
import {HttpService} from './http.service';
import {environment} from '../../../environments/environment';
import {FlowService} from './flow.service';
import {Injector} from '@angular/core';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient, HttpClientModule, HttpRequest} from '@angular/common/http';
import {HttpGuardService} from './http-guard.service';
import {DataService} from './data.service';

/**
 * BASEURL of api
 */

const BASEURL = `${environment.apiRoot}`;

/**
 * BODY of api
 */

const BODY = {
  field1: 'field1',
  field2: 'field2'
};

const BODYRESP = {
  Items: {
    'ShiftTitle': 'ShiftTitle',
    'JobID': 'JobID',
    'StationID': 'StationID',
    'DateFrom': 'DateFrom',
    'DateTo': 'DateTo',
    'LocationID': 'LocationID',
    'ShiftID': 'ShiftID',
    'IsDropRequest': 'IsDropRequest',
    'IsPickupRequest': 'IsPickupRequest'
  }
};

describe('HttpService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        HttpService,
        FlowService,
        DataService,
        HttpGuardService
      ],
    });
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  describe('GET request', () => {

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

  describe('DELETE request', () => {

    it('should be deleted', async(
      inject([HttpClient, HttpTestingController], (http: HttpClient, backend: HttpTestingController) => {
        http.delete(BASEURL + '/shifts/delete' + 'id').subscribe();

        backend.expectOne({
          url: BASEURL + '/shifts/delete' + 'id',
          method: 'DELETE'
        });
      })
    ));

    it(`should delete shift`, async(
      inject([HttpTestingController, HttpService], (backend: HttpTestingController, service: HttpService) => {
        service.deleteShifts('upcoming').subscribe();

        backend.expectOne((req: HttpRequest<any>) => {

          return req.url === BASEURL + '/shifts/delete/' + 'upcoming'
            && req.method === 'DELETE'
            && req.responseType === 'json';
        }, `DELETE shift`);
      })
    ));

    it(`should emit 'true' for 200 Ok`, async(inject([HttpService, HttpTestingController],
      (service: HttpService, backend: HttpTestingController) => {
        service.deleteShifts('upcoming').subscribe((next) => {
          expect(next).toBe(null);
        });

        backend.expectOne(BASEURL + '/shifts/delete/' + 'upcoming').flush(null, {status: 200, statusText: 'OK'});
      })
    ));
  });

  describe('PATCH request', () => {

    it('should be edited', async(
      inject([HttpClient, HttpTestingController], (http: HttpClient, backend: HttpTestingController) => {
        http.patch(BASEURL + '/shifts/' + 'id', BODY).subscribe();

        backend.expectOne({
          url: BASEURL + '/shifts/' + 'id',
          method: 'PATCH'
        });
      })
    ));

    it(`should edit shift`, async(
      inject([HttpTestingController, HttpService], (backend: HttpTestingController, service: HttpService) => {
        service.patchShiftsRequest('upcoming', BODY).subscribe();

        backend.expectOne((req: HttpRequest<any>) => {

          return req.url === BASEURL + '/shifts/' + 'upcoming'
            && req.method === 'PATCH'
            && req.responseType === 'json'
            && req.body['field1'] === 'field1'
            && req.body['field2'] === 'field2';
        }, `PATCH to 'api/shifts/id' with form-encoded fields`);
      })
    ));

    it(`should emit 'true' for 200 Ok`, async(inject([HttpService, HttpTestingController],
      (service: HttpService, backend: HttpTestingController) => {
        service.patchShiftsRequest('upcoming', BODYRESP).subscribe((next) => {
          expect(next).toBe(null);
        });

        backend.expectOne(BASEURL + '/shifts/' + 'upcoming').flush(null, {status: 200, statusText: 'OK'});
      })
    ));
  })
});
