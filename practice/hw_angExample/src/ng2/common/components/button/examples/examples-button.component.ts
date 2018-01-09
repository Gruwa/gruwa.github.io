import {Component} from '@angular/core';

@Component({
  selector: 'cad-examples-button',
  template: require('./examples-button.html')
})
export class ExamplesButtonComponent {
  isSmall = false;
  isWide = false;
  isDisabled = false;
  isSpinner = false;
  btnView = 'primary';
  btnText = 'Lorem ipsum';
  btnIcon = '';
}
