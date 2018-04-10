import {TestBed, inject, getTestBed} from '@angular/core/testing';
import {AuthService} from './auth.service';
import {HttpClientModule} from '@angular/common/http';
import {AuthGuardService} from './auth.guard.service';
import {DataService} from '../../shared/services/data.service';
import {IGroupRestaurant} from '../../shared/interfaces/group-restaurant.interface';
import {defer} from 'rxjs/observable/defer';
import {Observable} from 'rxjs/Observable';
import {Injector} from '@angular/core';

class FakeAuthGuardService {
}

class FakeDataService {
  /**
   * Created flow of login
   * @type {Observable<object>}
   * @memberof ShiftsService
   */

  public dataLogin$: Observable<object>;
}

/** Create async observable that emits-once and completes
 *  after a JS engine turn
 * */

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

const BODY = {
  login: 'login',
  password: 'password',
  remember: 'remember'
};



describe('AuthService', () => {

  let httpClientSpy: { post: jasmine.Spy };
  let authService: AuthService;
  let injector: Injector;
  let dataService: DataService;
  let authGuardService: AuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        AuthService,
        // {
        //   provide: AuthGuardService,
        //   useClass: FakeAuthGuardService
        // },
        DataService,
        AuthGuardService
        // {
        //   provide: DataService,
        //   useClass: FakeDataService
        // },
      ],
    });

    injector = getTestBed();

    /**
     * translate from the root injector
     */

    dataService = injector.get(DataService);

    authGuardService = injector.get(AuthGuardService);
  });

  beforeEach(() => {
    // Todo: spy on other methods too
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    authService = new AuthService(<any> httpClientSpy, this.authGuardService, this.dataService);
  });

  // it('should return expected heroes (HttpClient called once)', () => {
  //   const post =
  //     [{id: 1, name: 'A'}, {id: 2, name: 'B'}];
  //
  //   httpClientSpy.post.and.returnValue(asyncData(post));
  //
  //   authService.onLogin(BODY);
  //   this.dataService.dataLogin$.subscribe(
  //     value => expect(value).toEqual(post, 'expected heroes'),
  //     fail
  //   );
  //
  //   expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
  // });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
