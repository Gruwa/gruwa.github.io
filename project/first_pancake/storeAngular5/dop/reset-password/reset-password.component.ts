import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
import { Store} from '@ngrx/store';
import * as LoginActions from '../../../shared/actions/login.actions';
import { UserService } from '../../../shared/services/user.service';
import {AuthService} from '../../../shared/services/auth.service';
import * as SetUserAction from '../../../shared/actions/setuserinfo.actions';
import {TranslateService} from '@ngx-translate/core';


export function passwordConfirmValidator(param: any): ValidatorFn {
  return (c: AbstractControl) : {[key: string]: boolean} | null => {
    if (c.parent && c.value !== c.parent.get(param).value) {
      return {noMatch: true};
    }
    return null;
  };
}


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetGroup: FormGroup;
  lang: string;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private translate: TranslateService,
    private store: Store<{login: {loggedIn: boolean}, userInfo: {language: string}}>
  ) { }

  ngOnInit() {
    this.resetGroup = this.fb.group({
      new_password: ['', [Validators.required]],
      password2: ['', [Validators.required, passwordConfirmValidator('new_password')]]
    });
    this.store.select('userInfo').subscribe(userInfo => {
      this.lang = userInfo['language'];
      this.translate.setDefaultLang(this.lang);
      this.translate.use(this.lang);
    });
  }

  onSubmit() {
    const resetData = this.resetGroup.value;
    resetData['token'] = this.route.params['value']['uniq2'];
    resetData['uid'] = this.route.params['value']['uniq'];
    resetData['portal_slug'] = this.route.params['value']['portalSlug'];

    this.userService.resetPasswordConfirm(resetData).subscribe(updated => {
      if (updated) {
        this.userService.showSuccessMessage('Password was successfully changed');
        this.router.navigate([`/portal/${this.authService.getVendorPortal()}/auth/login`]);
      }
    });
  }

  moveToLogin() {
    this.router.navigate([`/portal/${this.authService.getVendorPortal()}/auth/login`]);
  }

  selectLanguage(lang: string) {
    this.store.dispatch(new SetUserAction.SetUserLanguage(lang));
  }
}
