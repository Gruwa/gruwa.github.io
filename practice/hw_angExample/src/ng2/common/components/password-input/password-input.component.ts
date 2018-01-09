import * as _ from 'lodash';
import {Component, Input, forwardRef} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

@Component({
  selector: 'cad-password-input',
  template: require('./password-input.html'),
  styles: [require('./password-input.scss')],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PasswordInputComponent),
    multi: true
  }]
})
export class PasswordInputComponent implements ControlValueAccessor {
  @Input() placeholder: string;
  @Input() maxlength: number;
  disabled: boolean;
  isPasswordVisible: boolean;
  private innerValue: string;
  private onChangeCallback: (value: any) => void;
  private onTouchedCallback: Function;

  constructor() {
    // set dummy placeholders to avoid errors when attempt to call methods before they are assigned to proper handlers
    this.onChangeCallback = _.noop;
    this.onTouchedCallback = _.noop;

    this.isPasswordVisible = false;
  }

  writeValue(value: any) {
    this.innerValue = value;
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  updateInnerValue($event: string) {
    this.innerValue = $event;
    this.onChangeCallback($event);
    this.onTouchedCallback();
  }

  togglePasswordVisibility() {
    if (!this.disabled) {
      this.isPasswordVisible = !this.isPasswordVisible;
    }
  }

  onBlur() {
    this.onTouchedCallback();
  }
}
