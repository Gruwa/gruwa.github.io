import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';

/**
 * Interface for selecting options
 */

export interface SelectOption {

  /**
   * Variable contain name
   * @type {string}
   * @memberof SelectOption
   */

  name: string;

  /**
   * Variable contain value
   * @type {any}
   * @memberof SelectOption
   */

  value: any;
}

@Component({
  selector: 'app-project-select',
  template: `    
    <div class="project-select">
      <select class="project-select__select" [ngClass]="{'selected': control.value.length > 0}"
         [formControl]="control">
        <option value="" selected disabled *ngIf="placeholder">{{ placeholder }}</option>
        <option *ngFor="let option of options"
                [value]="option.value">
          {{option.name}}
        </option>
      </select>
      <span class="highlight"></span>
      <span class="bar"></span>
    </div>
  `,
  styleUrls: ['./project-select.component.scss'],
})
export class ProjectSelectComponent {

  /**
   * Variable for input label
   * @type {string}
   * @memberof ProjectSelectComponent
   */

  @Input() label: string = '';

  /**
   * Variable for input placeholder
   * @type {string}
   * @memberof ProjectSelectComponent
   */

  @Input() placeholder: string = '';

  /**
   * Variable for input compulsory
   * @type {boolean}
   * @memberof ProjectSelectComponent
   */

  @Input() compulsory: boolean = true;

  /**
   * Variable for input control
   * @type {FormControl}
   * @memberof ProjectSelectComponent
   */

  @Input() control: FormControl = new FormControl('', []);

  /**
   * Variable for input options
   * @type {Array<SelectOption>}
   * @memberof ProjectSelectComponent
   */

  @Input() options: Array<SelectOption>;
}
