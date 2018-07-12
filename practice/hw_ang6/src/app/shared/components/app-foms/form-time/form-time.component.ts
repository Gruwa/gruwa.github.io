import {
  ChangeDetectionStrategy,
  Component, EventEmitter,
  Input, Output
} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-form-time',
  templateUrl: './form-time.component.html',
  styleUrls: ['./form-time.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormTimeComponent {

  /**
   * Variable for form-input type
   * @type {string}
   * @memberof FormTimeComponent
   */

  @Input() type: string = 'text';

  /**
   * Variable for form-input required
   * @type {boolean}
   * @memberof FormTimeComponent
   */

  @Input() required: boolean = true;

  /**
   * Variable for form-input placeholder
   * @type {string}
   * @memberof FormTimeComponent
   */

  @Input() placeholder: string = '';

  /**
   * Variable for form-input control
   * @type {FormControl}
   * @memberof FormTimeComponent
   */

  @Input() control: FormControl;

  /**
   * Variable for form-input label
   * @type {string}
   * @memberof FormTimeComponent
   */

  @Input() label: string = '';

  /**
   * Variable for form-input readonly
   * @type {boolean}
   * @memberof FormTimeComponent
   */

  @Input() readonly: boolean = false;

  /**
   * Output action from form select
   * @memberof FormTimeComponent
   */

  @Output() outputActionMethod: EventEmitter<any> = new EventEmitter();

  /**
   * Method selectionChange
   * @returns {void}
   * @memberof FormTimeComponent
   */

  public selectionChange(event: string): void {
    this.outputActionMethod.emit(event);
  }
}
