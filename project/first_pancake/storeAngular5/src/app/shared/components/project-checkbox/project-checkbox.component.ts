import {
  Component, ViewEncapsulation, Input
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-project-checkbox',
  template: `
    <div class="group-checkbox">
      <input type="checkbox" [id]="'checkbox-' + time" [formControl]="control" [name]="label + time"/>
      <label [for]="'checkbox-' + time">{{ label }}</label>
    </div>
    `,
  styleUrls: ['./project-checkbox.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectCheckboxComponent {

  /**
   * Variable for input label
   * @type {string}
   * @memberof ProjectCheckboxComponent
   */

  @Input() label: string = '';

  /**
   * Variable for input control
   * @type {FormControl}
   * @memberof ProjectCheckboxComponent
   */

  @Input() control: FormControl = new FormControl(false, []);

  /**
   * Variable for input time
   * @type {any}
   * @memberof ProjectCheckboxComponent
   */

  public time: any;

  /**
   * Creates an instance of ProjectCheckboxComponent.
   * @memberof ProjectCheckboxComponent
   */

  constructor() {
    this.time = +new Date() + (Math.random() * 100 - 1);
  }
}
