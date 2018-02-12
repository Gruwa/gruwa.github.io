import {Component, OnInit, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {AuthService, MainService} from '../../../shared/services/index';
import {ToastsManager} from 'ng2-toastr';
import {Router} from '@angular/router';

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

  constructor(public fb: FormBuilder,
              public authService: AuthService,
              public router: Router,
              public mainService: MainService,
              private toast: ToastsManager, vcr: ViewContainerRef) {
    this.toast.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formAdmin = this.fb.group({
      firstName: ['', [
        Validators.minLength(2),
        Validators.maxLength(15)
      ]],
      lastName: ['', [
        Validators.minLength(2),
        Validators.maxLength(15)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(15)
      ]],
      emailGroup: this.fb.group({
        email: ['', [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+')
        ]],
        confirmEmail: ['', []],
      }, {validator: emailMatcher})
    });
    this.formAdmin.reset();
  }

  onRegister() {
    this.showRegister = !this.showRegister;
  }

  onCancel() {
    this.router.navigate(['/main']);
  }

  onSave() {
    debugger
    const user: any = {
      firstName: this.formAdmin.get('firstName').value,
      lastName: this.formAdmin.get('lastName').value,
      password: this.formAdmin.get('password').value,
      email: this.formAdmin.get('emailGroup.email').value,
    };

    this.authService.onRegistration(user).subscribe(
      (response) => {
        this.toast.success('Registration success');
        console.log('vse okr', response);
      },
      (error) => {
        console.log('Vse govno', error);
      }
    );
    console.log(user);
  }

  onLogin() {
    this.mainService.loader$.next(true);
    const user: any = {
      password: this.formAdmin.get('password').value,
      email: this.formAdmin.get('emailGroup.email').value,
    };

    this.authService.onLoginUser(user).subscribe(
      (response) => {
        console.log('vse ok', response);

        this.toast.success('Login success');
        this.router.navigate([this.authService.activeLink]);
        this.mainService.loader$.next(false);
      },
      (error) => {
        this.mainService.loader$.next(false);
        console.log('Vse govno', error);
      }
    );
  }

  visibleModal(data: boolean) {
    this.router.navigate(['/main']);
    this.visibleLogin = data;
  }

}
