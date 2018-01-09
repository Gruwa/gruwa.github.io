import * as _ from 'lodash';
import * as moment from 'moment';
import {Component, Input, ChangeDetectionStrategy, forwardRef, ChangeDetectorRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

const ARROW_UP = 'ArrowUp';
const ARROW_DOWN = 'ArrowDown';
const KEY_ENTER = 'Enter';
const KEY_ESC = 'Escape';
const DURATION_HOURS = 'hours';
const DURATION_MINUTES = 'minutes';
type Durations = 'hours' | 'minutes';

@Component({
  selector: 'cad-time-input',
  template: require('./time-input.html'),
  styles: [require('./time-input.scss')],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TimeInputComponent),
    multi: true
  }]
})
export class TimeInputComponent implements ControlValueAccessor {
  @Input() small: boolean; // if to use small layout

  ampmList = [
    {isAm: true, title: moment().startOf('day').format('A')},
    {isAm: false, title: moment().startOf('day').add(12, 'hours').format('A')}
  ];

  // don't hardcode duration strings in template and use constants
  HOURS = DURATION_HOURS;
  MINUTES = DURATION_MINUTES;

  private innerValue: moment.Moment;
  private onChangeCallback: (value: any) => void;
  private onTouchedCallback: Function;

  constructor(
    private changeDetector: ChangeDetectorRef
  ) {
    // set dummy placeholders to avoid errors when attempt to call methods before they are assigned to proper handlers
    this.onChangeCallback = _.noop;
    this.onTouchedCallback = _.noop;
  }

  writeValue(value: moment.Moment) {
    // save directly to "innerValue" as "onChangeCallback()" should not be called now
    if (value) {
      this.innerValue = moment(value);
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

  get time(): moment.Moment {
    return this.innerValue;
  }

  set time(value: moment.Moment) {
    this.innerValue = value;
    this.onTouchedCallback();
    this.onChangeCallback(value);
  }

  inc(duration: Durations) {
    if (!this.time) return;
    this.time = moment(this.time).add(1, duration);
  }

  dec(duration: Durations) {
    if (!this.time) return;
    this.time = moment(this.time).subtract(1, duration);
  }

  onKeydown(event: KeyboardEvent, duration: Durations) {
    if (event.key === ARROW_UP) {
      event.preventDefault();
      this.inc(duration);
    }

    if (event.key === ARROW_DOWN) {
      event.preventDefault();
      this.dec(duration);
    }

    if (event.key === KEY_ENTER) {
      this.parseManualInput(<HTMLInputElement> event.target, duration);
    }

    if (event.key === KEY_ESC) {
      this.revertManualInput(<HTMLInputElement> event.target, duration);
    }
  }

  onBlur(event: FocusEvent, duration: Durations) {
    this.parseManualInput(<HTMLInputElement> event.target, duration);
  }

  onAmpmChange(value: {isAm: boolean}) {
    if (!this.time) return;

    const midday = moment(this.time).startOf('day').add(12, 'hours');

    if (this.time.isBefore(midday)) {
      // AM now, need to add time to set PM
      if (!value.isAm) {
        this.time = moment(this.time).add(12, 'hours');
      }
    } else {
      // PM now, need to subtract time to set AM
      if (value.isAm) {
        this.time = moment(this.time).subtract(12, 'hours');
      }
    }
  }

  private parseManualInput(input: HTMLInputElement, duration: Durations) {
    if (this.time) {
      const value = Number(input.value);
      const minValue = duration === DURATION_HOURS ? 1 : 0;
      const maxValue = duration === DURATION_HOURS ? 12 : 59;

      if (!_.isNaN(value) && value >= minValue && value <= maxValue) {
        if (duration === DURATION_HOURS) {
          this.time = moment(this.time).hours(value);
        } else {
          this.time = moment(this.time).minutes(value);
        }
      } else {
        // revert back original value
        this.revertManualInput(input, duration);
      }
    } else {
      this.revertManualInput(input, duration);
    }
  }

  private revertManualInput(input: HTMLInputElement, duration: Durations) {
    if (this.time) {
      input.value = this.time.format(duration === DURATION_HOURS ? 'h' : 'mm');
    } else {
      input.value = '';
    }
  }
}
