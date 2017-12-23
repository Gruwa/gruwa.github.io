import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-portal-input',
  template: `
    <div class="group-input" [ngClass]="{'error' : control && (control.dirty || control.touched) && control.invalid}" 
         [ngStyle]="{'margin-bottom': bottom + 'px', 'margin-top': top + 'px'}">
      <input [type]="type" [required]="compulsory" [placeholder]="placeholder"
             [readonly]="readonly" [formControl]="control">
      <span class="highlight"></span>
      <span class="bar"></span>
      <label>{{ label }}<span *ngIf="compulsory" class="input_label-star"> *</span></label>
      <span class="lock" *ngIf="type === 'password' && showLock"><img src="/assets/images/locked.svg" alt=""></span>
    </div>
  `,
  styleUrls: ['./portal-input.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PortalInputComponent implements OnInit {

  @Input() type: string = 'text';
  @Input() compulsory: boolean = true;
  @Input() placeholder: string = '';
  @Input() control: FormControl;
  @Input() label: string = '';
  @Input() readonly: boolean = false;
  @Input() bottom: number = 18;
  @Input() top: number = 18;
  @Input() showLock: boolean = true;
  constructor() { }

  ngOnInit() {
  }

}
