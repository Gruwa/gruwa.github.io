import {
  Component,
  Inject, OnInit,
  ViewContainerRef
} from '@angular/core';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {TranslateService} from '@ngx-translate/core';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import {Router} from '@angular/router';
import {MainService} from '../../shared/services';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(
    public toast: ToastsManager, vcr: ViewContainerRef,
    public translate: TranslateService,
    private storage: LocalStorageService,
    public router: Router,
    public mainService: MainService
  ) {
    this.toast.setRootViewContainerRef(vcr);
  }

  ngOnInit(): void {
    const language: string = this.storage.retrieve('language');
    this.translate.use(language);
    this.translate.setDefaultLang(language);
    this.storage.observe('language').subscribe((language: string): void => {
      this.translate.use(language);
    });
    this.storage.store('tab', 'students');
  }
}
