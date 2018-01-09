import * as _ from 'lodash';
import * as moment from 'moment';
import {Injectable, Inject} from '@angular/core';

export interface IDateRange<T = moment.Moment> {
  startDate: T;
  endDate: T;
}

export interface IDateRangeItem {
  key: string;
  title: string;
  range: [moment.Moment, moment.Moment];
}

export interface IDateRangeInitItem {
  key: string;
  title: string;
  rangeFn: Function;
}

interface IDateRangeLocale {
  format: string;
  firstDay: number;
  customRangeLabel: string;
  cancelLabel: string;
  applyLabel: string;
}

export interface IDateRangeOptions {
  parentEl?: string;
  ranges: any;
  locale: IDateRangeLocale;
  showDropdowns: boolean;
  opens:  string;
  applyClass: string;
  cancelClass: string;
  buttonClasses: string;
  linkedCalendars: boolean;
  maxDate?: moment.Moment;
  minDate?: moment.Moment;
}

@Injectable()
export class DateRangeConfigService {
  private _RANGES: IDateRangeInitItem[] = [
    {
      key: 'YESTERDAY',
      title: 'date.range.yesterday',
      rangeFn: this.getYesterdayRange
    },
    {
      key: 'LAST_3_DAYS',
      title: 'date.range.last3days',
      rangeFn: this.getLast3DaysRange
    },
    {
      key: 'LAST_7_DAYS',
      title: 'date.range.last7days',
      rangeFn: this.getLast7DaysRange
    },
    {
      key: 'LAST_MONTH',
      title: 'date.range.last_month',
      rangeFn: this.getLastMonthRange
    }
  ];

  constructor(
    @Inject('$translate') private $translate: ng.translate.ITranslateService
  ) {}

  get RANGES(): IDateRangeItem[] {
    return _.map(this._RANGES, (range) => {
      return {
        key: range.key,
        title: this.$translate.instant(range.title),
        range: range.rangeFn.call(this)
      };
    });
  }

  get(): IDateRangeOptions {  // tslint:disable-line
    let dateRangeOptions: IDateRangeOptions = {
      ranges: {},
      locale: {
        format: 'll',
        firstDay: 1,
        customRangeLabel: this.$translate.instant('date.range.custom'),
        cancelLabel: this.$translate.instant('global.cancel'),
        applyLabel: this.$translate.instant('global.apply')
      },
      showDropdowns: false,
      opens: 'left',
      applyClass: 'button-success',
      cancelClass: 'button button-default secondary',
      buttonClasses: 'button button-sm primary',
      linkedCalendars: false
    };

    _.each(this.RANGES, (range) => dateRangeOptions.ranges[range.title] = range.range);

    return dateRangeOptions;
  }

  getRangeByKey(key: string): IDateRangeItem {
    return _.find(this.RANGES, {key});
  }

  getRangeByPeriod(startDate: moment.Moment, endDate: moment.Moment): IDateRangeItem {
    return _.find(
      this.RANGES,
      (range) => range.range[0].isSame(startDate, 'day') && range.range[1].isSame(endDate, 'day')
    );
  }

  getYesterdayRange(): [moment.Moment, moment.Moment] {
    return [moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'day').endOf('day')];
  }

  getLast3DaysRange(): [moment.Moment, moment.Moment] {
    return [moment().subtract(3, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')];
  }

  getLast7DaysRange(): [moment.Moment, moment.Moment] {
    return [moment().subtract(7, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')];
  }

  getLastMonthRange(): [moment.Moment, moment.Moment] {
    return [
      moment().subtract(1, 'month').subtract(1, 'day').startOf('day'),
      moment().subtract(1, 'day').endOf('day')
    ];
  }

  getQuarterRangesOfYear(year: number): { title: string, range: IDateRange<moment.Moment> }[] {
    if (!year) {
      throw new Error('The year is required in order to calculate quarter ranges');
    }

    let yearQuarterRanges = _.map([1, 2, 3, 4], (quarter: number) => {
      let currentQuarter = this.getQuarterRangeByNumber(year, quarter);
      return {
        title: this.$translate.instant('date.range.quarter_number_year', { year, quarter}),
        range: <IDateRange<moment.Moment>> {
          startDate: currentQuarter[0],
          endDate: currentQuarter[1]
        }
      };
    });

    return yearQuarterRanges;
  }

  getHalfYearRanges(year: number): { title: string, range: IDateRange<moment.Moment> }[] {
    if (!year) {
      throw new Error('The year is required in order to calculate half year ranges');
    }

    let halfYearRanges = _.map([1, 2], (halfYear: number) => {
      const initialMonth = halfYear === 1 ? 0 : 6;
      const endMonth = halfYear === 1 ? 5 : 11;

      return {
        title: this.$translate.instant('date.range.half_year_number', { year, halfYear}),
        range: <IDateRange<moment.Moment>> {
          startDate: moment().year(year).month(initialMonth).startOf('month').startOf('day'),
          endDate: moment().year(year).month(endMonth).endOf('month').endOf('day')
        }
      };
    });

    return halfYearRanges;
  }

  getYearRanges(year: number): { title: string, range: IDateRange<moment.Moment> } {
    if (!year) {
      throw new Error('The year is required in order to calculate half year ranges');
    }

    return {
      title: year.toString(),
      range: <IDateRange<moment.Moment>> {
        startDate: moment().year(year).month(0).startOf('month').startOf('day'),
        endDate: moment().year(year).month(11).endOf('month').endOf('day')
      }
    };
  }

  getQuarterRangeByNumber(year: number, quarterNumber = 1): [moment.Moment, moment.Moment] {
    if (!year || !(quarterNumber >= 1 && quarterNumber <= 4)) {
      throw new Error('The year and the quarter number are required in order to calculate quarter ranges');
    }

    const initialMonth = (quarterNumber - 1) * 3;
    const endMonth = initialMonth + 2;

    return [
      moment().year(year).month(initialMonth).startOf('month').startOf('day'),
      moment().year(year).month(endMonth).endOf('month').endOf('day')
    ];
  }
}
