import * as moment from 'moment';
import {Component, Input} from '@angular/core';
import {DatePipe} from '@angular/common';
import {ISmartFilterControl} from '../smart-filter-control';
import {IDateRange} from '../../date-range/services/date-range-config.service';
import {IDateRangeItem} from '../../date/components/date-range-picker/default-ranges';
import {DropdownPlacements} from '../../common/components/dropdown/dropdown.component';

@Component({
  selector: 'cad-smart-filter-date-range',
  template: require('./date-range.html'),
  styles: [require('./date-range.scss')]
})
export class SmartFilterDateRangeComponent implements ISmartFilterControl {
  @Input() maxDate: moment.Moment;
  @Input() minDate: moment.Moment;
  @Input() ranges: IDateRangeItem[];
  @Input() placement: DropdownPlacements = 'bottom-right';

  value: IDateRange;

  constructor(
    private datePipe: DatePipe
  ) {
    // pass
  }

  setValue(value: IDateRange): void {
    this.value = value;
  }

  getValue(): IDateRange {
    return this.value;
  }

  getLabel(): string {
    if (_.isEmpty(this.value)) {
      return '';
    }

    const startDate = this.datePipe.transform(this.value.startDate, 'mediumDate');
    const endDate = this.datePipe.transform(this.value.endDate, 'mediumDate');

    return `${startDate} - ${endDate}`;
  }

  getTooltip(): string {
    return this.getLabel();
  }
}
