import {Component, Input} from '@angular/core';

@Component({
  selector: 'cad-input-group',
  template: require('./input-group.html'),
  styles: [require('./input-group.scss')]
})
export class InputGroupComponent {
  @Input() addon: string;
  @Input() size: 'large' | 'small' = 'large';
}
