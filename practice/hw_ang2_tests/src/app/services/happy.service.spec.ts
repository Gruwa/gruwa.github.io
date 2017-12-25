import { TestBed, inject, fakeAsync } from '@angular/core/testing';

import { HappyService } from './happy.service';
import { HttpModule, RequestMethod, ResponseOptions, XHRBackend, Response, Http } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';

const mockResponse = 'Happy';

describe('Happy.ServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        {
          provide: XHRBackend,
          useClass: MockBackend
        },
        HappyService
      ]
    });
  });

  it('should get search results', fakeAsync(
    inject([
      XHRBackend,
      HappyService
    ], (mockBackend, happyService: HappyService) => {

      const expectedUrl = '/assets/json/happy.json';

      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          expect(connection.request.method).toBe(RequestMethod.Get);
          expect(connection.request.url).toBe(expectedUrl);

          connection.mockRespond(new Response(
            new ResponseOptions({ body: { mockResponse }})
          ));
        });

      happyService.getHappy()
        .subscribe(res => {
          expect(res['mockResponse']).toEqual(mockResponse);
        });
    })
  ));
});


describe('Wikipedia search service', () => {
  let mockHttp: Http;

  beforeEach(() => {
    mockHttp = { get: null } as Http;

    spyOn(mockHttp, 'get').and.returnValue(Observable.of({
      json: () => mockResponse
    }));

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        {
          provide: Http,
          useValue: mockHttp
        },
        HappyService
      ]
    });
  });

  it('should get some happy', fakeAsync(
    inject([HappyService], HappyService => {
      const expectedUrl = '/assets/json/happy.json';

      HappyService.getHappy()
        .subscribe(res => {
          expect(mockHttp.get).toHaveBeenCalledWith(expectedUrl);
          expect(res).toEqual(mockResponse);
        });
    })
  ));

  it('should get some happy but test will be async',
    fakeAsync(inject([HappyService], (HappyService) => {
      return new Promise((pass, fail) => {

        const expectedUrl = '/assets/json/happy.json';
        HappyService.getHappy()
          .subscribe(res => {
            expect(mockHttp.get).toHaveBeenCalledWith(expectedUrl);
            expect(res).toEqual(mockResponse);
          });
      });
  })));
});
