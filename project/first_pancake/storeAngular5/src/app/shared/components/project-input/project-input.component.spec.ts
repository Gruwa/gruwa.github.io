import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import {UserService} from '../../services';
import {ProjectInputComponent} from './project-input.component';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ToastModule, ToastsManager} from 'ng2-toastr';
import {LocalStorageService} from 'ngx-webstorage';
import {AddUserPageComponent} from '../../../pages/main-page/add-user-page/add-user-page.component';
import {DebugElement, Injector, Input, OnInit, ViewContainerRef} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ProjectButtonComponent, ProjectTextareaComponent} from '../';

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

describe('Test ProjectInputComponent for input-output', () => {

  let translate: TranslateService;
  let injector:  Injector;
  let component: ProjectInputComponent;
  let fixture: ComponentFixture<ProjectInputComponent>;
  let fb: FormBuilder;
  let htmlElement: HTMLElement;
  let debugElement: DebugElement;

  beforeEach( async(() => {

    TestBed.configureTestingModule({
      declarations: [
        // {
        //   provide: AddUserPageComponent,
        //   useClass: FakeAddUserPageComponent
        // },
        // AddUserPageComponent,
        ProjectInputComponent,
        // ProjectTextareaComponent,
        // ProjectButtonComponent
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
    fixture = TestBed.createComponent(ProjectInputComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

});
