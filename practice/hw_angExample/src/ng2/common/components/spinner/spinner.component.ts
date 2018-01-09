import {Component, Input} from '@angular/core';

type SpinnerColor = 'primary' | 'blue' | 'white';
type SpinnerSize = 'big' | 'medium' | 'small';
type SpinnerType = 'cadreon' | 'ring';

@Component({
  selector: 'cad-spinner',
  template: require('./spinner.html'),
  styles: [require('./spinner.scss')]
})
export class SpinnerComponent {
  /**
   * Spinner color
   *
   * @type {SpinnerColor}
   */
  @Input() color: SpinnerColor = 'primary';

  /**
   * Spinner Size
   *
   * @type {SpinnerSize}
   */
  @Input() size: SpinnerSize = 'big';

  /**
   * Spinner Type (2 ring - "cadreon", 1 ring - "ring")
   *
   * @type {SpinnerType}
   */
  @Input() type: SpinnerType = 'cadreon'; // tslint:disable-line

  /**
   * Spinner size
   */
  @Input() width: number;

  /**
   * Spinner border size
   */
  @Input() borderWidth: number;
}
