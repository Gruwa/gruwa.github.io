import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
import {AuthService} from '../../../shared/services/auth.service';
import {TranslateService} from '@ngx-translate/core';
import {LocalStorageService} from 'ngx-webstorage';
import {MainService} from '../../../shared/services';
import {ToastsManager} from 'ng2-toastr';

/**
 * Method for confirm password validator
 * @params {any} param
 * @returns {ValidatorFn}
 * @memberof ResetPasswordComponent
 */

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

  /**
   * Variable for create reset group
   * @type {FormGroup}
   * @memberof ResetPasswordComponent
   */

  public resetGroup: FormGroup;

  /**
   * Creates an instance of ResetPasswordComponent.
   * @param {TranslateService} translate
   * @param {FormBuilder} fb
   * @param {Router} router
   * @param {ActivatedRoute} route
   * @param {AuthService} authService
   * @param {LocalStorageService} storage
   * @param {MainService} mainService
   * @param {ToastsManager} toast
   * @param {ViewContainerRef} vcr
   * @memberof ResetPasswordComponent
   */

  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService,
              public translate: TranslateService,
              private storage: LocalStorageService,
              public mainService: MainService,
              private toast: ToastsManager,
              private vcr: ViewContainerRef,) {
    this.toast.setRootViewContainerRef(vcr);
  }

  /**
   * Method ngOnInit
   * @returns {void}
   * @memberof ResetPasswordComponent
   */

  ngOnInit(): void {
    const language = this.storage.retrieve('language');
    this.translate.use(language);
    this.translate.setDefaultLang(language);
    this.storage.observe('language').subscribe((language) => {
      this.translate.use(language);
    });

    this.resetGroup = this.fb.group({
      new_password: ['', [Validators.required, Validators.minLength(7)]],
      password2: ['', [Validators.required, passwordConfirmValidator('new_password')]]
    });

  }

  /**
   * Method for submit reset form
   * @returns {void}
   * @memberof ResetPasswordComponent
   */

  onSubmit(): void {
    const resetData: object = this.resetGroup.value;
    resetData['token'] = this.route.params['value']['uniq2'];
    resetData['uiid'] = this.route.params['value']['uniq'];

    this.authService.resetPasswordConfirm(resetData).subscribe(updated => {
      if (updated) {
        this.toast.success('Password was successfully changed');
        this.router.navigate([`/auth/login`]);
      }
    });
  }

  /**
   * Method for change language
   * @params {string} lang
   * @returns {void}
   * @memberof ResetPasswordComponent
   */

  changeLanguage(lang: string): void {
    this.mainService.setLanguage(lang);
  }

}
