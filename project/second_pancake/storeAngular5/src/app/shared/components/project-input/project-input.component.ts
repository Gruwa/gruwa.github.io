import {Component, Input, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-project-input',
  templateUrl: './project-input.component.html',
  styleUrls: ['./project-input.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectInputComponent {

  /**
   * Variable for input type
   * @type {string}
   * @memberof ProjectInputComponent
   */

  @Input() type: string = 'text';

  /**
   * Variable for input compulsory
   * @type {boolean}
   * @memberof ProjectInputComponent
   */

  @Input() compulsory: boolean = true;

  /**
   * Variable for input placeholder
   * @type {string}
   * @memberof ProjectInputComponent
   */

  @Input() placeholder: string = '';

  /**
   * Variable for input control
   * @type {FormControl}
   * @memberof ProjectInputComponent
   */

  @Input() control: FormControl;

  /**
   * Variable for input label
   * @type {string}
   * @memberof ProjectInputComponent
   */

  @Input() label: string = '';

  /**
   * Variable for input readonly
   * @type {boolean}
   * @memberof ProjectInputComponent
   */

  @Input() readonly: boolean = false;

  /**
   * Variable for input bottom
   * @type {number}
   * @memberof ProjectInputComponent
   */

  @Input() bottom: number = 10;

  /**
   * Variable for input top
   * @type {number}
   * @memberof ProjectInputComponent
   */

  @Input() top: number = 0;

  /**
   * Variable for input showLock
   * @type {boolean}
   * @memberof ProjectInputComponent
   */

  @Input() showLock: boolean = true;

  /**
   * Creates an instance of ProjectInputComponent.
   * @param {TranslateService} translate
   * @memberof ProjectInputComponent
   */

  constructor(public translate: TranslateService) { }
}
