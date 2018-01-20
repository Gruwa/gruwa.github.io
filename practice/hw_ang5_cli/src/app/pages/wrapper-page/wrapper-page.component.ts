import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../../shared/services/main.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-wrapper-page',
  templateUrl: './wrapper-page.component.html',
  styleUrls: ['./wrapper-page.component.scss']
})
export class WrapperPageComponent implements OnInit {
  title = 'app';

  constructor (
    public router: Router,
    public mainService: MainService,
    public translate: TranslateService
  ) {
  }

  ngOnInit() {
    this.mainService.setLanguage('en');
  }

}
