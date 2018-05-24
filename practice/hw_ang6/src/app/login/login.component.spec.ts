import {TestBed, inject, ComponentFixture, async, fakeAsync} from '@angular/core/testing';
import {LoginComponent} from './login.component';
import {AppRoutingModule} from '../app-routing.module';
import {APP_BASE_HREF} from '@angular/common';
import {AppComponentsModule} from '../shared/components/app-components.module';
import {AuthService} from './services/auth.service';
import {FlowService} from '../shared/services/flow.service';
import {ReactiveFormsModule} from '@angular/forms';
import {DebugElement} from '@angular/core';
import {MaterialsModule} from '../shared/components/materials/materials.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import * as faker from 'faker';
import {By} from '@angular/platform-browser';

class FakeAuthService {

}

class FakeFlowService {

}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppRoutingModule,
        AppComponentsModule,
        ReactiveFormsModule,
        MaterialsModule,
        BrowserAnimationsModule
      ],
      declarations: [
        LoginComponent
      ],
      providers: [
        {
          provide: APP_BASE_HREF,
          useValue: '/api'
        },
        {
          provide: AuthService,
          useClass: FakeAuthService
        },
        {
          provide: FlowService,
          useClass: FakeFlowService
        },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    htmlElement = fixture.nativeElement;
  });

  function fillTheForm(login, password, remember) {
    component.loginForm.controls['login'].setValue(login);
    component.loginForm.controls['password'].setValue(password);
    component.loginForm.controls['remember'].setValue(remember);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have blank fields in reactive form', () => {
    expect(component.loginForm.value).toEqual({
      login: '',
      password: '',
      remember: false
    });
  });

  it('should have not submit form if required fields are not filled in', fakeAsync(() => {
    const spy = spyOn(component, 'onSubmit');
    fillTheForm( faker.internet.email(), '', true);

    expect(spy).not.toHaveBeenCalled();
  }));

  it('should have not show button if required fields are not filled in', fakeAsync(() => {
    fillTheForm( faker.internet.email(), '', true);
    const button = htmlElement.querySelector('#login-submit-btn');

    expect(button.hasAttribute('disabled')).toBe(true);
  }));

  it('should have submite enabled if required field are filled in', fakeAsync( () => {
    const spy = spyOn(component, 'onSubmit').and.callThrough();
    fillTheForm(faker.internet.email(), faker.internet.password(), true);
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();

    expect(spy).toHaveBeenCalled();
  }));

  it('Should create content of the login form-input', async(() => {
    const value: string = 'login';
    component.initForm();
    console.log(component.loginForm);
    component.loginForm.get('login').patchValue(value);

    expect(value).toEqual(component.loginForm.get('login').value);
  }));

  it('Should create content of the password form-input', async(() => {
    const value: string = 'password';
    component.initForm();
    console.log(component.loginForm);
    component.loginForm.get('password').patchValue(value);

    expect(value).toEqual(component.loginForm.get('password').value);
  }));
});
