import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FlowService} from './shared/services/flow.service';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

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
    this.flowService.dataSpinner$.takeUntil(this.ngUnsubscribe).subscribe(this.spinnerShow.bind(this));
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
}
