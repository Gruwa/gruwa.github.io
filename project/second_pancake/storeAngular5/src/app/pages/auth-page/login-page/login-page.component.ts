import {Component, OnInit, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {AuthService, MainService} from '../../../shared/services/index';
import {ToastsManager} from 'ng2-toastr';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {LocalStorageService} from 'ngx-webstorage';

/**
 * Method emailMatcher
 * @params {AbstractControl} value
 * @returns {object}
 * @memberof ProjectDeleteComponent
 */

function emailMatcher(value: AbstractControl): object {
  let emailControl = value.get('email');
  let confirmControl = value.get('confirmEmail');

  if (emailControl.pristine || confirmControl.pristine) {
    return null;
  }
  if (emailControl.value === confirmControl.value) {
    return null;
  }

  return {'match': true};
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginPageComponent implements OnInit {

  /**
   * Variable for visibleLogin
   * @type {boolean}
   * @memberof LoginPageComponent
   */

  public visibleLogin: boolean = true;

  /**
   * Variable for showRegister
   * @type {boolean}
   * @memberof LoginPageComponent
   */

  public showRegister: boolean = false;

  /**
   * Variable for formAdmin
   * @type {FormGroup}
   * @memberof LoginPageComponent
   */

  public formAdmin: FormGroup;

  /**
   * Variable for loading
   * @type {boolean}
   * @memberof LoginPageComponent
   */

  public loading: boolean = false;

  /**
   * Variable for showForgot
   * @type {boolean}
   * @memberof LoginPageComponent
   */

  public showForgot: boolean = false;

  /**
   * Creates an instance of LoginPageComponent.
   * @param {TranslateService} translate
   * @param {FormBuilder} fb
   * @param {Router} router
   * @param {AuthService} authService
   * @param {LocalStorageService} storage
   * @param {MainService} mainService
   * @param {ToastsManager} toast
   * @param {ViewContainerRef} vcr
   * @memberof LoginPageComponent
   */

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    public mainService: MainService,
    public storage: LocalStorageService,
    private toast: ToastsManager,
    private vcr: ViewContainerRef,
    public translate: TranslateService
  ) {
    this.toast.setRootViewContainerRef(vcr);
  }

  /**
   * Method ngOnInit
   * @returns {void}
   * @memberof LoginPageComponent
   */

  ngOnInit(): void {
    const language: string = this.storage.retrieve('language');
    this.translate.use(language);
    this.translate.setDefaultLang(language);
    this.storage.observe('language').subscribe((language: string):void => {
      this.translate.use(language);
    });
    this.initForm();
  }

  /**
   * Method for init form formAdmin
   * @returns {void}
   * @memberof LoginPageComponent
   */

  initForm(): void {
    this.formAdmin = this.fb.group({
      first_name: ['', [
        Validators.minLength(2),
        Validators.maxLength(15)
      ]],
      last_name: ['', [
        Validators.minLength(2),
        Validators.maxLength(15)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(15)
      ]],
      emailGroup: this.fb.group({
        email: ['', [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
        ]],
        confirmEmail: ['', []],
      }, {validator: emailMatcher})
    });
    this.formAdmin.reset();
  }

  /**
   * Method for switch registered form
   * @returns {void}
   * @memberof LoginPageComponent
   */

  onRegister(): void {
    this.showRegister = !this.showRegister;
  }

  /**
   * Method for cancel action
   * @returns {void}
   * @memberof LoginPageComponent
   */

  onCancel(): void {
    this.router.navigate(['/main']);
  }

  /**
   * Method for save user
   * @returns {void}
   * @memberof LoginPageComponent
   */

  onSave(): void {
    const user: object = {
      first_name: this.formAdmin.get('first_name').value,
      last_name: this.formAdmin.get('last_name').value,
      password: this.formAdmin.get('password').value,
      email: this.formAdmin.get('emailGroup.email').value,
    };

    this.authService.onRegistration(user).subscribe(
      (response) => {
        this.toast.success('Email send success');
        this.showRegister = false;
        this.showForgot = false;
        this.formAdmin.reset();
        this.authService.checkEmail = user['email'];
        this.router.navigate(['/auth/check']);
      },
      (error) => {
        this.toast.error('Registration error');
      }
    );
  }

  /**
   * Method for login user
   * @returns {void}
   * @memberof LoginPageComponent
   */

  onLogin(): void {
    this.mainService.loader$.next(true);
    const user: object = {
      password: this.formAdmin.get('password').value,
      email: this.formAdmin.get('emailGroup.email').value,
    };

    this.authService.onLoginUser(user).subscribe(
      (response) => {
        this.toast.success('Login success');

        if (this.authService.activeLink) {
          this.router.navigate([this.authService.activeLink]);
        } else {
          this.router.navigate(['/main']);
        }

        this.mainService.loader$.next(false);
      },
      (error) => {
        this.mainService.loader$.next(false);
      }
    );
  }

  /**
   * Method for visible modal
   * @param {boolean} data
   * @returns {void}
   * @memberof LoginPageComponent
   */

  visibleModal(data: boolean): void {
    this.router.navigate(['/main']);
    this.visibleLogin = data;
  }

  /**
   * Method for forgot password
   * @returns {void}
   * @memberof LoginPageComponent
   */

  forgotPassword(): void {
    const user: object = {
      email: this.formAdmin.get('emailGroup.email').value,
    };
    this.authService.forgotPassword(user).subscribe();
  }

  /**
   * Method for change language
   * @param {string} lang
   * @returns {void}
   * @memberof LoginPageComponent
   */

  changeLanguage(lang: string): void {
    this.mainService.setLanguage(lang);
  }

  /**
   * Method for required field last_name
   * @returns {boolean}
   * @memberof LoginPageComponent
   */

  formAdminLessSymbolLastName(): boolean {
    if (this.formAdmin.get('last_name').value != null) {
      if (this.formAdmin.get('last_name').value.length < 16) {
        return false;
      } else {
        return true;
      }
    }
  }

  /**
   * Method for required field first_name
   * @returns {boolean}
   * @memberof LoginPageComponent
   */

  formAdminLessSymbolFirstName(): boolean {
    if (this.formAdmin.get('first_name').value != null) {
      if (this.formAdmin.get('first_name').value.length < 16) {
        return false;
      } else {
        return true;
      }
    }
  }
}
