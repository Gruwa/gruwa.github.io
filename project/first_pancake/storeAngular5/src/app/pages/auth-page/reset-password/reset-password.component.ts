import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
import {AuthService} from '../../../shared/services/auth.service';
import {TranslateService} from '@ngx-translate/core';
import {LocalStorageService} from 'ngx-webstorage';
import {MainService} from '../../../shared/services';
import {ToastsManager} from 'ng2-toastr';


export function passwordConfirmValidator(param: any): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
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

  public resetGroup: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService,
              public translate: TranslateService,
              private localStorageService: LocalStorageService,
              public mainService: MainService,
              public toast: ToastsManager, vcr: ViewContainerRef,) {
    this.toast.setRootViewContainerRef(vcr);
  }

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

    this.authService.resetPasswordConfirm(resetData).subscribe(updated => {
      if (updated) {
        this.toast.success('Password was successfully changed');
        this.router.navigate([`/auth/login`]);
      }
    });
  }

  changeLanguage(lang: string) {
    this.mainService.setLanguage(lang);
  }

}
