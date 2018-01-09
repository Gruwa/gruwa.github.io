import {Component} from '@angular/core';

@Component({
  selector: 'cad-examples-button-toggle',
  template: require('./examples-button-toggle.html')
})
export class ExamplesButtonToggleComponent {
  isDisabledAll = false;
  isDisabledFirst = false;
  groupValue: string = 'test2';
  type: string = 'simple'; // tslint:disable-line
  size: string = 'default';

  click(value: string) {
    console.log(value); // tslint:disable-line
  }

  change(value: any) {
    console.log(`changed to ${value}`); // tslint:disable-line
  }
}
