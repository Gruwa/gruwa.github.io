import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})
export class FormInputComponent {

  /**
   * Variable for form-input type
   * @type {string}
   * @memberof InputComponent
   */

  @Input() type: string = 'text';

  /**
   * Variable for form-input required
   * @type {boolean}
   * @memberof InputComponent
   */

  @Input() required: boolean = true;

  /**
   * Variable for form-input placeholder
   * @type {string}
   * @memberof InputComponent
   */

  @Input() placeholder: string = '';

  /**
   * Variable for form-input control
   * @type {FormControl}
   * @memberof InputComponent
   */

  @Input() control: FormControl;

  /**
   * Variable for form-input label
   * @type {string}
   * @memberof InputComponent
   */

  @Input() label: string = '';

  /**
   * Variable for form-input readonly
   * @type {boolean}
   * @memberof InputComponent
   */

  @Input() readonly: boolean = false;

}
