import {Component, EventEmitter, Input, Output} from '@angular/core';

/**
 * Main List Component
 */

@Component({
  selector: 'app-main-list',
  templateUrl: './main-list.component.html',
  styleUrls: ['./main-list.component.scss']
})
export class MainListComponent {

  /**
   * Input data of list
   * @memberof MainListComponent
   */

  @Input() list;

  /**
   * Output action from list
   * @memberof MainListComponent
   */

  @Output() outputActionMethod = new EventEmitter();

  /**
   * Method clickEvent for emit click
   * @returns {void}
   * @memberof MainListComponent
   */

  clickEvent(value: any): void {
    this.outputActionMethod.emit(value);
  }

}
