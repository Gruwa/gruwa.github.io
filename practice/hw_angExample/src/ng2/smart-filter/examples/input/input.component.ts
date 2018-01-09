import {Component} from '@angular/core';
import {ISmartFilterControl} from '../../smart-filter-control';

@Component({
  selector: 'cad-examples-smart-filter-input',
  template: require('./input.html')
})
export class ExamplesSmartFilterInputComponent implements ISmartFilterControl {
  value = '';

  setValue(value: any) {
    this.value = value ? value : '';
  }

  getValue(): any {
    return _.trim(this.value);
  }

  getLabel(): string {
    return this.getValue();
  }

  getTooltip(): string {
    return this.getLabel();
  }
}
