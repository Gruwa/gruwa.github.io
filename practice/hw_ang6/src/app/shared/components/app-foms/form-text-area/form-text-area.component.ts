import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-form-text-area',
  templateUrl: './form-text-area.component.html',
  styleUrls: ['./form-text-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormTextAreaComponent {

  /**
   * Variable for form-input type
   * @type {string}
   * @memberof FormInputComponent
   */

  @Input() type: string = 'text';

  /**
   * Variable for form-input required
   * @type {boolean}
   * @memberof FormInputComponent
   */

  @Input() required: boolean = true;

  /**
   * Variable for form-input placeholder
   * @type {string}
   * @memberof FormInputComponent
   */

  @Input() placeholder: string = '';

  /**
   * Variable for form-input control
   * @type {FormControl}
   * @memberof FormInputComponent
   */

  @Input() control: FormControl;

  /**
   * Variable for form-input label
   * @type {string}
   * @memberof FormInputComponent
   */

  @Input() label: string = '';

  /**
   * Variable for form-input readonly
   * @type {boolean}
   * @memberof FormInputComponent
   */

  @Input() readonly: boolean = false;

  /**
   * Output action from form select
   * @memberof FormInputComponent
   */

  @Output() outputActionMethod: EventEmitter<any> = new EventEmitter();

  /**
   * Method selectionChange
   * @returns {void}
   * @memberof FormInputComponent
   */

  public selectionChange(event: string): void {
    this.control.statusChanges.subscribe(val => {
      this.outputActionMethod.emit(val);
    });
  }
}
