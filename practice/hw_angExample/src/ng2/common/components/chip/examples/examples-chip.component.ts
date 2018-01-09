import {Component} from '@angular/core';
import {ChipColor, ChipSize, ChipType} from '../chip.component';

@Component({
  selector: 'cad-examples-chip',
  template: require('./examples-chip.html'),
  styles: [require('./examples-chip.component.scss')]
})
export class ExamplesChipComponent {
  size: ChipSize = 'default';
  color: ChipColor = 'default';
  type: ChipType = 'default'; // tslint:disable-line
  errorMessage = '';
  text = 'Some text for chip component';
  backgroundColor: string = '#fe561f';

  delete() {
    alert('delete'); // tslint:disable-line
  }
}
