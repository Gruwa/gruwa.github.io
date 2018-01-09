import {Component} from '@angular/core';

@Component({
  selector: 'cad-examples-tile',
  template: require('./examples-tile.html')
})
export class ExamplesTileComponent {
  width = 236;
  height = 259;
  numTiles = 2;
  sideSpace = 0;
  bottomSpace = 10;
  customClass = 'custom-class';

  get tilesIds() {
    return _.range(this.numTiles);
  }
}
