import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss']
})
export class FormSelectComponent implements OnInit {

  /**
   * Variable for form-select type
   * @type {string}
   * @memberof FormSelectComponent
   */

  @Input() type: string = 'text';

  /**
   * Variable for form-select required
   * @type {boolean}
   * @memberof FormSelectComponent
   */

  @Input() required: boolean = true;

  /**
   * Variable for form-select placeholder
   * @type {string}
   * @memberof FormSelectComponent
   */

  @Input() placeholder: string = '';

  /**
   * Variable for form-select control
   * @type {FormControl}
   * @memberof FormSelectComponent
   */

  @Input() control: FormControl;

  /**
   * Variable for form-select label
   * @type {string}
   * @memberof FormSelectComponent
   */

  @Input() label: string = '';

  /**
   * Variable for form-select readonly
   * @type {boolean}
   * @memberof FormSelectComponent
   */

  @Input() readonly: boolean = false;

  /**
   * Variable for form-select elements
   * @type {Array<object>}
   * @memberof FormSelectComponent
   */

  @Input() elements: Array<object>;

  constructor() { }

  ngOnInit() {
  }

}
