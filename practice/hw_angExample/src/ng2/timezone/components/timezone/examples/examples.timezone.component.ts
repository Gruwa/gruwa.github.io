import {Component} from '@angular/core';

@Component({
  selector: 'cad-examples-timezone',
  template: require('./examples-timezone.html'),
  styles: [``]
})
export class ExamplesTimezoneComponent {
  timezone = 'Europe/Kiev';
  dropdownPosition = 'top-right';
  contentColor = 'white';
  toggleDisabled = false;
}
