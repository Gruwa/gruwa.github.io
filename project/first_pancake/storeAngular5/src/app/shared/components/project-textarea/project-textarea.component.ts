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

  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() compulsory: boolean = false;
  @Input() withBorder: boolean = false;
  @Input() newClass: string = '';
  @Input() rows: number = 3;
  @Input() control: FormControl = new FormControl('', []);
}
