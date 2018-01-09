import {Component, Input} from '@angular/core';

@Component({
  selector: 'cad-tile-icon',
  template: require('./tile-icon.html'),
  styles: [require('./tile-icon.scss')]
})
export class TileIconComponent {
  /**
   * icon name for tile
   */
  @Input() icon: string;

  /**
   * tile title
   */
  @Input() title: string;

  /**
   * Custom class for tile
   */
  @Input() customClass: string;
}
