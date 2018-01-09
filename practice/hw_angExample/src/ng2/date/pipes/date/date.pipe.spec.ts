import * as moment from 'moment';
import {CadDatePipe} from './date.pipe';
import {inject, TestBed} from '@angular/core/testing';
import {DatePipe} from '@angular/common';

const DATE_FORMAT = 'YYYY-MM-DD';

describe('UnityDateModule', () => {
  describe('cadDate pipe', () => {
    let pipe = null;
    let date;

    let mocks = {
      $translate: <any> {
        instant: sinon.stub()
      },
      datePipe: <any> {
        transform: sinon.stub()
      }
    };

    beforeEach(() => {
      date = moment('2016-01-22 17:45').format();
      pipe = new CadDatePipe(mocks.datePipe, mocks.$translate);

      mocks.$translate.instant.withArgs('words.just_now').returns('words.just_now');
      mocks.$translate.instant.withArgs('words.min_ago').returns('words.min_ago');
      mocks.$translate.instant.withArgs('words.hours').returns('words.hours');

      mocks.$translate.instant.withArgs('words.today').returns('words.today');
      mocks.$translate.instant.withArgs('words.yesterday').returns('words.yesterday');
      mocks.$translate.instant.withArgs('words.n_days_ago').returns('words.n_days_ago');
      mocks.$translate.instant.withArgs('words.2').returns('words.2');
      mocks.$translate.instant.withArgs('words.5').returns('words.5');

      mocks.$translate.instant.withArgs('words.n_day_left').returns('words.n_day_left');
      mocks.$translate.instant.withArgs('words.n_days_left').returns('words.n_days_left');
      mocks.$translate.instant.withArgs('words.expired').returns('words.expired');
    });

    it('should be defined', () => {
      expect(pipe).to.exist;
    });

    it('fullDate format', () => {
      pipe.transform(date, 'fullDate');
      expect(mocks.datePipe.transform).calledWith(date, 'fullDate');
    });

    it('longDate format', () => {
      pipe.transform(date, 'longDate');
      expect(mocks.datePipe.transform).calledWith(date, 'longDate');
    });

    it('medium format', () => {
      pipe.transform(date, 'medium');
      expect(mocks.datePipe.transform).calledWith(date, 'medium');
    });

    it('mediumDate format', () => {
      pipe.transform(date, 'mediumDate');
      expect(mocks.datePipe.transform).calledWith(date, 'mediumDate');
    });

    it('mediumTime format', () => {
      pipe.transform(date, 'mediumTime');
      expect(mocks.datePipe.transform).calledWith(date, 'mediumTime');
    });

    it('short format', () => {
      pipe.transform(date, 'short');
      expect(mocks.datePipe.transform).calledWith(date, 'short');
    });

    it('shortDate format', () => {
      pipe.transform(date, 'shortDate');
      expect(mocks.datePipe.transform).calledWith(date, 'shortDate');
    });

    it('shortTime format', () => {
      pipe.transform(date, 'shortTime');
      expect(mocks.datePipe.transform).calledWith(date, 'shortTime');
    });

    it('mediumDateShortTime format', () => {
      let stub = sinon.stub(pipe, 'getMediumDateShortTime');

      pipe.transform(date, 'mediumDateShortTime');
      expect(stub).calledWith(date);

      stub.restore();
    });

    it('sgortDateShortTime format', () => {
      let stub = sinon.stub(pipe, 'getShortDateShortTime');

      pipe.transform(date, 'shortDateShortTime');
      expect(stub).calledWith(date);

      stub.restore();
    });

    context('timezone => ', () => {
      let cadDatePipe;

      // Todo: use real DatePipe instead of mock version for all tests
      beforeEach(() => TestBed.configureTestingModule({
        providers: [
          CadDatePipe,
          DatePipe,
          {
            provide: '$translate',
            useValue: mocks.$translate
          }
        ]
      }));

      beforeEach(inject([CadDatePipe], p => {
        cadDatePipe = p;
      }));

      context('input time in UTC => ', () => {
        it('should take into account timezone', () => {
          expect(
            cadDatePipe.transform('2020-11-19T04:59:59Z', 'mediumDateShortTime', 0)
          ).to.equal('Nov 19, 2020 4:59 AM');
        });

        it('should take into account timezone', () => {
          expect(
            cadDatePipe.transform('2020-11-19T04:59:59Z', 'mediumDateShortTime', '+02:00')
          ).to.equal('Nov 19, 2020 6:59 AM');
        });
      });

      context('input time in some zone => ', () => {
        it('should take into account timezone', () => {
          expect(
            cadDatePipe.transform('2020-11-19T06:59:59+02:00', 'mediumDateShortTime', 0)
          ).to.equal('Nov 19, 2020 4:59 AM');
        });

        it('should take into account timezone', () => {
          expect(
            cadDatePipe.transform('2020-11-19T06:59:59+02:00', 'mediumDateShortTime', '+02:00')
          ).to.equal('Nov 19, 2020 6:59 AM');
        });
      });
    });

    describe('fuzzy date filtering', () => {
      function _date(delta?) {
        const now = moment.utc();
        return delta ? now.subtract(delta).format() : now.format();
      }

      it('just now', () => {
        expect(pipe.transform(_date(), 'fuzzy')).to.equal('words.just_now');
        expect(pipe.transform(_date({seconds: 45}), 'fuzzy')).to.equal('words.just_now');
        expect(pipe.transform(_date({seconds: 59}), 'fuzzy')).to.equal('words.just_now');
        expect(pipe.transform(_date({seconds: 60}), 'fuzzy')).to.not.equal('words.just_now');
      });

      it('xx min ago', () => {
        expect(pipe.transform(_date({seconds: 11}), 'fuzzy')).to.not.equal('0 words.min_ago');
        expect(pipe.transform(_date({seconds: 60}), 'fuzzy')).to.equal('1 words.min_ago');
        expect(pipe.transform(_date({minutes: 3}), 'fuzzy')).to.equal('3 words.min_ago');
        expect(pipe.transform(_date({minutes: 59}), 'fuzzy')).to.equal('59 words.min_ago');
        expect(pipe.transform(_date({minutes: 60}), 'fuzzy')).to.not.equal('60 words.min_ago');
      });

      it('xx hour yy min ago', () => {
        expect(pipe.transform(_date({minutes: 11}), 'fuzzy')).to.not.equal('0 words.hours 0 words.min_ago');
        expect(pipe.transform(_date({minutes: 60}), 'fuzzy')).to.equal('1 words.hours 0 words.min_ago');
        expect(pipe.transform(_date({minutes: 65}), 'fuzzy')).to.equal('1 words.hours 5 words.min_ago');
        expect(pipe.transform(_date({hours: 23, minutes: 12}), 'fuzzy')).to.equal('23 words.hours 12 words.min_ago');
        expect(pipe.transform(_date({hours: 23, minutes: 59}), 'fuzzy')).to.equal('23 words.hours 59 words.min_ago');
        expect(pipe.transform(_date({hours: 24}), 'fuzzy')).to.not.equal('24 words.hours 0 words.min_ago');
      });

      it('default formatter', () => {
        let stub = sinon.stub(pipe, 'getMediumDateShortTime');

        pipe.transform(date, 'fuzzy');
        expect(stub).calledWith(moment(date).format());

        stub.restore();
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

      beforeEach(() => {
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
        mocks.$translate.instant.reset();
        stub.restore();
      });

      it('No date provided', () => {
        expect(pipe.transform(null, 'daysAgo')).equal('');
        expect(pipe.transform('', 'daysAgo')).equal('');
        expect(pipe.transform(undefined, 'daysAgo')).equal('');
      });

      it('Today', () => {
        expect(pipe.transform('2016-05-20', 'daysAgo')).equal('words.today');
        expect(mocks.$translate.instant).calledWith('words.today');
      });

      it('Yesterday', () => {
        expect(pipe.transform('2016-05-19', 'daysAgo')).equal('words.yesterday');
        expect(mocks.$translate.instant).calledWith('words.yesterday');
      });

      it('Two days ago', () => {
        expect(pipe.transform('2016-05-18', 'daysAgo')).equal('words.n_days_ago');
        expect(mocks.$translate.instant).calledWith('words.n_days_ago', {days: 'words.2'});
      });

      it('Five days ago', () => {
        expect(pipe.transform('2016-05-15', 'daysAgo')).equal('words.n_days_ago');
        expect(mocks.$translate.instant).calledWith('words.n_days_ago', {days: 'words.5'});
      });

      it('6 days ago', () => {
        expect(pipe.transform('2016-05-14', 'daysAgo')).equal('words.n_days_ago');
        expect(mocks.$translate.instant).calledWith('words.n_days_ago', {days: 6});
      });
    });

    describe('n days left', () => {
      let today: number;
      let leftDays1: number;
      let leftDays2: number;
      let leftDays4: number;
      let daysAgo1: number;
      let daysAgo2: number;

      beforeEach(() => {
        let currentDate = new Date();
        today = currentDate.getTime();
        leftDays1 = new Date(moment.utc(currentDate).add(1, 'days').format()).getTime();
        leftDays2 = new Date(moment.utc(currentDate).add(2, 'days').format()).getTime();
        leftDays4 = new Date(moment.utc(currentDate).add(4, 'days').format()).getTime();
        daysAgo1 = new Date(moment.utc(currentDate).subtract(1, 'days').format()).getTime();
        daysAgo2 = new Date(moment.utc(currentDate).subtract(2, 'days').format()).getTime();
      });

      afterEach(() => {
        mocks.$translate.instant.reset();
      });

      it('No date provided', () => {
        expect(pipe.transform(null, 'daysLeft')).equal('');
        expect(pipe.transform('', 'daysLeft')).equal('');
        expect(pipe.transform(undefined, 'daysLeft')).equal('');
      });

      it('0 day left', () => {
        expect(pipe.transform(today, 'daysLeft')).equal('words.n_day_left');
        expect(mocks.$translate.instant).calledWith('words.n_day_left', {daysLeft: 0});
      });

      it('1 day left', () => {
        expect(pipe.transform(leftDays1, 'daysLeft')).equal('words.n_day_left');
        expect(mocks.$translate.instant).calledWith('words.n_day_left', {daysLeft: 1});
      });

      it('2 days left', () => {
        expect(pipe.transform(leftDays2, 'daysLeft')).equal('words.n_days_left');
        expect(mocks.$translate.instant).calledWith('words.n_days_left', {daysLeft: 2});
      });

      it('4 days left', () => {
        expect(pipe.transform(leftDays4, 'daysLeft')).equal('words.n_days_left');
        expect(mocks.$translate.instant).calledWith('words.n_days_left', {daysLeft: 4});
      });

      it('2 days ago', () => {
        expect(pipe.transform(daysAgo2, 'daysLeft')).equal('words.expired');
        expect(mocks.$translate.instant).calledWith('words.expired');
      });

      it('1 days ago', () => {
        expect(pipe.transform(daysAgo1, 'daysLeft')).equal('words.expired');
        expect(mocks.$translate.instant).calledWith('words.expired');
      });
    });

  });
});
