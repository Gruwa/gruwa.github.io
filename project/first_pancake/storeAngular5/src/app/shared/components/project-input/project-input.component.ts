import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

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
  @Input() bottom: number = 10;
  @Input() top: number = 0;
  @Input() showLock: boolean = true;

  constructor(public translate: TranslateService) {
  }

  ngOnInit() {
  }

}
