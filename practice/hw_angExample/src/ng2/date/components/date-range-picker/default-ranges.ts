import * as moment from 'moment';
import {IDateRange} from '../../../date-range/services/date-range-config.service';

export interface IDateRangeItem {
  title: string;
  range: IDateRange;
}

export const defaultRanges: IDateRangeItem[] = [
  {
    title: 'date.range.yesterday',
    range: {
      startDate: moment().subtract(1, 'days').startOf('day'),
      endDate: moment().subtract(1, 'day').endOf('day')
    }
  },
  {
    title: 'date.range.last3days',
    range: {
      startDate: moment().subtract(3, 'days').startOf('day'),
      endDate: moment().subtract(1, 'days').endOf('day')
    }
  },
  {
    title: 'date.range.last7days',
    range: {
      startDate: moment().subtract(7, 'days').startOf('day'),
      endDate: moment().subtract(1, 'days').endOf('day')
    }
  },
  {
    title: 'date.range.last_month',
    range: {
      startDate: moment().subtract(1, 'month').subtract(1, 'day').startOf('day'),
      endDate: moment().subtract(1, 'day').endOf('day')
    }
  }
];
