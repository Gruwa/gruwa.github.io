import {async, TestBed, getTestBed} from '@angular/core/testing';
import {HelloPageComponent} from './hello-page.component';
import {MainService} from '../../../shared/services';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService
} from '@ngx-translate/core';
import {LocalStorageService} from 'ngx-webstorage';
import {ToastModule} from 'ng2-toastr';
import {HttpClientModule} from '@angular/common/http';
import {
  ProjectListDirective,
  ProjectTitleDirective
} from '../../../shared/directives';
import {By} from '@angular/platform-browser';
import {Observable} from 'rxjs/Observable';
import {Injector} from '@angular/core';

let translationsRu: object = {
  "Here are some links to help you start:": "Тут находятся ссылки, которые могут тебе помочь:",
  "Tour of Heroes": "Тур героев",
  "CLI Documentation": "CLI Документация",
  "Angular blog": "Блог Angular",
  "Hello from Angular 5 App CLI": "Привет от Angular 5 App CLI"
};

let translationsEn: object = {
  "Here are some links to help you start:": "Here are some links to help you start:",
  "Tour of Heroes": "Tour of Heroes",
  "CLI Documentation": "CLI Documentation",
  "Angular blog": "Angular blog",
  "Hello from Angular 5 App CLI": "Hello from Angular 5 App CLI",
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

describe('Test HelloPageComponent', () => {

  let translate: TranslateService;
  let injector:  Injector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HelloPageComponent,
        ProjectTitleDirective,
        ProjectListDirective
      ],
      providers: [
        MainService,
        TranslateService,
        LocalStorageService
      ],
      imports: [
        ToastModule.forRoot(),
        HttpClientModule,
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
  });

  it('Should create the app', async(() => {
    let component = TestBed.createComponent(HelloPageComponent);
    let hello = component.debugElement.componentInstance;

    component.detectChanges();
    expect(hello).toBeTruthy();
  }));

  it('Should have a title', async(() => {
    let component = TestBed.createComponent(HelloPageComponent);
    let title = component.debugElement.query(By.css('h1.hello-page__title'));
    let element = title.nativeElement;

    component.detectChanges();
    expect(element.textContent).toContain('Hello from Angular 5 App CLI');
  }));

  it('Should have a translate of title', async(() => {
    let component = TestBed.createComponent(HelloPageComponent);
    let title = component.debugElement.query(By.css('h1.hello-page__title'));
    let element = title.nativeElement;

    translate.use('ru');
    console.log(element.textContent);

    component.detectChanges();
    expect(element.textContent).toContain('Привет от Angular 5 App CLI');
  }));
});
