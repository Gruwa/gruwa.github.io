import {Component} from '@angular/core';
import {NoDataTextSizes, NoDataTypes, NoDataCircleSizes} from '../no-data.component';

@Component({
  selector: 'cad-examples-no-data',
  template: require('./examples-no-data.html')
})
export class ExamplesNoDataComponent {
  message = 'Select Products First';
  icon = 'no-line';
  circleSize: NoDataCircleSizes = 'default';
  type: NoDataTypes = 'default'; // tslint:disable-line
  textSize: NoDataTextSizes = 'default';
}
