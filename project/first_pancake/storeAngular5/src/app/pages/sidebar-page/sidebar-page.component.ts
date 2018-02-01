import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {MainService} from '../../shared/services/main.service';

@Component({
  selector: 'app-sidebar-page',
  templateUrl: './sidebar-page.component.html',
  styleUrls: ['./sidebar-page.component.scss']
})
export class SidebarPageComponent implements OnInit {

  constructor(public router: Router,
              public mainService: MainService,
              public translate: TranslateService) {
  }

  ngOnInit() {
  }

}
