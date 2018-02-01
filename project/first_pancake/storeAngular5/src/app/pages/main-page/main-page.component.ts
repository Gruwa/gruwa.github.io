import {
  Component,
  Inject, OnInit,
  ViewContainerRef
} from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {TranslateService} from '@ngx-translate/core';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import {Router} from '@angular/router';


@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
    constructor(
        public toast: ToastsManager, vcr: ViewContainerRef,
        public translate: TranslateService,
        private localStorageService: LocalStorageService,
        public router: Router
    ) {
        this.toast.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
      console.log('i18n')
        const language = this.localStorageService.retrieve('language');
        this.translate.use(language);
        this.translate.setDefaultLang(language);
        this.localStorageService.observe('language').subscribe((language) => {
          this.translate.use(language);
        });

        console.log(this.router)
    }

    helloAngular() {
        this.toast.success('Hello Ang');
        if (this.localStorageService.retrieve('language') === 'ru') {
          this.localStorageService.store('language', 'en');
        } else {
          this.localStorageService.store('language', 'ru');
        }
    }
}
