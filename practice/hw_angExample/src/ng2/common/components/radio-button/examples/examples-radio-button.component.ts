import {Component} from '@angular/core';
import {RadioButtonDirection} from '../radio-button-group.component';

@Component({
  selector: 'cad-examples-radio-button',
  template: require('./examples-radio-button.html')
})
export class ExamplesRadioButtonComponent {
  isDisabledAll = false;
  isDisabledFirst = false;
  radioValue: string = 'test2';
  buttonDirection: RadioButtonDirection = 'in-row';

  changeRadioButtonGroup(value: string) {
    console.log(`Radio button is changed to ${value}`); // tslint:disable-line
  }

  changeRadioButton(value: any) {
    console.log(`changed to ${value}`); // tslint:disable-line
  }
}
