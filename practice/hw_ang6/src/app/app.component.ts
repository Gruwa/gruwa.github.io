import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {FlowService} from './shared/services/flow.service';
import {Subject} from 'rxjs';
import {
  debounceTime,
  takeUntil
} from 'rxjs/operators';
import {MatSidenav} from '@angular/material';
import {GoogleAnalyticsService} from './shared/services/google-analytics.service';
import {environment} from '../environments/environment';
import {LocalStorageService} from 'ngx-webstorage';
import * as version from './shared/services/version';

/**
 * App Component
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  /**
   * Variable of spinner
   * @type {boolean}
   * @memberof ShiftsComponent
   */

  public iconLeft: string = 'arrow_back';

  /**
   * Variable of img
   * @type {object}
   * @memberof ShiftsComponent
   */

  public img: object;

  /**
   * Variable of items
   * @type {Array<object>}
   * @memberof ShiftsComponent
   */

  public items: Array<object>;

  /**
   * Variable currentYear
   * @type {number}
   * @memberof AppComponent
   */

  public currentYear: number = (new Date()).getFullYear();

  /**
   * Variable currentVersion
   * @type {string}
   * @memberof AppComponent
   */

  public currentVersion: string = version.VERSION['version'];

  /**
   * Variable arrow
   * @type {boolean}
   * @memberof AppComponent
   */

  public arrow: boolean = false;

  /**
   * Variable spinner
   * @type {boolean}
   * @memberof AppComponent
   */

  public spinner: boolean = false;

  /**
   * Variable of ngUnsubscribe
   * @type {Subject<void>}
   * @memberof AppComponent
   */

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  /**
   * Variable of roomDescription
   * @type {string}
   * @memberof AppComponent
   */

  public roomDescription: string;

  /**
   * Variable of accountDescription
   * @type {string}
   * @memberof AppComponent
   */

  public accountDescription: string;

  /**
   * Variable of sideBar
   * @type {MatSidenav}
   * @memberof AppComponent
   */

  @ViewChild('sidebar') sideBar: MatSidenav;

  /**
   * Creates an instance of AppComponent
   * @param {FlowService} flowService
   * @param {GoogleAnalyticsService} googleAnalyticsService
   * @param {LocalStorageService} localStorage
   * @memberof AppComponent
   */

  constructor(public flowService: FlowService,
              private googleAnalyticsService: GoogleAnalyticsService,
              private localStorage: LocalStorageService) {
    this.appendGaTrackingCode();
    console.info('Version of Shiftworks', version.VERSION);
  }

  /**
   * Method ngOnInit
   * @returns {void}
   * @memberof AppComponent
   */

  public ngOnInit(): void {
    this.flowService.dataSpinner$.pipe(
      takeUntil(this.ngUnsubscribe),
      debounceTime(50)
    ).subscribe(this.spinnerShow.bind(this));
    this.flowService.dataSpinner$.next(true);
    this.flowService.dataSideBar$.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(this.sideBarShow.bind(this));
    this.flowService.dataSideBarClose$.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(() => {
      this.sideBar.close();
    });

    if (this.localStorage.retrieve('group')) {
      this.roomDescription = this.localStorage.retrieve('group').description;
    }
    if (this.localStorage.retrieve('user')) {
      this.accountDescription = this.localStorage.retrieve('user');
    }

    this.localStorage.observe('group').pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((value) => {
      if (value) {
        this.roomDescription = value.description;
        this.initHeader();
      }
    });
    this.localStorage.observe('user').pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((value) => {
      if (value) {
        this.accountDescription = value;
        this.initHeader();
      }
    });
    this.initHeader();
  }

  /**
   * Method initHeader
   * @returns {void}
   * @memberof AppComponent
   */

  private initHeader(): void {
    this.img = {
      url: 'assets/images/SWLogo.svg',
      class: 'header__logo'
    };
    this.items = [
      {
        iconLeft: 'account_circle',
        description: this.accountDescription
      },
      {
        iconLeft: 'room',
        description: this.roomDescription,
        iconRight: 'keyboard_arrow_up',
        iconRightSecond: 'keyboard_arrow_down',
        id: 'groupRestaurants'
      }
    ];
  }

  /**
   * Method fo show spinner
   * @returns {void}
   * @param {boolean} event
   * @memberof AppComponent
   */

  private spinnerShow(event: boolean): void {
    this.spinner = event;
  }

  /**
   * Method fo show sideBar
   * @returns {void}
   * @param {string} event
   * @memberof AppComponent
   */

  public sideBarShow(event?: string): void {
    if (event === 'iconLeft') {
      this.sideBar.toggle();

      // if (this.arrow) {
      //   this.arrow = !this.arrow;
      // }
      this.arrow = false;
      this.flowService.dataSideBarGroupRestaurants$.next(false);
    }
    if (event === 'groupRestaurants') {
      this.arrow = !this.arrow;
      this.flowService.dataSideBarGroupRestaurants$.next(this.arrow);
    }
  }

  /**
   * Method fo show list Bar
   * @returns {void}
   * @param {any} $event
   * @memberof AppComponent
   */

  public listBarShow($event: any): void {
    this.arrow = !this.arrow;
    this.flowService.dataSideBarGroupRestaurants$.next(this.arrow);
  }

  /**
   * Method appendGaTrackingCode
   * @returns {void}
   * @memberof AppComponent
   */

  private appendGaTrackingCode(): void {
    try {
      const script = document.createElement('script');
      script.innerHTML = `
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

        ga('create', '` + environment.googleAnalyticsKey + `', 'auto');
      `;
      document.head.appendChild(script);
    } catch (ex) {
      console.error('Error appending google analytics');
      console.error(ex);
    }
  }

  /**
   * Method ngOnDestroy
   * @returns {void}
   * @memberof AppComponent
   */

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
