import {Component, OnInit, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {AuthService, MainService} from '../../../shared/services/index';
import {ToastsManager} from 'ng2-toastr';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

function emailMatcher(c: AbstractControl) {
  let emailControl = c.get('email');
  let confirmControl = c.get('confirmEmail');

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

  public visibleLogin: boolean = true;
  public showRegister: boolean = false;
  public formAdmin: FormGroup;
  public loading = false;
  public showForgot = false;

  constructor(public fb: FormBuilder,
              public authService: AuthService,
              public router: Router,
              public mainService: MainService,
              private toast: ToastsManager, vcr: ViewContainerRef,
              public translate: TranslateService) {
    this.toast.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.initForm();
  }

  /**
   * Method for init form formAdmin
   */

  initForm() {
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
   */

  onRegister() {
    this.showRegister = !this.showRegister;
  }

  /**
   * Method for cancel action
   */

  onCancel() {
    this.router.navigate(['/main']);
  }

  /**
   * Method for save user
   */

  onSave() {
    const user: any = {
      first_name: this.formAdmin.get('first_name').value,
      last_name: this.formAdmin.get('last_name').value,
      password: this.formAdmin.get('password').value,
      email: this.formAdmin.get('emailGroup.email').value,
    };

    this.authService.onRegistration(user).subscribe(
      (response) => {
        this.toast.success('Registration success');
        this.showRegister = false;
        this.showForgot = false;
        this.formAdmin.reset();
      },
      (error) => {
        this.toast.error('Registration error');
      }
    );
  }

  /**
   * Method for login user
   */

  onLogin() {
    this.mainService.loader$.next(true);
    const user: any = {
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
   */

  visibleModal(data: boolean) {
    this.router.navigate(['/main']);
    this.visibleLogin = data;
  }

  /**
   * Method for forgot password
   */

  forgotPassword() {
    const user: any = {
      email: this.formAdmin.get('emailGroup.email').value,
    };
    this.authService.forgotPassword(user).subscribe();
  }

  /**
   * Method for change language
   */

  changeLanguage(lang: string) {
    this.mainService.setLanguage(lang);
  }

  /**
   * Method for required field last_name
   */

  formAdminLessSymbolLastName() {
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
   */

  formAdminLessSymbolFirstName() {
    if (this.formAdmin.get('first_name').value != null) {
      if (this.formAdmin.get('first_name').value.length < 16) {
        return false;
      } else {
        return true;
      }
    }

  }
}
