import {Component, Input} from '@angular/core';

@Component({
  selector: 'cad-icon',
  template: require('./icon.html'),
  styles: [require('./icon.scss')]
})
export class IconComponent {
  @Input() name: string;
  @Input() customClass: string;
  @Input() width: string;
  @Input() height: string;
  @Input() fill: string;
}
