// add custom field that's currently absent at angular d.ts file
interface ICadLocaleDateTimeFormatDescriptor extends ng.ILocaleDateTimeFormatDescriptor {
  STANDALONEMONTH: string[];
}
interface ICadLocaleService extends ng.ILocaleService {
  DATETIME_FORMATS: ICadLocaleDateTimeFormatDescriptor;
}

export function getCustomLocale(angularLocale: ng.ILocaleService) {
  return {
    longDateFormat: {
      LT: a2mFormat(angularLocale.DATETIME_FORMATS.shortTime),
      LTS: a2mFormat(angularLocale.DATETIME_FORMATS.mediumTime),
      L: a2mFormat(angularLocale.DATETIME_FORMATS.shortDate
        // .replace(/y+/, 'yyyy') remain number of digits the same
        .replace(/d+/, 'dd')
        .replace(/M+/, 'MM')
      ),
      l: a2mFormat(angularLocale.DATETIME_FORMATS.shortDate
        // .replace(/y+/, 'yyyy') remain number of digits the same
        .replace(/d+/, 'd')
        .replace(/M+/, 'M')),
      LL: a2mFormat(angularLocale.DATETIME_FORMATS.longDate),
      ll: a2mFormat(angularLocale.DATETIME_FORMATS.mediumDate),
      LLL: a2mFormat(`${angularLocale.DATETIME_FORMATS.longDate} ${angularLocale.DATETIME_FORMATS.shortTime}`),
      lll: a2mFormat(`${angularLocale.DATETIME_FORMATS.mediumDate} ${angularLocale.DATETIME_FORMATS.shortTime}`),
      LLLL: a2mFormat(`${angularLocale.DATETIME_FORMATS.fullDate} ${angularLocale.DATETIME_FORMATS.shortTime}`),
      llll: a2mFormat(`${angularLocale.DATETIME_FORMATS.fullDate} ${angularLocale.DATETIME_FORMATS.shortTime}`
        .replace(/M+/, 'MMM')
        .replace(/E+/, 'EEE'))
    },
    months: {
      format: angularLocale.DATETIME_FORMATS.MONTH,
      standalone: (<ICadLocaleService> angularLocale).DATETIME_FORMATS.STANDALONEMONTH
    },
    monthsShort: angularLocale.DATETIME_FORMATS.SHORTMONTH,
    weekdays: angularLocale.DATETIME_FORMATS.DAY,
    weekdaysShort: angularLocale.DATETIME_FORMATS.SHORTDAY
  };
}

export function a2mFormat(format: string) {
  const DATE_FORMATS = /((?:[^yMLdHhmsaZEwG']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|L+|d+|H+|h+|m+|s+|a|Z|G+|w+))(.*)/;
  let match;
  let parts = [];
  let result: string;

  // Parsing format into parts
  while (format) {
    match = DATE_FORMATS.exec(format);
    if (match) {
      parts = parts.concat(match.slice(1));
      format = parts.pop();
    } else {
      parts.push(format);
      format = null;
    }
  }

  // Removing from parts unneeded quotes
  result = _.map(parts, value => {
    return value === '\'\'' ? '\'' : value.replace(/(^'|'$)/g, '').replace(/''/g, '\'');
  }).join('');

  // transform Angular date tokens to Moment format
  result = result.replace('a', 'A'); // AM/PM
  result = result.replace(/y/g, 'Y'); // year
  result = result.replace(/d/g, 'D'); // day
  result = result.replace('LLLL', 'MMMM'); // month
  result = result.replace('EEEE', 'dddd'); // day of week
  result = result.replace('EEE', 'ddd'); // day of week
  result = result.replace('sss', 'SSS'); // milliseconds
  result = result.replace('Z', 'ZZ'); // timezone

  return result;
}
