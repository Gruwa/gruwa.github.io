import {AddUserPageComponent} from './add-user-page.component';
import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {ProjectInputComponent} from '../../../shared/components/project-input/project-input.component';
import {ProjectTextareaComponent} from '../../../shared/components/project-textarea/project-textarea.component';
import {ProjectButtonComponent} from '../../../shared/components/project-button/project-button.component';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs/Observable';
import {UserService} from '../../../shared/services';
import {DebugElement, Injector} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {LocalStorageService} from 'ngx-webstorage';
import {ToastModule} from 'ng2-toastr';
import * as Types from '../../../shared/interfaces/tab.interface';
import {By} from '@angular/platform-browser';

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

describe('Test AddUserPageComponent', () => {

  let translate: TranslateService;
  let injector:  Injector;
  let component: AddUserPageComponent;
  let fixture: ComponentFixture<AddUserPageComponent>;
  let htmlElement: HTMLElement;
  let debugElement: DebugElement;
  let tab: Types.tabTypes = 'admins';

  beforeEach( async(() => {

    TestBed.configureTestingModule({
      declarations: [
        AddUserPageComponent,
        ProjectInputComponent,
        ProjectTextareaComponent,
        ProjectButtonComponent
      ],
      providers: [
        TranslateService,
        UserService,
        LocalStorageService
      ],
      imports: [
        ReactiveFormsModule,
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

  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserPageComponent);
    component = fixture.componentInstance;
    component.tab = tab;
  });

  it('Should create the app', async(() => {
    debugElement = fixture.debugElement.componentInstance;

    fixture.detectChanges();
    expect(debugElement).toBeTruthy();
  }));

  it('Should create set input', async(() => {
    fixture.whenStable().then( () => {
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.css('#add-user-input-email-id'));
      htmlElement = debugElement.nativeElement;
      let value = htmlElement.getAttribute('ng-reflect-label');
      expect(value).toBeTruthy('Email');
    });
  }));

});

describe('Test ProjectInputComponent for input-output', () => {

  let translate: TranslateService;
  let injector:  Injector;
  let component: ProjectInputComponent;
  let fixture: ComponentFixture<ProjectInputComponent>;
  let htmlElement: HTMLElement;
  let debugElement: DebugElement;

  beforeEach( async(() => {

    TestBed.configureTestingModule({
      declarations: [
        AddUserPageComponent,
        ProjectInputComponent,
        ProjectTextareaComponent,
        ProjectButtonComponent
      ],
      providers: [
        TranslateService,
        UserService,
        LocalStorageService
      ],
      imports: [
        ReactiveFormsModule,
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

  }));




});
