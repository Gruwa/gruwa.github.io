import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService, MainService} from '../../../shared/services/index';
import {ToastsManager} from 'ng2-toastr';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {LocalStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-check-page',
  templateUrl: './check-page.component.html',
  styleUrls: ['./check-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CheckPageComponent implements OnInit {

  /**
   * Creates an instance of CheckPageComponent.
   * @param {TranslateService} translate
   * @param {Router} router
   * @param {AuthService} authService
   * @param {LocalStorageService} storage
   * @memberof CheckPageComponent
   */
  
  constructor(
    public authService: AuthService,
    public router: Router,
    public storage: LocalStorageService,
    public translate: TranslateService
  ) { }

  /**
   * Method ngOnInit
   * @returns {void}
   * @memberof CheckPageComponent
   */

  ngOnInit(): void {
    const language: string = this.storage.retrieve('language');
    this.translate.use(language);
    this.translate.setDefaultLang(language);
    this.storage.observe('language').subscribe((language: string):void => {
      this.translate.use(language);
    });
  }

  /**
   * Method for check email
   * @returns {void}
   * @memberof CheckPageComponent
   */

  checkEmail(): void {
    let domen: string = this.authService.checkEmail;
    window.open('https://' + domen.substring(domen.indexOf('@')+1));
    this.router.navigate(['/auth']);
  }

  /**
   * Method for close check modal
   * @returns {void}
   * @memberof CheckPageComponent
   */

  visibleModal($event): void {
    this.router.navigate(['/auth']);
  }
}
