import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {MainService} from '../../shared/services';

@Component({
  selector: 'app-header-page',
  templateUrl: './header-page.component.html',
  styleUrls: ['./header-page.component.scss']
})
export class HeaderPageComponent implements OnInit {

  constructor(
    private router: Router,
    public translate: TranslateService,
    public mainService: MainService
  ) { }

  ngOnInit() {
  }

  click() {
    this.router.navigate(['/main']);
  }

  changeLanguage(lang: string) {
    this.mainService.setLanguage(lang);
  }
}
