import {getCustomLocale, a2mFormat} from './locale';

describe('utils', () => {
  describe('locale', () => {
    describe('getCustomLocale()', () => {
      let $locale;
      let month = ['1', '2', '3'];
      let standaloneMonth = ['4', '5', '6'];
      let shortMonth = ['7', '8', '9'];
      let day = ['10', '11'];
      let shortday = ['12'];

      it('should update long date formats for moment (en)', () => {
        $locale = {
          DATETIME_FORMATS: {
            'fullDate': 'EEEE, MMMM d, y',
            'longDate': 'MMMM d, y',
            'medium': 'MMM d, y h:mm:ss a',
            'mediumDate': 'MMM d, y',
            'mediumTime': 'h:mm:ss a',
            'short': 'M/d/yy h:mm a',
            'shortDate': 'M/d/yy',
            'shortTime': 'h:mm a',
            'MONTH': month,
            'STANDALONEMONTH': standaloneMonth,
            'SHORTMONTH': shortMonth,
            'DAY': day,
            'SHORTDAY': shortday
          }
        };

        expect(getCustomLocale($locale)).to.deep.equal({
          longDateFormat: {
            L: 'MM/DD/YY',
            LL: 'MMMM D, Y',
            LLL: 'MMMM D, Y h:mm A',
            LLLL: 'dddd, MMMM D, Y h:mm A',
            LT: 'h:mm A',
            LTS: 'h:mm:ss A',
            l: 'M/D/YY',
            ll: 'MMM D, Y',
            lll: 'MMM D, Y h:mm A',
            llll: 'ddd, MMM D, Y h:mm A'
          },
          months: {
            format: month,
            standalone: standaloneMonth
          },
          monthsShort: shortMonth,
          weekdays: day,
          weekdaysShort: shortday
        });

      });

      it('should update long date formats for moment (ru)', () => {
        $locale = {
          DATETIME_FORMATS: {
            'fullDate': `EEEE, d MMMM y '\u0433'.`,
            'longDate': `d MMMM y '\u0433'.`,
            'medium': `d MMM y '\u0433'. HH:mm:ss`,
            'mediumDate': `d MMM y '\u0433'.`,
            'mediumTime': 'HH:mm:ss',
            'short': 'dd.MM.yy HH:mm',
            'shortDate': 'dd.MM.yy',
            'shortTime': 'HH:mm',
            'MONTH': month,
            'STANDALONEMONTH': standaloneMonth,
            'SHORTMONTH': shortMonth,
            'DAY': day,
            'SHORTDAY': shortday
          }
        };

        expect(getCustomLocale($locale)).to.deep.equal({
          longDateFormat: {
            L: 'DD.MM.YY',
            LL: 'D MMMM Y \u0433.',
            LLL: 'D MMMM Y \u0433. HH:mm',
            LLLL: 'dddd, D MMMM Y \u0433. HH:mm',
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            l: 'D.M.YY',
            ll: 'D MMM Y \u0433.',
            lll: 'D MMM Y \u0433. HH:mm',
            llll: 'ddd, D MMM Y \u0433. HH:mm'
          },
          months: {
            format: month,
            standalone: standaloneMonth
          },
          monthsShort: shortMonth,
          weekdays: day,
          weekdaysShort: shortday
        });

      });

    });

    describe('a2mFormat()', () => {
      it('should remove quotes from format', () => {
        expect(a2mFormat(`prefix 'test' suffix`)).to.equal('prefix test suffix');
      });

      it('should change 2 sequence of single quetes to one', () => {
        expect(a2mFormat(`prefix '' suffix`)).to.equal(`prefix ' suffix`);
      });

      it('should change AM/PM in format', () => {
        expect(a2mFormat('a')).to.equal('A');
      });

      it('should change years in format', () => {
        expect(a2mFormat('y')).to.equal('Y');
        expect(a2mFormat('yy')).to.equal('YY');
        expect(a2mFormat('yyyYYYyyy')).to.equal('YYYYYYYYY');
      });

      it('should change months in format', () => {
        expect(a2mFormat('LLLL')).to.equal('MMMM');
        expect(a2mFormat('LLLLLL')).to.equal('MMMMLL');
      });

      it('should change days in format', () => {
        expect(a2mFormat('d')).to.equal('D');
        expect(a2mFormat('dd')).to.equal('DD');
        expect(a2mFormat('dddDDDddd')).to.equal('DDDDDDDDD');
      });

      it('should change day of weeks in format', () => {
        expect(a2mFormat('EEEE')).to.equal('dddd');
        expect(a2mFormat('EEE')).to.equal('ddd');
        expect(a2mFormat('EE')).to.equal('EE');
        expect(a2mFormat('EEEEE')).to.equal('ddddE');
      });

      it('should change milliseconds in format', () => {
        expect(a2mFormat('sss')).to.equal('SSS');
      });

      it('should change timezone in format', () => {
        expect(a2mFormat('Z')).to.equal('ZZ');
      });

    });

  });

});
