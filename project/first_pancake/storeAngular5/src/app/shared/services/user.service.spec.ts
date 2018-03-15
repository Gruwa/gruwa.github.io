import { MockBackend, MockConnection } from '@angular/http/testing';
import {async, fakeAsync, getTestBed, inject, TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import {XHRBackend} from '@angular/http';
import {UserService} from './user.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {LocalStorageService} from 'ngx-webstorage';
import {environment} from '../../../environments/environment';

const mockResponse = 'Resp';

describe('UserService', () => {

  let injector: TestBed;
  let userService: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        UserService,
        LocalStorageService
      ]
    });
    injector = getTestBed();
    userService = injector.get(UserService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should not immediately connect to the server', () => {
    httpMock.expectNone({});
  });

  describe('Service method for get list of Student, Instructor, Admin', () => {

    const dummyUsers = [
      {
        first_name : "first_name",
        last_name : "last_name"
      },
      {
        first_name : "first_name2",
        last_name : "last_name2"
      },
      {
        first_name : "first_name3",
        last_name : "last_name3"
      },
      {
        first_name : "first_name4",
        last_name : "last_name4"
      }
    ];

    it('should make a GET request', async(() => {
      userService.getUsers().subscribe();

      let k = JSON.stringify(dummyUsers);
      console.log(dummyUsers);
      let req = httpMock.expectOne(dummyUsers);
      expect(req.request.method).toBe('GET');
      req.flush([]);
    }));

    it('should return an Observable<User[]>', () => {


      // const tabs['tab'] = 'students';
      // userService.getUsers().subscribe(users => {
      //   console.log(users);
        // expect(users.length).toBe(4);
        // expect(users).toEqual(dummyUsers);
      // });

      // const req = httpMock.expectOne({method: 'GET', url: 'http://localhost:4334/student'});

      // expect(req.request.method).toBe("GET");
      // req.flush(dummyUsers);
    });
  });

  // it('should get search results', fakeAsync(
  //
  //   httpMock.
  //   inject([
  //     UserService
  //   ], (mockBackend, userService: UserService) => {
  //
  //     mockBackend.connections.subscribe(
  //       (connection: MockConnection Mock) => {
  //         expect(connection.request.method).toBe(RequestMethod.Get);
  //         expect(connection.request.url).toBe(expectedUrl);
  //         M
  //
  //         connection.mockRespond(new Response(
  //           new ResponseOptions({ body: { mockResponse }})
  //         ));
  //       });
  //
  //
  //   })
  // ))
});
