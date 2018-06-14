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
   * @memberof AppComponent
   */

  constructor(public flowService: FlowService) {
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
   * Method ngOnDestroy
   * @returns {void}
   * @memberof AppComponent
   */

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
