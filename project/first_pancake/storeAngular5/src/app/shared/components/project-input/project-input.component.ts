import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-project-input',
  templateUrl: './project-input.component.html',
  styleUrls: ['./project-input.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectInputComponent implements OnInit {

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
