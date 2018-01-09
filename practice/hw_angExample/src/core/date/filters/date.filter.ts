import * as moment from 'moment';

export default (ngModule) => {
  function CadDate($filter: cad.IFilterService, $translate: ng.translate.ITranslateService) {
    'ngInject';

    return (value, filterType, timezone?: string) => {
      let result = '';

      switch (filterType) {
        // Standard date formats that are supported by localization
        case 'fullDate':
          result = $filter('date')(value, 'fullDate', timezone);
          break;
        case 'longDate':
          result = $filter('date')(value, 'longDate', timezone);
          break;
        case 'medium':
          result = $filter('date')(value, 'medium', timezone);
          break;
        case 'mediumDate':
          result = $filter('date')(value, 'mediumDate', timezone);
          break;
        case 'mediumTime':
          result = $filter('date')(value, 'mediumTime', timezone);
          break;
        case 'short':
          result = $filter('date')(value, 'short', timezone);
          break;
        case 'shortDate':
          result = $filter('date')(value, 'shortDate', timezone);
          break;
        case 'shortTime':
          result = $filter('date')(value, 'shortTime', timezone);
          break;
        // ------
        case 'mediumDateShortTime':
          result = $filter('date')(value, 'mediumDate', timezone) + ' ' + $filter('date')(value, 'shortTime', timezone);
          break;

        case 'shortDateShortTime':
          result = $filter('date')(value, 'shortDate', timezone) + ' ' + $filter('date')(value, 'shortTime', timezone);
          break;

        case 'fuzzy':
          // for now this filter supports only UTC tz
          let date = moment.utc(value);
          let minuteAgo = moment.utc().subtract(1, 'minutes');
          let hourAgo = moment.utc().subtract(1, 'hours');
          let dayAgo = moment.utc().subtract(1, 'days');

          if (date.isAfter(minuteAgo)) {
            result = $translate.instant('words.just_now');
          } else if (date.isAfter(hourAgo)) {
            result = moment.utc().diff(date, 'minutes') + ' ' + $translate.instant('words.min_ago');
          } else if (date.isAfter(dayAgo)) {
            let diffH = moment.utc().diff(date, 'hours');
            let diffM = moment.utc().subtract(diffH, 'hours').diff(date, 'minutes');
            let words = [diffH, $translate.instant('words.hours'), diffM, $translate.instant('words.min_ago')];
            result = words.join(' ');
          } else {
            result = $filter('cadDate')(value, 'mediumDateShortTime', timezone);
          }
          break;

        case 'daysAgo':
          // for now this filter supports only UTC tz
          result = getDaysAgo(value);
          break;

        case 'daysLeft':
          result = getDaysLeft(value);
          break;

        default:
          result = $filter('date')(value, 'mediumDate', timezone);
      }

      return result;
    };

    function getDaysAgo(dateString: string): string {
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
          return $translate.instant('words.today');
        case (diff === 1):
          return $translate.instant('words.yesterday');
        default:
          days = (diff < 6) ? $translate.instant(`words.${diff}`) : diff;
          return $translate.instant('words.n_days_ago', {days});
      }
    }

    function getDaysLeft(dateMillis: number): string {
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
          return $translate.instant('words.n_day_left', {daysLeft});
        case (diff < 0):
          daysLeft = Math.abs(diff);
          return $translate.instant('words.n_days_left', {daysLeft});
        default:
          return $translate.instant('words.expired');
      }

    }
  }

  ngModule.filter('cadDate', CadDate);
};
