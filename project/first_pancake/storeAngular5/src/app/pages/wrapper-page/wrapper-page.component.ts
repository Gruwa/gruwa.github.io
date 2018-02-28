import {Component, OnInit, OnDestroy, ChangeDetectorRef, AfterViewChecked} from '@angular/core';
import {Router} from '@angular/router';
import {MainService} from '../../shared/services/main.service';
import {TranslateService} from '@ngx-translate/core';
import {AuthService} from '../../shared/services';

@Component({
  selector: 'app-wrapper-page',
  templateUrl: './wrapper-page.component.html',
  styleUrls: ['./wrapper-page.component.scss']
})
export class WrapperPageComponent implements OnInit, OnDestroy, AfterViewChecked {

  /**
   * Variable for visibleLogin
   * @type {boolean}
   * @memberof WrapperPageComponent
   */

  public visibleLogin: boolean = true;

  /**
   * Variable for visibleContent
   * @type {boolean}
   * @memberof WrapperPageComponent
   */

  public visibleContent: boolean = false;

  /**
   * Variable for loading
   * @type {boolean}
   * @memberof WrapperPageComponent
   */

  public loading: boolean = false;

  /**
   * Creates an instance of WrapperPageComponent.
   * @param {TranslateService} translate
   * @param {Router} router
   * @param {AuthService} authService
   * @param {MainService} mainService
   * @param {ChangeDetectorRef} changeDetector
   * @memberof WrapperPageComponent
   */

  constructor(public router: Router,
              public mainService: MainService,
              public translate: TranslateService,
              private authService: AuthService,
              private changeDetector: ChangeDetectorRef) {
  }

  /**
   * Method ngOnInit
   * @returns {void}
   * @memberof WrapperPageComponent
   */

  ngOnInit(): void {
    this.mainService.setLanguage('en');
    this.authService.stateLogin$.subscribe(this.stateLogin.bind(this));
    this.mainService.loader$.subscribe(event => this.loaderChange(event));
  }

  /**
   * Method for change detection in loader$
   * @returns {void}
   * @memberof WrapperPageComponent
   */

  ngAfterViewChecked(): void {
    this.changeDetector.detectChanges();
  }

  /**
   * Method for loader change
   * @param {boolean} value
   * @returns {void}
   * @memberof WrapperPageComponent
   */

  loaderChange(value: boolean): void {
    this.loading = value;
  }

  /**
   * Method for control of steLogin
   * @param {boolean} eventData
   * @returns {void}
   * @memberof WrapperPageComponent
   */

  stateLogin(eventData: boolean): void {
    this.visibleContent = eventData;
    this.visibleLogin = !eventData;
  }

  /**
   * Method for control visible
   * @param {boolean} data
   * @returns {void}
   * @memberof WrapperPageComponent
   */

  visibleModal(data: boolean): void {
    this.visibleLogin = data;
  }

  /**
   * Method for clean flow
   * @returns {void}
   * @memberof WrapperPageComponent
   */

  ngOnDestroy(): void {
    this.authService.stateLogin$.unsubscribe();
    this.mainService.loader$.unsubscribe();
  }

}
