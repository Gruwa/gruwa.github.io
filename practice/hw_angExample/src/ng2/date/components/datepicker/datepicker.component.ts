import * as _ from 'lodash';
import * as moment from 'moment';
import {
  Component, Input, forwardRef, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {DropdownComponent, DropdownPlacements} from '../../../common/components/dropdown/dropdown.component';

const KEY_ENTER = 'Enter';
const KEY_ESC = 'Escape';

@Component({
  selector: 'cad-datepicker',
  template: require('./datepicker.html'),
  styles: [require('./datepicker.scss')],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatepickerComponent),
    multi: true
  }]
})
export class DatepickerComponent implements ControlValueAccessor {
  @Input() small: boolean; // if to use small layout
  @Input() placement: DropdownPlacements = 'bottom-left'; // where to popup calendar dropdown
  @Input() format: string = 'LL'; // format how to display selected date in input
  @Input() modelFormat: string; // if set - ngModel value will be string in provided format, otherwise it's Moment
  @Input() placeholder: string; // text for empty input
  @Input() startOnMonday: boolean = true; // if to render calendar starting week from monday (true) or sunday (false)
  @Input() editTime: boolean = false; // if to display time edit controls
  @Input() minDate: moment.Moment; // only dates bigger than this value are allowed for selection
  @Input() maxDate: moment.Moment; // only dates lower than this value are allowed for selection
  @Input() activeMonth: moment.Moment;   // adds possibility to set active month w/o set/change current value

  disabled: boolean;
  focused: boolean;
  innerValue: moment.Moment;

  @ViewChild('input') private inputEl: ElementRef;
  @ViewChild(DropdownComponent) private dropdown: DropdownComponent;
  private onChangeCallback: (value: any) => void;
  private onTouchedCallback: Function;

  constructor(
    private changeDetector: ChangeDetectorRef
  ) {
    this.onChangeCallback = _.noop;
    this.onTouchedCallback = _.noop;
  }

  writeValue(value: any) {
    if (value) {
      this.innerValue = this.modelFormat ? moment(value, this.modelFormat) : moment(value);
    } else {
      this.innerValue = null;
    }
    this.changeDetector.markForCheck();
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
    this.changeDetector.markForCheck();
  }

  onBlur() {
    this.onTouchedCallback();
    this.parseManualInput();
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === KEY_ENTER) {
      this.parseManualInput();
    }

    if (event.key === KEY_ESC) {
      this.revertManualInput();
    }
  }

  onFocus() {
    this.focused = true;
  }

  onFocusOut() {
    this.focused = false;
  }

  onValueChanged(value: moment.Moment) {
    // exit if value was not actually changed
    if (
      (!this.innerValue && !value) ||
      (this.innerValue && value && this.innerValue.isSame(value, 'second'))
    ) {
      return;
    }

    this.innerValue = value;
    if (value) {
      this.onChangeCallback(this.modelFormat ? value.format(this.modelFormat) : value);
    } else {
      this.onChangeCallback(null);
    }

    // manually close dropdown when it's just selecting single date
    if (!this.editTime) {
      this.dropdown.close();
    }
  }

  private parseManualInput() {
    const value = this.inputEl.nativeElement.value;

    if (_.isEmpty(value)) {
      this.onValueChanged(null);
    } else {
      const date = moment(value, this.format);
      if (date.isValid() && this.isAllowedDate(date)) {
        this.onValueChanged(date);
      } else {
        this.revertManualInput();
      }
    }
  }

  private revertManualInput() {
    if (this.innerValue) {
      this.inputEl.nativeElement.value = this.innerValue.format(this.format);
    } else {
      this.inputEl.nativeElement.value = '';
    }
  }

  // check if date is between minDate and maxDate; if there are no such limits - fake them
  private isAllowedDate(date: moment.Moment): boolean {
    const minDate = this.minDate || moment().subtract(10000, 'years');
    const maxDate = this.maxDate || moment().add(10000, 'years');

    return date.isBetween(minDate, maxDate, 'day', '[]');
  }
}
