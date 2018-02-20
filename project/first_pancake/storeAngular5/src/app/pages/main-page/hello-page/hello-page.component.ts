import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ToastsManager} from 'ng2-toastr';
import {TranslateService} from '@ngx-translate/core';
import {LocalStorageService} from 'ngx-webstorage';
import {Router} from '@angular/router';
import {MainService} from '../../../shared/services/index';

@Component({
  selector: 'app-hello-page',
  templateUrl: './hello-page.component.html',
  styleUrls: ['./hello-page.component.scss']
})
export class HelloPageComponent implements OnInit {
  constructor(public toast: ToastsManager, vcr: ViewContainerRef,
              public translate: TranslateService,
              private localStorageService: LocalStorageService,
              public router: Router,
              public mainService: MainService) {
    this.toast.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  }

  /**
   * Method for button hello Angular
   */

  helloAngular() {
    this.toast.success('Hello Ang');
    if (this.localStorageService.retrieve('language') === 'ru') {
      this.localStorageService.store('language', 'en');
    } else {
      this.localStorageService.store('language', 'ru');
    }
  }

}
