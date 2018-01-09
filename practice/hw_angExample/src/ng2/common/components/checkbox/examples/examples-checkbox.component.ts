import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'cad-examples-checkbox',
  template: require('./examples-checkbox.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplesCheckboxComponent {
  isChecked: boolean;
  isDisabled: boolean = false;
  isRequired: boolean = false;

  change(value: boolean) {
    console.log(value); // tslint:disable-line
  }
}
