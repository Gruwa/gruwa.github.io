import {Component} from '@angular/core';

@Component({
  selector: 'cad-examples-toggle',
  template: require('./examples-toggle.html')
})
export class ExamplesToggleComponent {
  isOn = false;

  toggle(value: boolean) {
    console.log(value); // tslint:disable-line
  }
}
