import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {MainService} from '../../../shared/services/main.service';
import {AuthService} from '../../../shared/services';

@Component({
  selector: 'app-sidebar-page',
  templateUrl: './sidebar-page.component.html',
  styleUrls: ['./sidebar-page.component.scss']
})
export class SidebarPageComponent {

  /**
   * Creates an instance of SidebarPageComponent.
   * @param {TranslateService} translate
   * @param {Router} router
   * @param {AuthService} authService
   * @param {MainService} mainService
   * @memberof SidebarPageComponent
   */

  constructor(
    public router: Router,
    public mainService: MainService,
    public translate: TranslateService,
    public authService: AuthService
  ) { }

  /**
   * Method for routing
   * @param {string} value
   * @returns {void}
   * @memberof LoginPageComponent
   */

  onActiveLink(value: string): void {
    this.authService.activeLink = value;
    this.router.navigate([value]);
  }

}
