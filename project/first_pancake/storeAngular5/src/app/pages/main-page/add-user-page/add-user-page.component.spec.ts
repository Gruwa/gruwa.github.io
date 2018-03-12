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
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

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
        BrowserAnimationsModule,
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
      debugElement = fixture.debugElement.query(By.css('div.ui-g-12 app-project-input'));
      htmlElement = debugElement.nativeElement;
      let value = htmlElement.getAttribute('ng-reflect-label');
      expect(value).toBe('Email');
    });
  }));

  it('Should create content of the email input', async(() => {
    let value: string = 'pizza@pizza.fg';

    fixture.detectChanges();
    component.emailGroup.get('email').patchValue(value);
    component.onSubmitEmailCheck();
    expect(value).toEqual(component.email);
    component.initForm();
    expect(value).toEqual(component.userGroup.get('email').value);
  }));

  it('Should create content of the first_name input', async(() => {
    let value: string = 'firstName';

    fixture.detectChanges();
    component.initForm();
    component.userGroup.get('first_name').patchValue(value);
    expect(value).toEqual(component.userGroup.get('first_name').value);
  }));

  it('Should create content of the last_name input', async(() => {
    let value: string = 'lastName';

    fixture.detectChanges();
    component.initForm();
    component.userGroup.get('last_name').patchValue(value);
    expect(value).toEqual(component.userGroup.get('last_name').value);
  }));

  it('Should create content of the title input', async(() => {
    let value: string = 'title';

    fixture.detectChanges();
    component.initForm();
    component.userGroup.get('title').patchValue(value);
    expect(value).toEqual(component.userGroup.get('title').value);
  }));

  it('Should create content of the company input', async(() => {
    let value: string = 'company';

    fixture.detectChanges();
    component.initForm();
    component.userGroup.get('company').patchValue(value);
    expect(value).toEqual(component.userGroup.get('company').value);
  }));

  it('Should create content of the about_me input', async(() => {
    let value: string = 'aboutMe';

    fixture.detectChanges();
    component.initForm();
    component.userGroup.get('about_me').patchValue(value);
    expect(value).toEqual(component.userGroup.get('about_me').value);
  }));

});

