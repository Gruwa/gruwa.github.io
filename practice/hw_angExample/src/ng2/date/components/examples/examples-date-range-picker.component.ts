import * as _ from 'lodash';
import * as moment from 'moment';
import {Component} from '@angular/core';

@Component({
  selector: 'cad-examples-date-range-picker',
  template: require('./examples-date-range-picker.html')
})
export class ExamplesDateRangePickerComponent {
  placement = 'bottom-right';
  format = 'll HH:mm';
  modelFormat = '';
  isStartOnMonday = true;
  range: any;

  startDateStr: string;
  endDateStr: string;

  updateRage() {
    if (this.startDateStr && this.endDateStr) {
      // must provide new object in order to make "OnPush" work
      this.range = {
        startDate: this.modelFormat ? moment(this.startDateStr).format(this.modelFormat) : moment(this.startDateStr),
        endDate: this.modelFormat ? moment(this.endDateStr).format(this.modelFormat) : moment(this.endDateStr)
      };
    }
  }

  updateDateInputs() {
    if (this.range) {
      this.startDateStr = _.isString(this.range.startDate)
        ? moment(this.range.startDate, this.modelFormat).format('YYYY-MM-DD')
        : this.range.startDate.format('YYYY-MM-DD');
      this.endDateStr = _.isString(this.range.endDate)
        ? moment(this.range.endDate, this.modelFormat).format('YYYY-MM-DD')
        : this.range.endDate.format('YYYY-MM-DD');
    } else {
      this.startDateStr = '';
      this.endDateStr = '';
    }
  }
}
