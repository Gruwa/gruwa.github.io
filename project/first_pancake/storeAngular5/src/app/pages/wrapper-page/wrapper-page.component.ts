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

  public visibleLogin: boolean = true;
  public visibleRegister: boolean = false;
  public visibleContent: boolean = false;
  public loading: boolean = false;

  constructor(public router: Router,
              public mainService: MainService,
              public translate: TranslateService,
              private authService: AuthService,
              private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.mainService.setLanguage('en');
    this.authService.stateLogin$.subscribe(this.stateLogin.bind(this));
    this.mainService.loader$.subscribe(event => this.loaderChange(event));
  }

  /**
   * Method for change detection in loader$
   */

  ngAfterViewChecked(): void {
    this.changeDetector.detectChanges();
  }

  /**
   * Method for loader change
   */

  loaderChange(value: boolean): void {
    this.loading = value;
  }

  /**
   * Method for control of steLogin
   */

  stateLogin(eventData: boolean): void {
    this.visibleContent = eventData;
    this.visibleLogin = !eventData;
  }

  /**
   * Method for control visible
   */

  visibleModal(data: boolean): void {
    this.visibleLogin = data;
  }

  /**
   * Method for clean flow
   */

  ngOnDestroy(): void {
    this.authService.stateLogin$.unsubscribe();
    this.mainService.loader$.unsubscribe();
  }

}
