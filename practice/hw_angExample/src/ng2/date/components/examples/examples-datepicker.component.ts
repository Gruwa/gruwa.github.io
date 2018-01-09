import * as _ from 'lodash';
import * as moment from 'moment';
import {Component} from '@angular/core';

@Component({
  selector: 'cad-examples-datepicker',
  template: require('./examples-datepicker.html')
})
export class ExamplesDatepickerComponent {
  date: moment.Moment | string;
  placement = 'bottom-left';
  format = 'LL';
  modelFormat = '';
  isStartOnMonday = true;
  isTimeEdits = true;

  get htmlDate(): string {
    if (!this.date) {
      return null;
    } else {
      const momentDate = _.isString(this.date) ? moment(this.date, this.modelFormat) : this.date;
      return momentDate.format('YYYY-MM-DDTHH:mm');
    }
  }

  set htmlDate(value: string) {
    if (!value) {
      this.date = null;
    } else {
      const momentDate = moment(value, 'YYYY-MM-DDTHH:mm');
      this.date = this.modelFormat ? momentDate.format(this.modelFormat) : momentDate;
    }
  }
}
