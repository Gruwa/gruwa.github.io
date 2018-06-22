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
  }

  /**
   * Method ngOnInit
   * @returns {void}
   * @memberof AppComponent
   */

  public ngOnInit(): void {
    this.flowService.dataSpinner$.pipe(
      takeUntil(this.ngUnsubscribe),
      debounceTime(500)
    ).subscribe(this.spinnerShow.bind(this));
    this.flowService.dataSideBar$.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(this.sideBarShow.bind(this));

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
      }
    });
    this.localStorage.observe('user').pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((value) => {
      if (value) {
        this.accountDescription = value;
      }
    });
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
   * @param {any} $event
   * @memberof AppComponent
   */

  private sideBarShow($event?: any): void {
    this.sideBar.toggle();
    if (this.arrow) {
      this.arrow = !this.arrow;
    }
    this.flowService.dataSideBarGroupRestaurants$.next(false);
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
