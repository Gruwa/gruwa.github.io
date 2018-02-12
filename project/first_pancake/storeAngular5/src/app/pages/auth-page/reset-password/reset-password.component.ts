import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
import { UserService } from '../../../shared/services/user.service';
import {AuthService} from '../../../shared/services/auth.service';
import {TranslateService} from '@ngx-translate/core';
import {LocalStorageService} from 'ngx-webstorage';


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
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    const language = this.localStorageService.retrieve('language');
    this.translate.use(language);
    this.translate.setDefaultLang(language);
    this.localStorageService.observe('language').subscribe((language) => {
      this.translate.use(language);
    });

    this.resetGroup = this.fb.group({
      new_password: ['', [Validators.required]],
      password2: ['', [Validators.required, passwordConfirmValidator('new_password')]]
    });

  }

  onSubmit() {
    const resetData = this.resetGroup.value;
    resetData['token'] = this.route.params['value']['uniq2'];
    resetData['uid'] = this.route.params['value']['uniq'];
    resetData['portal_slug'] = this.route.params['value']['portalSlug'];

    // this.userService.resetPasswordConfirm(resetData).subscribe(updated => {
    //   if (updated) {
    //     this.userService.showSuccessMessage('Password was successfully changed');
    //     this.router.navigate([`/portal/${this.authService.getVendorPortal()}/auth/login`]);
    //   }
    // });
  }

  moveToLogin() {
    this.router.navigate(['auth/login']);
  }

  changeLanguage() {
      if (this.localStorageService.retrieve('language') === 'ru') {
        this.localStorageService.store('language', 'en');
      } else {
        this.localStorageService.store('language', 'ru');
      }
  }

}
