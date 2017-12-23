import {
  Component, EventEmitter, OnInit, ViewEncapsulation, Input, Output
} from '@angular/core';

@Component({
  selector: 'app-projectl-button',
  template: `
    <button [disabled]="disabled"
            [type]="type"
            class="portal__btn"
            [ngClass]="{'portal__btn__cancel': cancel, 'portal__btn__fullwidth': fullWidth}"
            (click)="onClickEvent.emit($event)">
      {{ title }}
    </button>`,
  styleUrls: ['./projectl-button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectButtonComponent implements OnInit {

  @Input() type: string = 'button';
  @Input() disabled: boolean = false;
  @Input() title: string = '';
  @Input() cancel: boolean = false;
  @Input() fullWidth: boolean = false;
  @Output() onClickEvent: EventEmitter<any> = new EventEmitter<any>();
  constructor() {
  }

  ngOnInit() {

  }

}
