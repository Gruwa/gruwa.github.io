import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
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

/**
 * App Component
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {

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
   * Variable of sideBar
   * @type {MatSidenav}
   * @memberof AppComponent
   */

  @ViewChild('sidebar') sideBar: MatSidenav;

  /**
   * Creates an instance of AppComponent
   * @param {FlowService} flowService
   * @param {GoogleAnalyticsService} googleAnalyticsService
   * @memberof AppComponent
   */

  constructor(public flowService: FlowService,
              private googleAnalyticsService: GoogleAnalyticsService) {
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
   * @param {any} event
   * @memberof AppComponent
   */

  private sideBarShow(event?: any): void {
    this.sideBar.toggle();
    this.flowService.dataSideBarGroupRestaurants$.next(false);
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
