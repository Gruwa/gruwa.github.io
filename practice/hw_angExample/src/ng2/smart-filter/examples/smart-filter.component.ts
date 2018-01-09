import * as moment from 'moment';
import {Component} from '@angular/core';
import {IDateRange} from '../../date-range/services/date-range-config.service';

interface IFilter {
  dateRange: IDateRange<moment.Moment>;
  status: { key: string; text: string };
  query: string;
  applications: { key: string; text: string }[];
}

@Component({
  selector: 'cad-examples-smart-filter',
  template: require('./smart-filter.html')
})
export class ExamplesSmartFilterComponent {
  readonly statusList = [
    { key: 'read', text: 'Read' },
    { key: 'unread', text: 'Unread'}
  ];

  readonly applications = [
    { key: 'cm', title: 'Campaigns' },
    { key: 'csf', title: 'Insertion Orders' }
  ];

  value: IFilter = {
    dateRange: null,
    status: this.statusList[1],
    query: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    applications: []
  };

  setValue(value: IFilter) {
    this.value = value;
  }
}
