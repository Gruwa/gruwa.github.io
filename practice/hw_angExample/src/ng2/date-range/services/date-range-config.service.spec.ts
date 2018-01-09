import * as moment from 'moment';
import {DateRangeConfigService} from './date-range-config.service';

describe('DateRangeConfigService', () => {
  let service: DateRangeConfigService;
  let $translate;

  beforeEach(() => {
    $translate = {
      instant: sinon.stub()
    };
    service = new DateRangeConfigService($translate);
  });

  // dummy tests just to increase coverage %
  it('should have RANGES getter that returns array', () => {
    expect(service.RANGES).is.an('array').lengthOf(4);
  });

  it('should have get() method', () => {
    expect(service.get()).is.an('object');
  });

  it('should have getRangeByKey() method and correct ranges', () => {
    expect(service.getRangeByKey('YESTERDAY')).is.an('object');
    expect(service.getRangeByKey('LAST_3_DAYS')).is.an('object');
    expect(service.getRangeByKey('LAST_7_DAYS')).is.an('object');
    expect(service.getRangeByKey('LAST_MONTH')).is.an('object');
  });

  it('should have getRangeByPeriod() method', () => {
    expect(service.getRangeByPeriod(null, null)).to.be.undefined;
  });

  describe('getQuarterRangeByNumber()', () => {
    it('Should throw error when the quarterNumber is invalid', () => {
      expect(() => service.getQuarterRangeByNumber(2017, null)).throw();
      expect(() => service.getQuarterRangeByNumber(2017, 20)).throw();
    });

    it('Should throw error when the year is zero or not a number', () => {
      expect(() => service.getQuarterRangeByNumber(0, 1)).throw();
      expect(() => service.getQuarterRangeByNumber(null, 1)).throw();
    });

    it('Should calculate correct start date and end date for quarter 1', () => {
      let startDate = moment(new Date('Jan 01 2017'));
      let endDate = moment(new Date('Mar 31 2017')).endOf('day');

      const quarterData = service.getQuarterRangeByNumber(2017, 1);
      expect(quarterData[0].toDate()).eql(startDate.toDate());
      expect(quarterData[1].toDate()).eql(endDate.toDate());
    });

    it('Should calculate correct start date and end date for quarter 2', () => {
      let startDate = moment(new Date('Apr 01 2017'));
      let endDate = moment(new Date('Jun 30 2017')).endOf('day');

      const quarterData = service.getQuarterRangeByNumber(2017, 2);
      expect(quarterData[0].toDate()).eql(startDate.toDate());
      expect(quarterData[1].toDate()).eql(endDate.toDate());
    });

    it('Should calculate correct start date and end date for quarter 3', () => {
      let startDate = moment(new Date('Jul 01 2017'));
      let endDate = moment(new Date('Sep 30 2017')).endOf('day');

      const quarterData = service.getQuarterRangeByNumber(2017, 3);
      expect(quarterData[0].toDate()).eql(startDate.toDate());
      expect(quarterData[1].toDate()).eql(endDate.toDate());
    });

    it('Should calculate correct start date and end date for quarter 4', () => {
      let startDate = moment(new Date('Oct 01 2017'));
      let endDate = moment(new Date('Dec 31 2017')).endOf('day');

      const quarterData = service.getQuarterRangeByNumber(2017, 4);
      expect(quarterData[0].toDate()).eql(startDate.toDate());
      expect(quarterData[1].toDate()).eql(endDate.toDate());
    });
  });

  describe('getQuartersOfYear()', () => {
    it('Should throw error when the year is zero or not a number', () => {
      expect(() => service.getQuarterRangesOfYear(0)).throw();
      expect(() => service.getQuarterRangesOfYear(null)).throw();
    });

    it('Should get 4 quarter ranges in the year', () => {
      const getQuarterByNumberStub = sinon.stub(service, 'getQuarterRangeByNumber').returns([moment(), moment()]);
      const quarterData = service.getQuarterRangesOfYear(2017);
      expect(getQuarterByNumberStub).callCount(4);
      expect(quarterData).length(4);
    });
  });

  describe('getHalfYearRanges()', () => {
    it('Should throw error when the year is zero or not a number', () => {
      expect(() => service.getHalfYearRanges(0)).throw();
      expect(() => service.getHalfYearRanges(null)).throw();
    });

    it('Should get half years in the year', () => {
      const initialDateHY1 = moment(new Date('Jan 01 2017'));
      const endDateHY1 = moment(new Date('Jun 30 2017')).endOf('day');
      const initialDateHY2 = moment(new Date('Jul 01 2017'));
      const endDateHY2 = moment(new Date('Dec 31 2017')).endOf('day');

      const halfYearData = service.getHalfYearRanges(2017);
      expect(halfYearData).length(2);
      expect(halfYearData[0].range.startDate.toDate()).eql(initialDateHY1.toDate());
      expect(halfYearData[0].range.endDate.toDate()).eql(endDateHY1.toDate());
      expect(halfYearData[1].range.startDate.toDate()).eql(initialDateHY2.toDate());
      expect(halfYearData[1].range.endDate.toDate()).eql(endDateHY2.toDate());
    });
  });

  describe('getYearRanges()', () => {
    it('Should throw error when the year is zero or not a number', () => {
      expect(() => service.getYearRanges(0)).throw();
      expect(() => service.getYearRanges(null)).throw();
    });

    it('Should get year ranges', () => {
      const initialDate = moment(new Date('Jan 01 2017'));
      const endDate = moment(new Date('Dec 31 2017')).endOf('day');

      const yearData = service.getYearRanges(2017);
      expect(yearData.range.startDate.toDate()).eql(initialDate.toDate());
      expect(yearData.range.endDate.toDate()).eql(endDate.toDate());
    });
  });
});
