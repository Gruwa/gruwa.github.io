import {
  ChangeDetectionStrategy,
  Component, EventEmitter,
  Input, Output
} from '@angular/core';
import {FormControl} from '@angular/forms';

/**
 * Form Date Component
 */

@Component({
  selector: 'app-form-date',
  templateUrl: './form-date.component.html',
  styleUrls: ['./form-date.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormDateComponent {

  /**
   * Variable for form-date type
   * @type {string}
   * @memberof FormDateComponent
   */

  @Input() type: string = 'text';

  /**
   * Variable for form-date required
   * @type {boolean}
   * @memberof FormDateComponent
   */

  @Input() required: boolean = true;

  /**
   * Variable for form-date placeholder
   * @type {string}
   * @memberof FormDateComponent
   */

  @Input() placeholder: string = '';

  /**
   * Variable for form-date control
   * @type {FormControl}
   * @memberof FormDateComponent
   */

  @Input() control: FormControl;

  /**
   * Variable for form-date label
   * @type {string}
   * @memberof FormDateComponent
   */

  @Input() label: string = '';

  /**
   * Variable for form-date readonly
   * @type {boolean}
   * @memberof FormDateComponent
   */

  @Input() readonly: boolean = false;

  /**
   * Output action from form select
   * @memberof FormDateComponent
   */

  @Output() outputActionMethod: EventEmitter<any> = new EventEmitter();

  /**
   * Method selectionChange
   * @returns {void}
   * @memberof FormDateComponent
   */

  public selectionChange(event: string): void {
    this.outputActionMethod.emit(event);
  }
}
