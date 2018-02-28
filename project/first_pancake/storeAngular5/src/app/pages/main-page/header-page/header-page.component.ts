import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {AuthService, MainService} from '../../../shared/services/index';
import {LocalStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-header-page',
  templateUrl: './header-page.component.html',
  styleUrls: ['./header-page.component.scss']
})
export class HeaderPageComponent {

  /**
   * Creates an instance of HeaderPageComponent.
   * @param {TranslateService} translate
   * @param {Router} router
   * @param {AuthService} authService
   * @param {MainService} mainService
   * @param {LocalStorageService} storage
   * @memberof HeaderPageComponent
   */

  constructor(
    private router: Router,
    public translate: TranslateService,
    public mainService: MainService,
    public authService: AuthService,
    public storage: LocalStorageService
  ) { }

  /**
   * Method click on button
   * @returns {void}
   * @memberof HeaderPageComponent
   */

  click(): void {
    this.router.navigate(['/main']);
  }

  /**
   * Method for change language
   * @param {string} lang
   * @returns {void}
   * @memberof HeaderPageComponent
   */

  changeLanguage(lang: string): void {
    this.mainService.setLanguage(lang);
  }

  /**
   * Method for close side bar
   * @returns {void}
   * @memberof HeaderPageComponent
   */

  closeSideBar(): void {
    this.mainService.changePositionSideBar();
  }

  /**
   * Method for log out from system
   * @returns {void}
   * @memberof HeaderPageComponent
   */

  LogOut(): void {
    this.authService.onLogOut();
  }

  /**
   * Method for log in system
   * @returns {void}
   * @memberof HeaderPageComponent
   */

  LogIn(): void {
    this.router.navigate(['/auth/login']);
  }
}
