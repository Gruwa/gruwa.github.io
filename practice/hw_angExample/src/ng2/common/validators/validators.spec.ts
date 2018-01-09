import {CadValidators} from './';
import * as moment from 'moment';

describe('CadValidators -> ', () => {
  describe('isAfterStartDate -> ', () => {
    let validateFn;

    let startDateControl: any = {};
    let endDateControl: any = {};
    let formGroup = {
      controls: {
        startDate: startDateControl,
        endDate: endDateControl
      }
    };

    beforeEach(() => {
      startDateControl.value = '';
      startDateControl.parent = formGroup;
      endDateControl.value = '';
      endDateControl.parent = formGroup;
    });

    it('should return null if startDateSource is not set', () => {
      validateFn = CadValidators.isAfterStartDate(null);

      expect(validateFn(endDateControl)).to.be.null;
    });

    it('should return null if startDateSource is incorrect', () => {
      validateFn = CadValidators.isAfterStartDate('incorrectName');

      expect(validateFn(endDateControl)).to.be.null;
    });

    it('should return null if endDateControl is from another formGroup', () => {
      validateFn = CadValidators.isAfterStartDate('startDate');

      expect(validateFn({})).to.be.null;
      expect(validateFn({
        parent: {
          controls: {}
        }
      })).to.be.null;
    });

    it('should return null if startDateSource is function and returns incorrect control', () => {
      validateFn = CadValidators.isAfterStartDate(() => null);

      expect(validateFn({})).to.be.null;
    });

    it('should return null if startDate value is not a date', () => {
      startDateControl.value = null;
      endDateControl.value = moment();
      validateFn = CadValidators.isAfterStartDate('startDate');
      expect(validateFn(endDateControl)).to.be.null;
    });

    it('should return null if endDate value is not a date', () => {
      startDateControl.value = moment();
      endDateControl.value = null;
      validateFn = CadValidators.isAfterStartDate('startDate');
      expect(validateFn(endDateControl)).to.be.null;
    });

    it('should return error object if endDate before startDate', () => {
      startDateControl.value = moment().add(1, 'day');
      endDateControl.value = moment();
      validateFn = CadValidators.isAfterStartDate('startDate', 'LL');
      expect(validateFn(endDateControl)).to.deep.equal({
        dateIsNotAfterStartDate: {
          startDate: startDateControl.value.format('LL'),
          date: endDateControl.value.format('LL')
        }
      });
    });

    it('should return error object if endDate before startDate (function)', () => {
      startDateControl.value = moment().add(1, 'day');
      endDateControl.value = moment();
      validateFn = CadValidators.isAfterStartDate(() => startDateControl, 'LL');
      expect(validateFn(endDateControl)).to.deep.equal({
        dateIsNotAfterStartDate: {
          startDate: startDateControl.value.format('LL'),
          date: endDateControl.value.format('LL')
        }
      });
    });

    it('should return null if startDate before endDate', () => {
      startDateControl.value = moment().subtract(1, 'day');
      endDateControl.value = moment();
      validateFn = CadValidators.isAfterStartDate('startDate', 'LL');
      expect(validateFn(endDateControl)).to.be.null;
    });

  });

  describe('isBefore -> ', () => {
    let formControl: any = {};

    beforeEach(() => {
      formControl.value = moment();
    });

    it('should return null if date is invalid', () => {
      let date = moment(null);
      let validateFn = CadValidators.isBefore(date);

      expect(validateFn(formControl)).to.be.null;
    });

    it('should return null if control value is invalid', () => {
      let date = moment();
      formControl.value = null;

      let validateFn = CadValidators.isBefore(date);

      expect(validateFn(formControl)).to.be.null;
    });

    it('should return null if control date is before date', () => {
      let date = moment();
      formControl.value = moment().subtract(1, 'day');

      let validateFn = CadValidators.isBefore(date);

      expect(validateFn(formControl)).to.be.null;
    });

    it('should return error object if control date is after date', () => {
      let date = moment();
      formControl.value = moment().add(1, 'day');

      let validateFn = CadValidators.isBefore(date, 'LL');

      expect(validateFn(formControl)).to.deep.equal({
        dateIsNotBefore: {
          date: date.format('LL')
        }
      });
    });

    it('should return error if date the same', () => {
      let date = moment();
      formControl.value = date;

      let validateFn = CadValidators.isBefore(date, 'LL');

      expect(validateFn(formControl)).to.deep.equal({
        dateIsNotBefore: {
          date: date.format('LL')
        }
      });
    });
  });

  describe('isSameOrBefore -> ', () => {
    let formControl: any = {};

    beforeEach(() => {
      formControl.value = moment();
    });

    it('should return null for the same data', () => {
      let date = moment();
      formControl.value = moment(date);

      let validateFn = CadValidators.isSameOrBefore(date, 'LL');

      expect(validateFn(formControl)).to.be.null;
    });

  });

  describe('isAfter -> ', () => {
    let formControl: any = {};

    beforeEach(() => {
      formControl.value = moment();
    });

    it('should return null if date is invalid', () => {
      let date = moment(null);
      let validateFn = CadValidators.isAfter(date);

      expect(validateFn(formControl)).to.be.null;
    });

    it('should return null if control value is invalid', () => {
      let date = moment();
      formControl.value = null;

      let validateFn = CadValidators.isAfter(date);

      expect(validateFn(formControl)).to.be.null;
    });

    it('should return null if control date is after date', () => {
      let date = moment();
      formControl.value = moment().add(1, 'day');

      let validateFn = CadValidators.isAfter(date);

      expect(validateFn(formControl)).to.be.null;
    });

    it('should return error object if control date is before date', () => {
      let date = moment();
      formControl.value = moment().subtract(1, 'day');

      let validateFn = CadValidators.isAfter(date, 'LL');

      expect(validateFn(formControl)).to.deep.equal({
        dateIsNotAfter: {
          date: date.format('LL')
        }
      });
    });

    it('should return error if data the same', () => {
      let date = moment();
      formControl.value = date;

      let validateFn = CadValidators.isAfter(date, 'LL');

      expect(validateFn(formControl)).to.deep.equal({
        dateIsNotAfter: {
          date: date.format('LL')
        }
      });
    });
  });

  describe('isSameOrAfter -> ', () => {
    let formControl: any = {};

    beforeEach(() => {
      formControl.value = moment();
    });

    it('should return null if date the same', () => {
      let date = moment();
      formControl.value = date;

      let validateFn = CadValidators.isSameOrAfter(date, 'LL');

      expect(validateFn(formControl)).to.be.null;
    });
  });

  describe('maxDecimals -> ', () => {
    let formControl: any = {};

    it('should return null if number of decimals less then specified', () => {
      formControl.value = 123123;
      let validateFn = CadValidators.maxDecimals(3);
      expect(validateFn(formControl)).to.be.null;
    });

    it('should return null if number of decimals less then specified', () => {
      formControl.value = 123123.211;
      let validateFn = CadValidators.maxDecimals(3);
      expect(validateFn(formControl)).to.be.null;
    });

    it('should return error object if number of decimals less then specified', () => {
      formControl.value = 123123.2112;
      let validateFn = CadValidators.maxDecimals(3);
      expect(validateFn(formControl)).to.deep.equal({
        numberDecimalsExceed: {
          value: 4,
          maxDecimals: 3
        }
      });
    });
  });

  describe('isGreater ->', () => {
    let validateFn;

    let numberControl1: any = {};
    let numberControl2: any = {};
    let formGroup = {
      controls: {
        number1: numberControl1,
        number2: numberControl2
      }
    };

    beforeEach(() => {
      numberControl1.value = '';
      numberControl1.parent = formGroup;
      numberControl2.value = '';
      numberControl2.parent = formGroup;
    });

    it('should return null if form control value is greater than specified value', () => {
      numberControl1.value = 1;
      numberControl2.value = 2;
      validateFn = CadValidators.isGreater('number1');
      expect(validateFn(numberControl2)).to.be.null;
    });

    it('should return null if form control value is greater than specified value (function)', () => {
      numberControl1.value = 1;
      numberControl2.value = 2;
      validateFn = CadValidators.isGreater(() => numberControl1);
      expect(validateFn(numberControl2)).to.be.null;
    });

    it('should return null if form control value is equal to specified value', () => {
      numberControl1.value = 2;
      numberControl2.value = 2;
      validateFn = CadValidators.isGreater(() => numberControl1);
      expect(validateFn(numberControl2)).to.be.null;
    });

    it('should return error object if form control value is less than specified value', () => {
      numberControl1.value = 3;
      numberControl2.value = 2;
      validateFn = CadValidators.isGreater('number1');
      expect(validateFn(numberControl2)).to.deep.equal({
        numberIsNotGreater: {
          min: 3,
          value: 2
        }
      });
    });
  });

  describe('isLess ->', () => {
    let validateFn;

    let numberControl1: any = {};
    let numberControl2: any = {};
    let formGroup = {
      controls: {
        number1: numberControl1,
        number2: numberControl2
      }
    };

    beforeEach(() => {
      numberControl1.value = '';
      numberControl1.parent = formGroup;
      numberControl2.value = '';
      numberControl2.parent = formGroup;
    });

    it('should return null if form control value is less than specified value', () => {
      numberControl1.value = 2;
      numberControl2.value = 1;
      validateFn = CadValidators.isLess('number1');
      expect(validateFn(numberControl2)).to.be.null;
    });

    it('should return null if form control value is less than specified value (function)', () => {
      numberControl1.value = 2;
      numberControl2.value = 1;
      validateFn = CadValidators.isLess(() => numberControl1);
      expect(validateFn(numberControl2)).to.be.null;
    });

    it('should return null if form control value is equal to specified value', () => {
      numberControl1.value = 2;
      numberControl2.value = 2;
      validateFn = CadValidators.isLess(() => numberControl1);
      expect(validateFn(numberControl2)).to.be.null;
    });

    it('should return error object if form control value is greater than specified value', () => {
      numberControl1.value = 2;
      numberControl2.value = 3;
      validateFn = CadValidators.isLess('number1');
      expect(validateFn(numberControl2)).to.deep.equal({
        numberIsNotLess: {
          max: 2,
          value: 3
        }
      });
    });
  });

  describe('isNumber ->', () => {
    it('should return null if specified value is number', () => {
      let formControl: any = {
        value: 10
      };
      expect(CadValidators.isNumber(formControl)).to.be.null;
    });

    it('should return null if specified value is number', () => {
      let formControl: any = {
        value: -1.210
      };
      expect(CadValidators.isNumber(formControl)).to.be.null;
    });

    it('should return null if specified value is number', () => {
      let formControl: any = {
        value: 1 / 0
      };
      expect(CadValidators.isNumber(formControl)).to.deep.equal({
        number: {
          value: formControl.value
        }
      });
    });

    it('should return error if value contains spaces', () => {
      let formControl: any = {
        value: ' 123 '
      };
      expect(CadValidators.isNumber(formControl)).to.deep.equal({
        number: {
          value: formControl.value
        }
      });
    });

  });
});
