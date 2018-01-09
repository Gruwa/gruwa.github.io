import {Component} from '@angular/core';

@Component({
  selector: 'cad-examples-spinner',
  template: require('./examples-spinner.html')
})
export class ExamplesSpinnerComponent {
  size = 'big';
  color = 'primary';
  type = 'cadreon'; // tslint:disable-line
}
