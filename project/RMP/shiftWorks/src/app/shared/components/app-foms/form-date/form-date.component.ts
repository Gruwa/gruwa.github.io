import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-form-date',
  templateUrl: './form-date.component.html',
  styleUrls: ['./form-date.component.scss']
})
export class FormDateComponent implements OnInit {

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

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  constructor() { }

  ngOnInit() {
    console.log(this.date);
  }

}
