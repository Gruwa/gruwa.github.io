import {ChartPageComponent} from './chart-page.component';
import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';
import {MainService, UserService} from '../../../shared/services';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs/Observable';
import {DebugElement, Injector} from '@angular/core';
import {FusionChartsModule} from 'angular4-fusioncharts';
import * as FusionCharts from 'fusioncharts';
import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.fint';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import {LocalStorageService} from 'ngx-webstorage';
import {HttpClientModule} from '@angular/common/http';
import {By} from '@angular/platform-browser';
import {ToastModule} from 'ng2-toastr';

FusionChartsModule.fcRoot(FusionCharts, Charts, FintTheme);

let translationsEn: object = {
  "Sample of analytics chart": "Sample of analytics chart",
};

let translationsRu: object = {
  "Sample of analytics chart": "Пример аналитических диаграмм"
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

class FakeUserService {
  getChartUsers(): Observable<any> {
    let data: object = {
      admins: "24",
      lecturers: "5",
      message: "All users",
      students: "6"
    };

    return Observable.of(data);
  }
}

describe( 'Test ChartPageComponent', () => {

  let fixture: ComponentFixture<ChartPageComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;
  let translate: TranslateService;
  let injector:  Injector;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [
        ChartPageComponent
      ],
      providers: [
        TranslateService,
        {
          provide: UserService,
          useClass: FakeUserService
        },
        MainService,
        LocalStorageService
      ],
      imports: [
        FusionChartsModule,
        HttpClientModule,
        ToastModule.forRoot(),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: FakeLoader
          }
        })
      ]
    });

    injector = getTestBed();

    /**
     * translate from the root injector
     */

    translate = injector.get(TranslateService);

  });

  // it('Should create the app', async(() => {
  //   fixture = TestBed.createComponent(ChartPageComponent);
  //   debugElement = fixture.debugElement.componentInstance;
  //
  //   fixture.detectChanges();
  //   expect(debugElement).toBeTruthy();
  // }));
  //
  // it('Should have a translate of titles', async(() => {
  //   fixture = TestBed.createComponent(ChartPageComponent);
  //   debugElement = fixture.debugElement.query(By.css('span'));
  //   htmlElement = debugElement.nativeElement;
  //   translate.use('ru');
  //
  //   fixture.detectChanges();
  //   expect(htmlElement.textContent).toContain('Пример аналитических диаграмм');
  // }));
});
