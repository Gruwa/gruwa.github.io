import {Component, OnInit, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {AuthService, MainService} from '../../../shared/services/index';
import {ToastsManager} from 'ng2-toastr';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {LocalStorageService} from 'ngx-webstorage';

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
  selector: 'app-check-page',
  templateUrl: './check-page.component.html',
  styleUrls: ['./check-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CheckPageComponent implements OnInit {


  constructor(public authService: AuthService,
              public router: Router,
              public localStorageService: LocalStorageService,
              public translate: TranslateService) {
  }

  ngOnInit(): void {
    const language = this.localStorageService.retrieve('language');
    this.translate.use(language);
    this.translate.setDefaultLang(language);
    this.localStorageService.observe('language').subscribe((language) => {
      this.translate.use(language);
    });
  }

  /**
   * Method for check email
   */

  checkEmail(): void {
    let domen = this.authService.checkEmail;
    window.open('https://' + domen.substring(domen.indexOf('@')+1));
    this.router.navigate(['/auth']);
  }


  /**
   * Method for close check modal
   */

  visibleModal($event): void {
    this.router.navigate(['/auth']);
  }
}
