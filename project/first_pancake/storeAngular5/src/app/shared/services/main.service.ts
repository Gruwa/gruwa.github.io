import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { TranslateService } from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class MainService {

  public closeSideBar: boolean = false;

  constructor(
    public localStorageService: LocalStorageService,
    public translate: TranslateService,
    public http: HttpClient
  ) { }

  setLanguage(lang: string) {
    this.localStorageService.store('vendor_id', 'vendor_id');
    this.localStorageService.store('language', lang);
    this.translate.setDefaultLang('en');
    this.translate.use(lang);

    this.localStorageService
      .observe('language')
      .subscribe((language) => {
        this.translate.use(language);
      });
  }

  changePositionSideBar() {
    this.closeSideBar = !this.closeSideBar;
  }

  sentGet(url) {
    return this.http.get(url).map(
      (response) => {
        console.log('FIIRST response', response)

      }

    );
  }
}
