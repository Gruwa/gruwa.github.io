import {Injectable} from '@angular/core';
import {LocalStorageService} from 'ngx-webstorage';
import {TranslateService} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Subject} from 'rxjs/Subject';
import {IMainService} from '../interfaces/main.service.interface';

/**
 * Injectable for LocalStorageService
 */

@Injectable()
export class MainService implements IMainService {

  /**
   * Variable for close side bar
   * @type {boolean}
   * @memberof MainService
   */

  public closeSideBar: boolean = false;

  /**
   * Variable for loader
   * @type {Subject<any>}
   * @memberof MainService
   */

  public loader$ = new Subject<any>();

  /**
   * Creates an instance of MainService.
   * @param {TranslateService} translate
   * @param {LocalStorageService} storage
   * @param {HttpClient} http
   * @memberof MainService
   */

  constructor(
    public storage: LocalStorageService,
    public translate: TranslateService,
    public http: HttpClient) {
  }

  /**
   * Method for set language
   * @param {string} lang - active language
   * @memberof MainService
   */

  setLanguage(lang: string): void {
    this.storage.store('vendor_id', 'vendor_id');
    this.storage.store('language', lang);
    this.translate.setDefaultLang('en');
    this.translate.use(lang);

    this.storage
      .observe('language')
      .subscribe((language) => {
        this.translate.use(language);
      });
  }

  /**
   * Method for change side bar
   * @memberof MainService
   */

  changePositionSideBar(): void {
    this.closeSideBar = !this.closeSideBar;
  }
}
