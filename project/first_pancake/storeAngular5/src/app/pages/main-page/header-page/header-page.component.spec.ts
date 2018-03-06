import {async, TestBed, getTestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';
import {Observable} from 'rxjs/Observable';
import {Component, Injector} from '@angular/core';
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


let translationsEn: object = {
  "Dashboard": "Dashboard",
  "Charts": "Charts",
  "Users": "Users",
  "Messages": "Messages",
};

let translationsRu: object = {
  "Users": "Пользователи",
  "Messages": "Сообщения",
  "Password": "Пароль",
  "Dashboard": "Доска",
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

describe('Test SidebarPageComponent', () => {

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
    let fixture = TestBed.createComponent(HeaderPageComponent);
    let component = fixture.debugElement.componentInstance;

    fixture.detectChanges();
    expect(component).toBeTruthy();
  }));

  it('Should have a description', async(() => {
    let fixture = TestBed.createComponent(HeaderPageComponent);
    let component = fixture.debugElement.query(By.css('span.user-logo__name'));
    let element = component.nativeElement;

    fixture.detectChanges();
    expect(element.textContent).toContain('G');
  }));
  //
  // it('Should have a translate of description', async(() => {
  //   let fixture = TestBed.createComponent(SidebarPageComponent);
  //   let title = fixture.debugElement.query(By.css('div.wrapper-sidebar__description'));
  //   let element = title.nativeElement;
  //
  //   translate.use('ru');
  //   fixture.detectChanges();
  //   expect(element.textContent).toContain('Доска' || 'Пользователи' || 'Пароль' || 'Сообщения');
  // }));
  //
  // it('Should test links of route', async(() => {
  //   let fixture = TestBed.createComponent(SidebarPageComponent);
  //   let routerLink = fixture.debugElement.query(By.css('li.wrapper-sidebar__item'));
  //
  //   fixture.detectChanges();
  //   setTimeout(function () {
  //     let element = routerLink.nativeElement.getAttribute('ng-reflect-router-link');
  //     expect(element).toEqual('/main' || '/main/users' || '/main/chart' || '/main/message' );
  //   }, 500);
  // }));

});
