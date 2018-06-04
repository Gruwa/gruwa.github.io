import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormInputComponent {

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

}
