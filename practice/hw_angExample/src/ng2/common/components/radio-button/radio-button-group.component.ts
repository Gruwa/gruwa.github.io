import * as _ from 'lodash';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {
  Component, EventEmitter, Output, ChangeDetectorRef, forwardRef, ContentChildren,
  QueryList, Input
} from '@angular/core';
import {RadioButtonComponent} from './radio-button.component';

export type RadioButtonDirection = 'in-row' | 'in-column';

@Component({
  selector: 'cad-radio-button-group',
  template: require('./radio-button-group.html'),
  styles: [require('./radio-button-group.scss')],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioButtonGroupComponent),
    multi: true
  }],
  host: {
    '(click)': 'onTouchedCallback()',
    '[class.in-row]': 'buttonDirection === "in-row"',
    '[class.in-column]': 'buttonDirection === "in-column"'
  }
})
export class RadioButtonGroupComponent implements ControlValueAccessor {
  @Input() name: string; // radio button group name (should be unique)
  @Input() buttonDirection: RadioButtonDirection = 'in-row';

  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

  disabled: boolean = false; // Is radio button group disabled
  value: any; // RadioButton value

  private onChangeCallback: (value: any) => void;
  private onTouchedCallback: () => any;

  /** Child button toggle buttons. */
  @ContentChildren(forwardRef(() => RadioButtonComponent))
  private radioButtons: QueryList<RadioButtonComponent> = null;

  constructor() {
    // set dummy placeholders to avoid errors when attempt to call methods before they are assigned to proper handlers
    this.onChangeCallback = _.noop;
    this.onTouchedCallback = _.noop;
  }

  updateValue(newValue: any) {
    if (this.value !== newValue) {
      this.value = newValue;

      this.updateRadioButtonsState(this.value);
      this.onChangeCallback(this.value);
      this.onChange.emit(this.value);
    }
  }

  /**
   * Sets the model value. Implemented as part of ControlValueAccessor.
   * @param value
   */
  writeValue(value: any) {
    this.value = value;
    this.updateRadioButtonsState(this.value);
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
  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  private updateRadioButtonsState(value) {
    if (this.radioButtons !== null) {
      this.radioButtons.forEach((radioButton: RadioButtonComponent) => {
        radioButton.checked = radioButton.value === value;
      });
    }
  }
}
