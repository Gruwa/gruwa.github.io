import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'cad-button',
  template: require('./button.html'),
  styles: [require('./button.scss')],
  host: {
    '[style.display]': 'wide ? "flex" : "inline-flex"'
  }
})
export class ButtonComponent {
  @Input() view: string;
  @Input() wide: boolean;
  @Input() small: boolean;
  @Input() icon: string;
  @Input() text: string;
  @Input() type: string = 'button'; // tslint:disable-line
  @Input() disabled: boolean;
  @Input() hidden: boolean; // workaroung to hide button via ng2 common [hidden] binding
  @Input() showSpinner: boolean;
  @Output() onClick = new EventEmitter();

  // keep [size] for backward compatibility
  @Input() set size(value: string) {
    this.small = value === 'small';
  }
}
