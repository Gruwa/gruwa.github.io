import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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

  public menuFocus: boolean = false;

  constructor(private router: Router,
              public translate: TranslateService,
              public mainService: MainService,
              public authService: AuthService,
              public localStorageService: LocalStorageService) {
  }

  /**
   * Method click on button
   */

  click() {
    this.router.navigate(['/main']);
  }

  /**
   * Method for change language
   */

  changeLanguage(lang: string) {
    this.mainService.setLanguage(lang);
  }

  /**
   * Method for close side bar
   */

  closeSideBar() {
    this.mainService.changePositionSideBar();
  }

  /**
   * Method for log out from system
   */

  LogOut() {
    this.authService.onLogOut();
  }

  /**
   * Method for log in system
   */

  LogIn() {
    this.router.navigate(['/auth/login']);
  }
}
