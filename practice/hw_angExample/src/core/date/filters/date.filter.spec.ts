import * as moment from 'moment';

const DATE_FORMAT = 'YYYY-MM-DD';

export default (ngModule) => {
  describe(ngModule.name, () => {
    describe('filters', () => {
      describe('cadDate', () => {
        let filter = null;
        let $translate;
        let date;

        beforeEach(() => {
          angular.mock.module(ngModule.name);
          angular.mock.inject((_$filter_, _$translate_) => {
            $translate = _$translate_;
            filter = _$filter_('cadDate');
          });
          date = moment('2016-01-22 17:45').format();
        });

        it('should be defined', () => {
          expect(filter).to.exist;
        });

        it('fullDate filter', () => {
          expect(filter(date, 'fullDate')).to.equal('Friday, January 22, 2016');
        });

        it('longDate filter', () => {
          expect(filter(date, 'longDate')).to.equal('January 22, 2016');
        });

        it('medium filter', () => {
          expect(filter(date, 'medium')).to.equal('Jan 22, 2016 5:45:00 PM');
        });

        it('mediumDate filter', () => {
          expect(filter(date, 'mediumDate')).to.equal('Jan 22, 2016');
        });

        it('mediumTime filter', () => {
          expect(filter(date, 'mediumTime')).to.equal('5:45:00 PM');
        });

        it('short filter', () => {
          expect(filter(date, 'short')).to.equal('1/22/16 5:45 PM');
        });

        it('shortDate filter', () => {
          expect(filter(date, 'shortDate')).to.equal('1/22/16');
        });

        it('shortTime filter', () => {
          expect(filter(date, 'shortTime')).to.equal('5:45 PM');
        });

        it('mediumDateShortTime filter', () => {
          expect(filter(date, 'mediumDateShortTime')).to.equal('Jan 22, 2016 5:45 PM');
        });

        it('shortDateShortTime filter', () => {
          expect(filter(date, 'shortDateShortTime')).to.equal('1/22/16 5:45 PM');
        });

        describe('fuzzy date filtering', () => {
          function _date(delta?) {
            const now = moment.utc();
            return delta ? now.subtract(delta).format() : now.format();
          }

          it('just now', () => {
            expect(filter(_date(), 'fuzzy')).to.equal('words.just_now');
            expect(filter(_date({seconds: 45}), 'fuzzy')).to.equal('words.just_now');
            expect(filter(_date({seconds: 59}), 'fuzzy')).to.equal('words.just_now');
            expect(filter(_date({seconds: 60}), 'fuzzy')).to.not.equal('words.just_now');
          });

          it('xx min ago', () => {
            expect(filter(_date({seconds: 11}), 'fuzzy')).to.not.equal('0 words.min_ago');
            expect(filter(_date({seconds: 60}), 'fuzzy')).to.equal('1 words.min_ago');
            expect(filter(_date({minutes: 3}), 'fuzzy')).to.equal('3 words.min_ago');
            expect(filter(_date({minutes: 59}), 'fuzzy')).to.equal('59 words.min_ago');
            expect(filter(_date({minutes: 60}), 'fuzzy')).to.not.equal('60 words.min_ago');
          });

          it('xx hour yy min ago', () => {
            expect(filter(_date({minutes: 11}), 'fuzzy')).to.not.equal('0 words.hours 0 words.min_ago');
            expect(filter(_date({minutes: 60}), 'fuzzy')).to.equal('1 words.hours 0 words.min_ago');
            expect(filter(_date({minutes: 65}), 'fuzzy')).to.equal('1 words.hours 5 words.min_ago');
            expect(filter(_date({hours: 23, minutes: 12}), 'fuzzy')).to.equal('23 words.hours 12 words.min_ago');
            expect(filter(_date({hours: 23, minutes: 59}), 'fuzzy')).to.equal('23 words.hours 59 words.min_ago');
            expect(filter(_date({hours: 24}), 'fuzzy')).to.not.equal('24 words.hours 0 words.min_ago');
          });

          it('default formatter', () => {
            expect(filter(moment('2016-01-22 15:34').format(), 'fuzzy')).to.equal('Jan 22, 2016 3:34 PM');
          });
        });

        describe('few days ago', () => {
          let today = moment.utc('2016-05-20', DATE_FORMAT, true);
          let yesterday = moment.utc('2016-05-19', DATE_FORMAT, true);
          let daysAgo2 = moment.utc('2016-05-18', DATE_FORMAT, true);
          let daysAgo3 = moment.utc('2016-05-17', DATE_FORMAT, true);
          let daysAgo4 = moment.utc('2016-05-16', DATE_FORMAT, true);
          let daysAgo5 = moment.utc('2016-05-15', DATE_FORMAT, true);
          let daysAgo6 = moment.utc('2016-05-14', DATE_FORMAT, true);
          let stub;
          let translateSpy;

          beforeEach(() => {
            translateSpy = sinon.spy($translate, 'instant');
            stub = sinon.stub(moment, 'utc');

            stub.withArgs('2016-05-19', DATE_FORMAT, true).returns(yesterday);
            stub.withArgs('2016-05-18', DATE_FORMAT, true).returns(daysAgo2);
            stub.withArgs('2016-05-17', DATE_FORMAT, true).returns(daysAgo3);
            stub.withArgs('2016-05-16', DATE_FORMAT, true).returns(daysAgo4);
            stub.withArgs('2016-05-15', DATE_FORMAT, true).returns(daysAgo5);
            stub.withArgs('2016-05-14', DATE_FORMAT, true).returns(daysAgo6);
            stub.withArgs().returns(today);
          });

          afterEach(() => {
            stub.restore();
            translateSpy.reset();
          });

          it('No date provided', () => {
            expect(filter(null, 'daysAgo')).equal('');
            expect(filter('', 'daysAgo')).equal('');
            expect(filter(undefined, 'daysAgo')).equal('');
          });

          it('Today', () => {
            expect(filter('2016-05-20', 'daysAgo')).equal('words.today');
            expect($translate.instant).calledWith('words.today');
          });

          it('Yesterday', () => {
            expect(filter('2016-05-19', 'daysAgo')).equal('words.yesterday');
            expect($translate.instant).calledWith('words.yesterday');
          });

          it('Two days ago', () => {
            expect(filter('2016-05-18', 'daysAgo')).equal('words.n_days_ago');
            expect($translate.instant).calledWith('words.n_days_ago', {days: 'words.2'});
          });

          it('Five days ago', () => {
            expect(filter('2016-05-15', 'daysAgo')).equal('words.n_days_ago');
            expect($translate.instant).calledWith('words.n_days_ago', {days: 'words.5'});
          });

          it('6 days ago', () => {
            expect(filter('2016-05-14', 'daysAgo')).equal('words.n_days_ago');
            expect($translate.instant).calledWith('words.n_days_ago', {days: 6});
          });
        });

        describe('n days left', () => {
          let today: number;
          let leftDays1: number;
          let leftDays2: number;
          let leftDays4: number;
          let daysAgo1: number;
          let daysAgo2: number;
          let translateSpy: any;

          beforeEach(() => {
            let currentDate = new Date();
            today = currentDate.getTime();
            leftDays1 = new Date(moment.utc(currentDate).add(1, 'days').format()).getTime();
            leftDays2 = new Date(moment.utc(currentDate).add(2, 'days').format()).getTime();
            leftDays4 = new Date(moment.utc(currentDate).add(4, 'days').format()).getTime();
            daysAgo1 = new Date(moment.utc(currentDate).subtract(1, 'days').format()).getTime();
            daysAgo2 = new Date(moment.utc(currentDate).subtract(2, 'days').format()).getTime();
            translateSpy = sinon.spy($translate, 'instant');
          });

          afterEach(() => {
            translateSpy.reset();
          });

          it('No date provided', () => {
            expect(filter(null, 'daysLeft')).equal('');
            expect(filter('', 'daysLeft')).equal('');
            expect(filter(undefined, 'daysLeft')).equal('');
          });

          it('0 day left', () => {
            expect(filter(today, 'daysLeft')).equal('words.n_day_left');
            expect($translate.instant).calledWith('words.n_day_left', {daysLeft: 0});
          });

          it('1 day left', () => {
            expect(filter(leftDays1, 'daysLeft')).equal('words.n_day_left');
            expect($translate.instant).calledWith('words.n_day_left', {daysLeft: 1});
          });

          it('2 days left', () => {
            expect(filter(leftDays2, 'daysLeft')).equal('words.n_days_left');
            expect($translate.instant).calledWith('words.n_days_left', {daysLeft: 2});
          });

          it('4 days left', () => {
            expect(filter(leftDays4, 'daysLeft')).equal('words.n_days_left');
            expect($translate.instant).calledWith('words.n_days_left', {daysLeft: 4});
          });

          it('2 days ago', () => {
            expect(filter(daysAgo2, 'daysLeft')).equal('words.expired');
            expect($translate.instant).calledWith('words.expired');
          });

          it('1 days ago', () => {
            expect(filter(daysAgo1, 'daysLeft')).equal('words.expired');
            expect($translate.instant).calledWith('words.expired');
          });
        });

      });
    });
  });
};
