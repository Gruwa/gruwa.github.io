import * as _ from 'lodash';
import * as moment from 'moment';
import {
  Component, Input, Output, ChangeDetectionStrategy, forwardRef, ChangeDetectorRef, EventEmitter
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {IDateRange} from '../../../date-range/services/date-range-config.service';

const CALENDAR_ROWS = 6;
const WEEK_DAYS = 7;

@Component({
  selector: 'cad-month-calendar',
  template: require('./calendar.html'),
  styles: [require('./calendar.scss')],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MonthCalendarComponent),
    multi: true
  }]
})
export class MonthCalendarComponent implements ControlValueAccessor {
  @Input() startOnMonday: boolean = true; // if to render calendar starting week from monday (true) or sunday (false)
  @Input() rangeMode: boolean = false; // if to select single date or dates range
  @Input() minDate: moment.Moment; // min date allowed for manual selection
  @Input() maxDate: moment.Moment; // max date allowed for manual selection

  // input/output date that is hovered right now (used to highlight range in date range picker component))
  @Input() dateUnderMouse: moment.Moment;
  @Output() dateUnderMouseChange = new EventEmitter<moment.Moment>();

  // input/output active month (used to sync 2 calendars in date range picker component)
  @Input()
  get activeMonth(): moment.Moment {
    return this._activeMonth;
  }

  set activeMonth(value: moment.Moment) {
    this._activeMonth = value;
    this.activeMonthChange.emit(value);
  }

  @Output() activeMonthChange = new EventEmitter<moment.Moment>();

  private _activeMonth: moment.Moment; // actual active month operated internally
  private selectedDate: moment.Moment; // current date value for single selection mode
  private selectedRange: IDateRange; // current dates range for range selection mode
  private onChangeCallback: (value: any) => void;
  private onTouchedCallback: Function;

  constructor(
    private changeDetector: ChangeDetectorRef
  ) {
    // set dummy placeholders to avoid errors when attempt to call methods before they are assigned to proper handlers
    this.onChangeCallback = _.noop;
    this.onTouchedCallback = _.noop;

    this.selectedRange = {startDate: null, endDate: null};
  }

  writeValue(value: moment.Moment | IDateRange) {
    if (value) {
      // if there's value - assign it to proper internal selection depending on mode and show correct active month
      // note: for range mode active month is set in parent control
      if (this.rangeMode) {
        this.selectedRange = <IDateRange> {...value};
      } else {
        this.selectedDate = moment(<moment.MomentInput> value);
        this.activeMonth = moment(<moment.MomentInput> value).startOf('month');
      }
    } else {
      // if there's no value - reset selection
      if (this.rangeMode) {
        this.selectedRange = {startDate: null, endDate: null};
      } else {
        this.selectedDate = null;
        this.showToday();
      }
    }

    // must mark for check due to "OnPush" mode
    this.changeDetector.markForCheck();
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  // returns matrix with dates for active month, rows are weeks and cells are actual dates
  get monthMatrix(): moment.Moment[][] {
    const matrix = [];

    // get start of active month and then start of that week
    // then just do +1 day to build month days matrix
    const weekType = this.startOnMonday ? 'isoWeek' : 'week'; // "isoWeek" starts on monday, just "week" - on sunday
    const day = moment(this.activeMonth).startOf('month').startOf(weekType);

    for (let row = 1; row <= CALENDAR_ROWS; row++) {
      const week = [];
      for (let i = 1; i <= WEEK_DAYS; i++) {
        // must push new ref to day in order to update UI
        week.push(moment(day));
        day.add(1, 'day');
      }
      matrix.push(week);
    }

    return matrix;
  }

  // must set new ref to "activeMonth" to update UI, otherwise "cadMomentFormat" pipe won't know that date has changed
  prevMonth() {
    this.activeMonth = moment(this.activeMonth).subtract(1, 'months');
  }

  nextMonth() {
    this.activeMonth = moment(this.activeMonth).add(1, 'months');
  }

  showToday() {
    this.activeMonth = moment().startOf('month');
  }

  // check if date belongs to active month
  isInActiveMonth(date: moment.Moment): boolean {
    const start = moment(this.activeMonth).startOf('month');
    const end = moment(this.activeMonth).endOf('month');
    return date.isBetween(start, end, 'day', '[]');
  }

  isToday(date: moment.Moment): boolean {
    return date.isSame(moment(), 'day');
  }

  // check if date equals to internal selection date (or equals to start/end date for range mode)
  isSelected(date: moment.Moment): boolean {
    if (this.rangeMode) {
      return date.isSame(this.selectedRange.startDate, 'day') || date.isSame(this.selectedRange.endDate, 'day');
    } else {
      return date.isSame(this.selectedDate, 'day');
    }
  }

  // check if date is between minDate and maxDate; if there are no such limits - fake them
  isAllowedDate(date: moment.Moment): boolean {
    const minDate = this.minDate || moment().subtract(10000, 'years');
    const maxDate = this.maxDate || moment().add(10000, 'years');

    return date.isBetween(minDate, maxDate, 'day', '[]');
  }

  // process click on date in calendar - either set single date or define start/end date for range mode
  selectDate(date: moment.Moment) {
    if (!this.isAllowedDate(date)) return;

    if (this.rangeMode) {
      if (
        this.selectedRange.startDate &&
        !this.selectedRange.endDate &&
        date.isSameOrAfter(this.selectedRange.startDate, 'day')
      ) {
        // finish range selection
        this.selectedRange.endDate = moment(date).endOf('day');
      } else {
        // start new range selection
        this.selectedRange.startDate = date;
        this.selectedRange.endDate = null;
      }

      // return clone of selected range to make sure components with "OnPush" pick-up this change
      this.onChangeCallback({...this.selectedRange});
    } else {
      this.selectedDate = date;

      // return clone of selected date to make sure components with "OnPush" pick-up this change
      this.onChangeCallback(moment(date));
    }
  }

  // remember hovered date and emit event about hovered date change
  preSelectDate(date: moment.Moment) {
    if (this.isAllowedDate(date)) {
      this.dateUnderMouse = date;
      this.dateUnderMouseChange.emit(date);
    }
  }

  // check if date is in range or could be in range (for case when there's start date and no end date so far)
  isInRange(date: moment.Moment): boolean {
    if (this.rangeMode) {
      const startDate = this.selectedRange.startDate;
      const endDate = this.selectedRange.endDate || this.dateUnderMouse;

      if (startDate && endDate && endDate.isAfter(startDate)) {
        return date.isBetween(startDate, endDate, 'day', '[]');
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  isRangeStart(date: moment.Moment): boolean {
    return this.rangeMode && date.isSame(this.selectedRange.startDate, 'day');
  }

  isRangeEnd(date: moment.Moment): boolean {
    const endDay = this.selectedRange.endDate || this.dateUnderMouse;
    return this.rangeMode && date.isSame(endDay, 'day') && date.isAfter(this.selectedRange.startDate, 'day');
  }

  trackByIndex(index) {
    return index;
  }
}
