import {Component} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';

@Component({
  selector: 'cad-examples-number-formatter',
  template: require('./examples-number-formatter.directive.html')
})
export class ExamplesNumberFormatterDirective {
  public reactiveValue: FormControl;
  public modelValue: number = 987654321.123;

  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.reactiveValue = this.fb.control(1234567890.1234);
  }
}
