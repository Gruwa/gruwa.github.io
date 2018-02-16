import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-project-button',
  templateUrl: './project-button.component.html',
  styleUrls: ['./project-button.component.scss']
})
export class ProjectButtonComponent implements OnInit {

  @Input() newStyle: string = '';
  @Input() type: string = 'button';
  @Input() ifLabel: boolean = false;
  @Input() iconName: string = '';
  @Input() disabled: boolean = false;
  @Input() title: string = '';
  @Input() cancel: boolean = false;
  @Output() onClickEvent: EventEmitter<any> = new EventEmitter<any>();

  classes: string = '';

  constructor(public translate: TranslateService) {
  }

  ngOnInit() {
    this.getClass();
  }

  getClass() {
    this.classes = this.newStyle;

    if (this.cancel) {
      this.classes += ' ' + 'project-btn--cancel';
    }
  }
}
