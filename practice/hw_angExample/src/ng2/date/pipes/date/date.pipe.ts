import * as moment from 'moment';
import {Pipe, PipeTransform, Inject} from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({name: 'cadDate'})
export class CadDatePipe implements PipeTransform {
  constructor(
    private datePipe: DatePipe,
    @Inject('$translate') private $translate: ng.translate.ITranslateService) {
  }

  /**
   * if timezone is empty pipe returns date in UTC
   */

  /**
   * @param inputDate - is a date object or a number (milliseconds since UTC epoch) or an ISO string
   * @param filterType
   * @param timezone - string ("+08:00") | number (number of minutes offset) - timezone shifting offset
   * @returns {string}
   */
  transform(inputDate: any, filterType: string, timezone?: string | number): any {
    let result = '';

    /**
     * DatePipe does not support timezone,
     * it's need to convert by own
     */
    if (!_.isNil(timezone)) {
      inputDate = moment.utc(inputDate).utcOffset(timezone);
      inputDate = new Date(
        inputDate.year(),
        inputDate.month(),
        inputDate.date(),
        inputDate.hour(),
        inputDate.minute(),
        inputDate.second()
      );
    }

    switch (filterType) {
      // Standard date formats that are supported by localization
      case 'fullDate':
      case 'longDate':
      case 'medium':
      case 'mediumDate':
      case 'mediumTime':
      case 'short':
      case 'shortDate':
      case 'shortTime':
        result = this.datePipe.transform(inputDate, filterType);
        break;
      // ------
      case 'mediumDateShortTime':
        result = this.getMediumDateShortTime(inputDate);
        break;

      case 'shortDateShortTime':
        result = this.getShortDateShortTime(inputDate);
        break;

      case 'fuzzy':
        // for now this filter supports only UTC tz
        let date = moment.utc(inputDate);
        let minuteAgo = moment.utc().subtract(1, 'minutes');
        let hourAgo = moment.utc().subtract(1, 'hours');
        let dayAgo = moment.utc().subtract(1, 'days');

        if (date.isAfter(minuteAgo)) {
          result = this.$translate.instant('words.just_now');
        } else if (date.isAfter(hourAgo)) {
          result = moment.utc().diff(date, 'minutes') + ' ' + this.$translate.instant('words.min_ago');
        } else if (date.isAfter(dayAgo)) {
          let diffH = moment.utc().diff(date, 'hours');
          let diffM = moment.utc().subtract(diffH, 'hours').diff(date, 'minutes');
          let words = [
            diffH,
            this.$translate.instant('words.hours'),
            diffM,
            this.$translate.instant('words.min_ago')
          ];
          result = words.join(' ');
        } else {
          result = this.getMediumDateShortTime(inputDate);
        }
        break;

      case 'daysAgo':
        // for now this filter supports only UTC tz
        result = this.getDaysAgo(inputDate);
        break;

      case 'daysLeft':
        result = this.getDaysLeft(inputDate);
        break;

      default:
        result = this.datePipe.transform(inputDate, 'mediumDate');
    }

    return result;
  }

  private getMediumDateShortTime(inputDate) {
    return `${this.datePipe.transform(inputDate, 'mediumDate')} ${this.datePipe.transform(inputDate, 'shortTime')}`;
  }

  private getShortDateShortTime(inputDate) {
    return `${this.datePipe.transform(inputDate, 'shortDate')} ${this.datePipe.transform(inputDate, 'shortTime')}`;
  }

  private getDaysAgo(dateString: string): string {
    // TODO: add support for other date formats, not only for "YYYY-MM-DD"
    if (_.isEmpty(dateString)) {
      return '';
    }

    let date = moment.utc(dateString, 'YYYY-MM-DD', true);
    let today = moment.utc();
    let diff: number = today.diff(date, 'days');
    let days: string|number;

    switch (true) {
      case (diff === 0):
        return this.$translate.instant('words.today');
      case (diff === 1):
        return this.$translate.instant('words.yesterday');
      default:
        days = (diff < 6) ? this.$translate.instant(`words.${diff}`) : diff;
        return this.$translate.instant('words.n_days_ago', {days});
    }
  }

  private getDaysLeft(dateMillis: number): string {
    if (!dateMillis) {
      return '';
    }

    let momentDate = moment.utc(new Date(dateMillis)).startOf('day');
    let today = moment.utc().startOf('day');
    let diff: number = today.diff(momentDate, 'days');
    let daysLeft: number;

    switch (true) {
      case (diff >= -1 && diff <= 0):
        daysLeft = Math.abs(diff);
        return this.$translate.instant('words.n_day_left', {daysLeft});
      case (diff < 0):
        daysLeft = Math.abs(diff);
        return this.$translate.instant('words.n_days_left', {daysLeft});
      default:
        return this.$translate.instant('words.expired');
    }

  }
}
