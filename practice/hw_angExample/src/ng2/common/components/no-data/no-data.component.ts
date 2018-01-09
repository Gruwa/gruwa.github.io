import {Component, Input} from '@angular/core';
export type NoDataTypes = 'default' | 'white';
export type NoDataTextSizes = 'default' | 'small';
export type NoDataCircleSizes = 'default' | 'big';

@Component({
  selector: 'cad-no-data',
  template: require('./no-data.html'),
  styles: [require('./no-data.scss')]
})
export class NoDataComponent {
  @Input() message: string = '';
  @Input() icon: string = 'no-line';
  @Input() circleSize: NoDataCircleSizes = 'default';
  @Input() type: NoDataTypes = 'default'; // tslint:disable-line
  @Input() textSize: NoDataTextSizes = 'default';
}
