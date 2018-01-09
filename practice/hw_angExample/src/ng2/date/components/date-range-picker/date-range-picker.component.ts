import * as _ from 'lodash';
import * as moment from 'moment';
import {
  Component, Input, forwardRef, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {DropdownComponent, DropdownPlacements} from '../../../common/components/dropdown/dropdown.component';
import {IDateRange} from '../../../date-range/services/date-range-config.service';
import {defaultRanges, IDateRangeItem} from './default-ranges';

const DELIMITER = ' - ';
const KEY_ENTER = 'Enter';
const KEY_ESC = 'Escape';

@Component({
  selector: 'cad-date-range-picker',
  template: require('./date-range-picker.html'),
  styles: [require('./date-range-picker.scss')],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DateRangePickerComponent),
    multi: true
  }]
})
export class DateRangePickerComponent implements ControlValueAccessor {
  @Input() small: boolean; // if to use small layout
  @Input() placement: DropdownPlacements = 'bottom-left'; // where to popup calendar dropdown
  @Input() format: string = 'LL'; // format how to display selected date in input
  @Input() modelFormat: string; // if set - ngModel value will be string in provided format, otherwise it's Moment
  @Input() placeholder: string; // text for empty input
  @Input() startOnMonday: boolean = true; // if to render calendar starting week from monday (true) or sunday (false)
  @Input() minDate: moment.Moment; // only dates bigger than this value are allowed for selection
  @Input() maxDate: moment.Moment; // only dates lower than this value are allowed for selection
  @Input() ranges: IDateRangeItem[]; // set of predefined ranges to show in dropdown

  disabled: boolean;
  innerValue: IDateRange; // internal range selected in calendars, before pressing "apply"
  externalValue: IDateRange; // final range show in input after "apply" btn press
  isCalendarsVisible: boolean;

  @ViewChild(DropdownComponent) private dropdown: DropdownComponent;
  private onChangeCallback: (value: any) => void;
  private onTouchedCallback: Function;

  private _monthLeft: moment.Moment;
  private _monthRight: moment.Moment;

  constructor(
    private changeDetector: ChangeDetectorRef
  ) {
    this.onChangeCallback = _.noop;
    this.onTouchedCallback = _.noop;
  }

  ngOnInit() {
    this.ranges = _.isEmpty(this.ranges) ? defaultRanges : this.ranges;
  }

  writeValue(value: IDateRange) {
    if (value && value.startDate && value.endDate) {
      const range: IDateRange = {
        startDate: this.modelFormat ? moment(value.startDate, this.modelFormat) : moment(value.startDate),
        endDate: this.modelFormat ? moment(value.endDate, this.modelFormat) : moment(value.endDate)
      };
      this.innerValue = range;
      this.externalValue = range;

      // set left calendar's month, right one will be calculated automatically
      this.monthLeft = moment(range.startDate).startOf('month');
    } else {
      this.innerValue = null;
      this.externalValue = null;
      this.monthLeft = moment().startOf('month');
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

  get monthLeft(): moment.Moment {
    return this._monthLeft;
  }

  get monthRight(): moment.Moment {
    return this._monthRight;
  }

  // make left/right calendars always show adjacent months
  set monthLeft(value: moment.Moment) {
    this._monthLeft = moment(value).startOf('month');
    this._monthRight = moment(value).add(1, 'month').startOf('month');
  }

  set monthRight(value: moment.Moment) {
    this._monthLeft = moment(value).subtract(1, 'month').startOf('month');
    this._monthRight = moment(value).startOf('month');
  }

  // returns formatted range as string to display it in <input>
  getPrettyRange(): string {
    let result = '';

    if (this.externalValue) {
      const dates = [
        this.externalValue.startDate.format(this.format),
        this.externalValue.endDate.format(this.format)
      ];
      result = dates.join(DELIMITER);
    }

    return result;
  }

  close() {
    this.dropdown.close();
  }

  // sync internal date with date shown in input and emit event with properly formatted range for (ngModel) binding
  apply() {
    if (this.innerValue) {
      this.externalValue = {...this.innerValue};
      if (this.modelFormat) {
        const rangeAsStrings = {
          startDate: this.externalValue.startDate.format(this.modelFormat),
          endDate: this.externalValue.endDate.format(this.modelFormat)
        };
        this.onChangeCallback(rangeAsStrings);
      } else {
        this.onChangeCallback(this.externalValue);
      }
    } else {
      this.externalValue = null;
      this.onChangeCallback(null);
    }

    this.close();
  }

  selectPredefinedRange(range: IDateRange) {
    this.innerValue = range;
    this.apply();
  }

  // check if range equals to external range shown in input
  isSelected(range: IDateRange): boolean {
    return this.externalValue && this.rangeEquals(this.externalValue, range);
  }

  // check if range corresponds to any item in predefined ranges list
  isCustomRange(): boolean {
    return this.externalValue && this.ranges.every(item => !this.rangeEquals(this.externalValue, item.range));
  }

  // show/hide calendars
  toggleCalendars() {
    this.isCalendarsVisible = !this.isCalendarsVisible;
  }

  // sync inner end external values dropdown opens
  onDropdownToggle(open: boolean) {
    if (open) {
      this.innerValue = this.externalValue;
      if (this.innerValue) {
        this.monthLeft = moment(this.innerValue.startDate).startOf('month');
      }
      this.isCalendarsVisible = this.isCustomRange() || _.isEmpty(this.ranges);
    }
  }

  // allow apply only when both limits are set
  canApply(): boolean {
    return !!this.innerValue && !!this.innerValue.startDate && !!this.innerValue.endDate;
  }

  private rangeEquals(rangeA: IDateRange, rangeB: IDateRange): boolean {
    return rangeA.startDate.isSame(rangeB.startDate, 'day') && rangeA.endDate.isSame(rangeB.endDate, 'day');
  }
}
