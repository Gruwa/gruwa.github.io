import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-project-textarea',
  template: `
    <div class="project-textarea" [ngClass]="{'error' : control && (control.dirty || control.touched) && control.invalid}">
      <div class="group">
        <textarea name="{{ label }}" id="" 
                  [ngClass]="{'empty': control.value?.length === 0, 'with-border': withBorder}" class="{{ newClass }}"
                  [formControl]='control' cols="30" rows="rows" [placeholder]="placeholder"></textarea>
        <span class="highlight"></span>
        <span class="bar"></span>
      </div>
    </div>
  `,
  styleUrls: ['./project-textarea.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectTextareaComponent {

  /**
   * Variable for input label
   * @type {string}
   * @memberof ProjectTextareaComponent
   */

  @Input() label: string = '';

  /**
   * Variable for input placeholder
   * @type {string}
   * @memberof ProjectTextareaComponent
   */

  @Input() placeholder: string = '';

  /**
   * Variable for input compulsory
   * @type {boolean}
   * @memberof ProjectTextareaComponent
   */

  @Input() compulsory: boolean = false;

  /**
   * Variable for input withBorder
   * @type {boolean}
   * @memberof ProjectTextareaComponent
   */

  @Input() withBorder: boolean = false;

  /**
   * Variable for input newClass
   * @type {string}
   * @memberof ProjectTextareaComponent
   */

  @Input() newClass: string = '';

  /**
   * Variable for input rows
   * @type {number}
   * @memberof ProjectTextareaComponent
   */

  @Input() rows: number = 3;

  /**
   * Variable for input control
   * @type {FormControl}
   * @memberof ProjectTextareaComponent
   */

  @Input() control: FormControl = new FormControl('', []);
}
