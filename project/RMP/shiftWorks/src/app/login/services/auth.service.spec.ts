import {TestBed, inject} from '@angular/core/testing';
import {AuthService} from './auth.service';
import {HttpClientModule} from '@angular/common/http';
import {AuthGuardService} from './auth.guard.service';
import {DataService} from '../../shared/services/data.service';
import {IGroupRestaurant} from '../../shared/interfaces/group-restaurant.interface';

class FakeAuthGuardService {
}

class FakeDataService {
}

describe('AuthService', () => {

  let httpClientSpy: { post: jasmine.Spy };
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        AuthService,
        {
          provide: AuthGuardService,
          useClass: FakeAuthGuardService
        },
        {
          provide: DataService,
          useClass: FakeDataService
        },
      ],
    });
  });

  beforeEach(() => {
    // Todo: spy on other methods too
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    authService = new AuthService(<any> httpClientSpy, <any>FakeAuthGuardService, <any>FakeDataService);
  });

  // it('should return expected heroes (HttpClient called once)', () => {
  //   const post =
  //     [{ id: 1, name: 'A' }, { id: 2, name: 'B' }];
  //
  //   httpClientSpy.post.and.returnValue(async(post));
  //
  //   authService.onLogin(body).subscribe(
  //     heroes => expect(heroes).toEqual(post, 'expected heroes'),
  //     fail
  //   );
  //   expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  // });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
