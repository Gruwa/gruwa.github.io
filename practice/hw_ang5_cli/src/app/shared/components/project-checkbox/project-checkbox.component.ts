import {
  Component, EventEmitter, ViewEncapsulation, Input, Output, OnInit
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

  @Input() label: string = '';
  @Input() control: FormControl = new FormControl(false, []);
  public time;

  constructor() {
    this.time = +new Date() + (Math.random() * 100 - 1);
  }
}
