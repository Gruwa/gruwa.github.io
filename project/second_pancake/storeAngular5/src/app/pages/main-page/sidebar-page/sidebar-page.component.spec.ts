import {async, TestBed, getTestBed, ComponentFixture} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';
import {Observable} from 'rxjs/Observable';
import {Component, DebugElement, Injector} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {SidebarPageComponent} from './sidebar-page.component';
import {AuthService, MainService, UserResolverService} from '../../../shared/services';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService
} from '@ngx-translate/core';
import {RouteActivatorService} from '../../../shared/services/route-activator.service';
import {HeaderPageComponent} from '../header-page/header-page.component';


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

@Component({
  template: 'ChartSkyComponent'
})
class ChartSkyComponent {
}

@Component({
  template: 'TabSkyComponent'
})
class TabSkyComponent {
}

describe('Test SidebarPageComponent', () => {

  let fixture: ComponentFixture<SidebarPageComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;
  let mainService: any;
  let fakeMainService: any;
  let authService: any;
  let fakeAuthService: any;
  let translate: TranslateService;
  let injector:  Injector;

  beforeEach(() => {

    fakeMainService = {
      closeSideBar: true
    };

    fakeAuthService = {
      activeLink: ''
    };

    TestBed.configureTestingModule({
      declarations: [
        SidebarPageComponent,
        MainSkyComponent,
        ChartSkyComponent,
        TabSkyComponent
      ],
      providers: [
        TranslateService,
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
          },
          {
            path: 'main/chart',
            component: ChartSkyComponent
          },
          {
            path: 'main/users',
            component: TabSkyComponent
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
    translate = injector.get(TranslateService);

    /**
     * mainService from the root injector
     */
    mainService = TestBed.get(MainService);

    /**
     * authService from the root injector
     */
    authService = TestBed.get(AuthService);
  });

  it('Should create the app', async(() => {
    fixture = TestBed.createComponent(SidebarPageComponent);
    debugElement = fixture.debugElement.componentInstance;

    fixture.detectChanges();
    expect(debugElement).toBeTruthy();
  }));

  it('Should have a description', async(() => {
    fixture = TestBed.createComponent(SidebarPageComponent);
    debugElement = fixture.debugElement.query(By.css('div.wrapper-sidebar__description'));
    htmlElement = debugElement.nativeElement;

    fixture.detectChanges();
    expect(htmlElement.textContent).toContain('Dashboard' || 'Users' || 'Charts' || 'Messages');
  }));

  it('Should have a translate of description', async(() => {
    fixture = TestBed.createComponent(SidebarPageComponent);
    debugElement = fixture.debugElement.query(By.css('div.wrapper-sidebar__description'));
    htmlElement = debugElement.nativeElement;
    translate.use('ru');

    fixture.detectChanges();
    expect(htmlElement.textContent).toContain('Доска' || 'Пользователи' || 'Пароль' || 'Сообщения');
  }));

  it('Should test links of route', async(() => {
    fixture = TestBed.createComponent(SidebarPageComponent);
    debugElement = fixture.debugElement.query(By.css('li.wrapper-sidebar__item'));

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let link = debugElement.nativeElement.getAttribute('ng-reflect-router-link');
      expect(link).toEqual('/main' || '/main/users' || '/main/chart' || '/main/message' );
    });
  }));
});
