import {Component} from '@angular/core';

@Component({
  selector: 'cad-examples-tile-icon',
  template: require('./examples-tile-icon.html')
})
export class ExamplesTileIconComponent {
  numTiles = 2;
  icon = 'committed-reports';
  title = 'User Management';
  // state: '@',
  customClass = 'custom-tile-class';

  get tilesIds() {
    return _.range(this.numTiles);
  }

}
