import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

/**
 * Main List Component
 */

@Component({
  selector: 'app-main-list',
  templateUrl: './main-list.component.html',
  styleUrls: ['./main-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainListComponent {

  /**
   * Input data of lists
   * @memberof MainListComponent
   */

  @Input() lists;
  @Input() activeItem: string;

  /**
   * Input data of done
   * @type {string}
   * @memberof MainListComponent
   */

  @Input() done: string;

  /**
   * Output action from list
   * @type {EventEmitter<any>}
   * @memberof MainListComponent
   */

  @Output() outputActionMethod: EventEmitter<any> = new EventEmitter();

  /**
   * Method clickEvent for emit click
   * @returns {void}
   * @param {any} value
   * @memberof MainListComponent
   */

  public clickEvent(value: any): void {
    this.outputActionMethod.emit(value);
  }

}
