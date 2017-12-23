import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';

export interface SelectOption {
  name: string;
  value: any;
}

@Component({
  selector: 'app-portal-select',
  template: `    
    <div class="portal-select">
      <select class="portal-select__select" [ngClass]="{'selected': control.value.length > 0}"
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
  styleUrls: ['./portal-select.component.scss'],
})
export class PortalSelectComponent {

  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() compulsory: boolean = true;
  @Input() control: FormControl = new FormControl('', []);
  @Input() options: Array<SelectOption>;
}
