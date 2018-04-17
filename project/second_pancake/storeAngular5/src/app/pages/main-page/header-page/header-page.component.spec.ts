import {async, TestBed, getTestBed, ComponentFixture} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';
import {Observable} from 'rxjs/Observable';
import {Component, DebugElement, Injector} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {HeaderPageComponent} from './header-page.component';
import {
  AuthService,
  MainService
} from '../../../shared/services';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService
} from '@ngx-translate/core';
import {RouteActivatorService} from '../../../shared/services/route-activator.service';
import {LocalStorageService} from 'ngx-webstorage';
import {ToastModule} from 'ng2-toastr';
import {HelloPageComponent} from '../hello-page/hello-page.component';


let translationsEn: object = {
  "Main page": "Main page",
  "My account": "My account",
};

let translationsRu: object = {
  "Main page": "Главная",
  "My account": "Мой аккаунт",
};

class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    if (lang === 'ru') {
      return Observable.of(translationsRu);
    } else {
      return Observable.of(translationsEn);
    }
  }
}

@Component({
  template: 'MainSkyComponent'
})
class MainSkyComponent {
}

describe('Test HeaderPageComponent', () => {

  let fixture: ComponentFixture<HeaderPageComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;
  let fakeLocalStorageService: any;
  let mainService: any;
  let fakeMainService: any;
  let authService: any;
  let fakeAuthService: any;
  let translate: TranslateService;
  let injector:  Injector;
  let storage: LocalStorageService;

  beforeEach(() => {

    fakeMainService = {
      closeSideBar: true
    };

    fakeAuthService = {
      activeLink: ''
    };

    fakeLocalStorageService = {
      activeUserName: 'Garry'
    };

    TestBed.configureTestingModule({
      declarations: [
        HeaderPageComponent,
        MainSkyComponent
      ],
      providers: [
        TranslateService,
        LocalStorageService,
        {
          provide: MainService,
          useValue: fakeMainService
        },
        {
          provide: AuthService,
          useValue: fakeAuthService
        }
      ],
      imports: [
        HttpClientModule,
        ToastModule.forRoot(),
        RouterTestingModule.withRoutes([
          {
            path: 'main',
            component: MainSkyComponent
          }
        ]),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: FakeLoader
          }
        })
      ],
    });

    injector = getTestBed();

    /**
     * translate from the root injector
     */

    translate = injector.get(TranslateService);

    /**
     * mainService from the root injector
     */

    mainService = TestBed.get(MainService);

    /**
     * authService from the root injector
     */

    authService = TestBed.get(AuthService);

    /**
     * localStorageService from the root injector
     */

    storage = TestBed.get(LocalStorageService);

    /**
     * Set in  storage value of activeUserName
     */

    storage.store('activeUserName', fakeLocalStorageService.activeUserName);
  });

  it('Should create the app', async(() => {
    fixture = TestBed.createComponent(HeaderPageComponent);
    debugElement = fixture.debugElement.componentInstance;

    fixture.detectChanges();
    expect(debugElement).toBeTruthy();
  }));

  it('Should have a description', async(() => {
    fixture = TestBed.createComponent(HeaderPageComponent);
    debugElement = fixture.debugElement.query(By.css('span.user-logo__name'));
    htmlElement = debugElement.nativeElement;

    fixture.detectChanges();
    expect(htmlElement.textContent).toContain('G');
  }));

  it('Should have a translate of description', async(() => {
    fixture = TestBed.createComponent(HeaderPageComponent);
    debugElement = fixture.debugElement.query(By.css('li.dropdown-content'));
    htmlElement = debugElement.nativeElement;
    translate.use('ru');

    fixture.detectChanges();
    expect(htmlElement.textContent).toContain('Главная' || 'Мой аккаунт');
  }));

  it('Should test links of route', async(() => {
    fixture = TestBed.createComponent(HeaderPageComponent);
    debugElement = fixture.debugElement.query(By.css('li.dropdown-content'));

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let link = debugElement.nativeElement.getAttribute('ng-reflect-router-link');
      expect(link).toEqual('[\'/main\']' );
    });
  }));
});
