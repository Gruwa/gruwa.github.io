import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Component, forwardRef} from '@angular/core';

@Component({
  selector: 'cad-toggle',
  template: require('./toggle.html'),
  styles: [require('./toggle.scss')],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ToggleComponent),
    multi: true
  }]
})
export class ToggleComponent implements ControlValueAccessor {
  isDisabled: boolean = false;
  private value: boolean = false;
  private onChangeCallback: (value: any) => void ;
  private onTouchedCallback: () => any;

  constructor() {
    this.onChangeCallback = (_: any) => {}; // tslint:disable-line
    this.onTouchedCallback = () => {}; // tslint:disable-line
  }

  /**
   * Toggle dropdown content
   */
  toggle() {
    if (this.isDisabled) {
      return;
    }

    this.value = !this.value;
    this.onChangeCallback(this.value);
  }

  /**
   * Sets the model value. Implemented as part of ControlValueAccessor.
   * @param value
   */
  writeValue(value: boolean) {
    this.value = value;
  }

  /**
   * Registers a callback to be triggered when the model value changes.
   * Implemented as part of ControlValueAccessor.
   * @param fn Callback to be registered.
   */
  registerOnChange(fn: (value: any) => void) {
    this.onChangeCallback = fn;
  }

  /**
   * Registers a callback to be triggered when the control is touched.
   * Implemented as part of ControlValueAccessor.
   * @param fn Callback to be registered.
   */
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  /**
   * Sets the disabled state of the control. Implemented as a part of ControlValueAccessor.
   * @param isDisabled Whether the control should be disabled.
   */
  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }

}
