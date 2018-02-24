import {Injectable} from '@angular/core';
import {LocalStorageService} from 'ngx-webstorage';
import {TranslateService} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Subject} from 'rxjs/Subject';
import {IMainService} from '../interfaces/main.service.interface';

@Injectable()
export class MainService implements IMainService {

  public closeSideBar: boolean = false;
  public authUrl: string = `${environment.apiRoot}`;
  public loader$ = new Subject<any>();
  public userRole$ = new Subject<any>();

  constructor(
    public localStorageService: LocalStorageService,
    public translate: TranslateService,
    public http: HttpClient) {
  }

  /**
   * Method for set language
   */

  setLanguage(lang: string): void {
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

  /**
   * Method for change side bar
   */

  changePositionSideBar(): void {
    this.closeSideBar = !this.closeSideBar;
  }
}
