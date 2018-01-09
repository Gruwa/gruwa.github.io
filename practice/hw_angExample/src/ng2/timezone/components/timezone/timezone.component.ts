import {Component, Input, Output, EventEmitter, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

import {TimezoneService, ITimezoneInfo} from '../../services';
import {DropdownPlacements} from '../../../common/components/';

@Component({
  selector: 'cad-timezone',
  template: require('./timezone'),
  styles: [require('./timezone.scss')],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CadTimezoneComponent),
    multi: true
  }]
})
export class CadTimezoneComponent implements ControlValueAccessor {
  @Input() dropdownPosition: DropdownPlacements = 'top-right';
  @Input() contentColor: string = 'white';
  @Input() toggleDisabled: boolean = false;
  @Output() onTimezoneSelected = new EventEmitter();

  private value: ITimezoneInfo;
  private onChangeCallback = _.noop;
  private onTouchedCallback = _.noop;

  constructor(
    private timezoneService: TimezoneService
  ) {}

  /**
   * Sets the model value. Implemented as part of ControlValueAccessor.
   * @param value
   */
  writeValue(value: any) {
    this.value = this.timezoneService.getTimezoneByName(value);
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

  changeTimezone(timezone: ITimezoneInfo) {
    this.value = timezone;
    this.onChangeCallback(timezone && timezone.name);
  }
}
