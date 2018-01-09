import {Component, Input, forwardRef, Output, EventEmitter, ChangeDetectorRef} from '@angular/core';
import {
  ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, AbstractControl,
  Validators
} from '@angular/forms';

type ValidationErrors = {
  [key: string]: any
};

@Component({
  selector: 'cad-checkbox',
  template: require('./checkbox.html'),
  styles: [require('./checkbox.scss')],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ]
})
export class CheckboxComponent implements ControlValueAccessor, Validator {
  @Input() required: boolean = false; // Is checkbox required to be checked

  @Output() onChange: EventEmitter<boolean> = new EventEmitter<boolean>(); // Trigger whenever it is became on/off

  disabled: boolean = false; // Is checkbox disabled

  private checked: boolean = false;
  private onChangeCallback: (value: any) => void;
  private onTouchedCallback: () => any;

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  onBlur() {
    this.onTouchedCallback();
  }

  onClick() {
    if (!this.disabled) {
      this.checked = !this.checked;
      this.onChangeCallback(this.checked);
      this.onChange.emit(this.checked);
    }
  }

  /**
   * Sets the model value. Implemented as part of ControlValueAccessor.
   * @param value
   */
  writeValue(value: any) {
    this.checked = !!value;
    // when parent container has `ChangeDetectionStrategy.OnPush` - UI will be not updated w/o the next line
    this.changeDetectorRef.markForCheck();
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

  validate(c: AbstractControl): ValidationErrors|null {
    return this.required ? Validators.requiredTrue(c) : null;
  }

}
