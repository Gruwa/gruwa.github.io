import {
  Component,
  OnDestroy,
  OnInit, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {FlowService} from './shared/services/flow.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
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

  ngOnInit(): void {
    this.flowService.dataSpinner$.pipe(
      takeUntil(this.ngUnsubscribe)
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

  spinnerShow(event: boolean): void {
    this.spinner = event;
  }

  /**
   * Method ngOnDestroy
   * @returns {void}
   * @memberof AppComponent
   */

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  sideBarShow(event?: any) {
      this.sideBar.toggle();
  }

}
