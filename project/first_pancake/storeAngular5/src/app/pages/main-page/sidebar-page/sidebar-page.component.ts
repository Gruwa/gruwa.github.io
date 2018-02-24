import {Component, OnInit} from '@angular/core';
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

  constructor(
    public router: Router,
    public mainService: MainService,
    public translate: TranslateService,
    public authService: AuthService
  ) { }

  /**
   * Method for routing
   */

  onActiveLink(value: string): void {
    this.authService.activeLink = value;
    this.router.navigate([value]);
  }

}
