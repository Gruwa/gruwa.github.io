import {Component, Input} from '@angular/core';

export type StatusSizes = 'default' | 'small' | 'big' | 'huge' | 'only-icon';

/**
 * @description
 *
 * Component for displaying status label with appropriate icon
 */
@Component({
  selector: 'cad-status',
  template: require('./status.component.html'),
  styles: [require('./status.component.scss')]
})
export class StatusComponent {
  /**
   * Status key value
   */
  @Input() value: string;
  /**
   * Prefix for defining additional translate section
   */
  @Input() prefix: string;
  /**
   * Status size for defining font-size
   */
  @Input() size: StatusSizes = 'default';
}
