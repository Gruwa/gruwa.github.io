import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'cad-tile',
  template: require('./tile.html'),
  styles: [require('./tile.scss')]
})
export class TileComponent {
  /**
   * Tile width in px
   */
  @Input() width: number;

  /**
   * Tile height in px
   */
  @Input() height: number;

  /**
   * Left and Right tile margin in px
   * Actually could be managed by parent element with (display: flex; and justify-content: space-between)
   */
  @Input() sideSpace: number;

  /**
   * Bottom tile margin in px
   *
   */
  @Input() bottomSpace: number;

  /**
   * Custom class specific to Tile
   */
  @Input() customClass: string;
}
