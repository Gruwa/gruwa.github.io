import {Component, Input} from '@angular/core';

@Component({
  selector: 'cad-link',
  template: require('./link.html'),
  styles: [require('./link.scss')]
})
export class LinkComponent {
  @Input() type: string; // tslint:disable-line
  @Input() icon: string;
  @Input() value: string;
  @Input() href: string;
  @Input() target: string;
  @Input() iconRight: boolean;
  @Input() disabled: boolean = false;

  onClick(event: MouseEvent) {
    // don't bubble up event to avoid triggering "(click)" on host element
    if (this.disabled) {
      event.stopPropagation();
    }
  }
}
