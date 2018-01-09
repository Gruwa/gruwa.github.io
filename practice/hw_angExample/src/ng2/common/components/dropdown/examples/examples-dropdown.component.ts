import {Component} from '@angular/core';
import {
  DropdownPlacements, DropdownSizes, DropdownTypes, DropdownColors,
  DropdownContentColors
} from '../dropdown.component';

@Component({
  selector: 'cad-examples-dropdown',
  template: require('./examples-dropdown.html')
})
export class ExamplesDropdownComponent {
  ddValue = 'Test';
  isOpened = false;

  title = 'dropdown with default dropdown with default dropdown with default dropdown with default dropdown';
  placement: DropdownPlacements = 'bottom-right';
  dropdownWidth = 400;
  customTooltipText = '';
  size: DropdownSizes = 'default';
  type: DropdownTypes = 'default'; // tslint:disable-line
  color: DropdownColors = 'default';
  contentColor: DropdownContentColors = 'default';
  closeOnChange = false;

  toggle(value: boolean) {
    console.log(value); // tslint:disable-line
  }
}
