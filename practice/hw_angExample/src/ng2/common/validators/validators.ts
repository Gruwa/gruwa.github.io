import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import * as moment from 'moment';

export class CadValidators {
  /**
   * Check if control value (end date) is after other control value (start date)
   * If startDateSource is string - 2 controls should be in the same FormGroup
   *
   * @param {string | () => AbstractControl} startDateSource - Key name of control which we are compared with or
   *                                                           the function that return this control
   * @param {string} format - Moment format used for outputting error
   * @returns {ValidatorFn}
   */
  static isAfterStartDate(startDateSource: string | (() => AbstractControl), format = 'LL'): ValidatorFn {
    return (endDateControl: AbstractControl): null | ValidationErrors => {
      let startDateControl: AbstractControl;

      if (_.isString(startDateSource) && endDateControl.parent) {
        startDateControl = endDateControl.parent.controls[startDateSource];
      }

      if (_.isFunction(startDateSource)) {
        startDateControl = startDateSource();
      }

      if (!startDateControl) {
        return null;
      }

      let startDate = moment(startDateControl.value);
      let endDate = moment(endDateControl.value);

      if (!startDate.isValid()) {
        return null;
      }

      if (!endDate.isValid()) {
        return null;
      }

      if (endDate.isBefore(startDate)) {
        return {dateIsNotAfterStartDate: {startDate: startDate.format(format), date: endDate.format(format)}};
      }

      return null;
    };
  }

  /**
   * Checks if date is before as specified
   *
   * @param {moment.Moment} comparedDate - date we compare with
   * @param {string} format - Moment format used for outputting error
   * @returns {ValidatorFn}
   */
  static isBefore(comparedDate: moment.Moment, format = 'LL'): ValidatorFn {
    return this.isBeforeFactory(comparedDate, false, format);
  }

  /**
   * Checks if date is before or the same as specified
   *
   * @param {moment.Moment} comparedDate - date we compare with
   * @param {string} format - Moment format used for outputting error
   * @returns {ValidatorFn}
   */
  static isSameOrBefore(comparedDate: moment.Moment, format = 'LL'): ValidatorFn {
    return this.isBeforeFactory(comparedDate, true, format);
  }

  /**
   * Checks if date is after as specified
   *
   * @param {moment.Moment} comparedDate - date we compare with
   * @param {string} format - Moment format used for outputting error
   * @returns {ValidatorFn}
   */
  static isAfter(comparedDate: moment.Moment, format = 'LL'): ValidatorFn {
    return this.isAfterFactory(comparedDate, false, format);
  }

  /**
   * Checks if date is after or the same as specified
   *
   * @param {moment.Moment} comparedDate - date we compare with
   * @param {string} format - Moment format used for outputting error
   * @returns {ValidatorFn}
   */
  static isSameOrAfter(comparedDate: moment.Moment, format = 'LL'): ValidatorFn {
    return this.isAfterFactory(comparedDate, true, format);
  }

  /**
   * Check if number of decimals digits is less then specified
   *
   * @param {number} maxDecimals
   * @returns {ValidatorFn}
   */
  static maxDecimals(maxDecimals: number): ValidatorFn {
    return (formControl: AbstractControl): null | ValidationErrors => {
      const decLength = _.get(String(formControl.value).split('.')[1], 'length', 0);
      return maxDecimals < decLength
        ? {numberDecimalsExceed: {value: decLength, maxDecimals}}
        : null;
    };
  }

  /**
   * Check if control value (number) is greater other control value (number)
   * If compareFormControlSource is string - 2 controls should be in the same FormGroup
   *
   * @param {string | () => AbstractControl} compareFormControlSource
   * @returns {ValidatorFn}
   */
  static isGreater(compareFormControlSource: string | (() => AbstractControl)): ValidatorFn {
    return (formControl: AbstractControl): null | ValidationErrors => {
      let compareFormControl: AbstractControl;

      if (_.isString(compareFormControlSource) && formControl.parent) {
        compareFormControl = formControl.parent.controls[compareFormControlSource];
      }

      if (_.isFunction(compareFormControlSource)) {
        compareFormControl = compareFormControlSource();
      }

      if (!compareFormControl) {
        return null;
      }

      if (!_.isNumber(formControl.value)) {
        return null;
      }

      if (!_.isNumber(compareFormControl.value)) {
        return null;
      }

      if (formControl.value < compareFormControl.value) {
        return {numberIsNotGreater: {min: compareFormControl.value, value: formControl.value}};
      }

      return null;
    };
  }

  /**
   * Check if control value (number) is less then other control value (number)
   * If compareFormControlSource is string - 2 controls should be in the same FormGroup
   *
   * @param {string | () => AbstractControl} compareFormControlSource
   * @returns {ValidatorFn}
   */
  static isLess(compareFormControlSource: string | (() => AbstractControl)): ValidatorFn {
    return (formControl: AbstractControl): null | ValidationErrors => {
      let compareFormControl: AbstractControl;

      if (_.isString(compareFormControlSource) && formControl.parent) {
        compareFormControl = formControl.parent.controls[compareFormControlSource];
      }

      if (_.isFunction(compareFormControlSource)) {
        compareFormControl = compareFormControlSource();
      }

      if (!compareFormControl) {
        return null;
      }

      let formControlValue = _.toNumber(formControl.value);
      let compareFormControlValue = _.toNumber(compareFormControl.value);

      if (!_.isNumber(formControlValue)) {
        return null;
      }

      if (!_.isNumber(compareFormControlValue)) {
        return null;
      }

      if (formControlValue > compareFormControlValue) {
        return {numberIsNotLess: {max: compareFormControlValue, value: formControlValue}};
      }

      return null;
    };
  }

  static isNumber(formControl: AbstractControl): null | ValidationErrors {
    return isNaN(formControl.value) || !isFinite(formControl.value) || _.toString(formControl.value).match(/\s/)
      ? {number: {value: formControl.value}}
      : null;
  }

  private static isAfterFactory(comparedDate: moment.Moment, couldBeTheSame: boolean, format = 'LL') {
    return (formControl: AbstractControl): null | ValidationErrors => {
      let date = moment(formControl.value);

      if (!comparedDate.isValid()) {
        return null;
      }

      if (!date.isValid()) {
        return null;
      }

      let compareFn = couldBeTheSame ? date.isSameOrAfter.bind(date) : date.isAfter.bind(date);

      if (!compareFn(comparedDate)) {
        return {dateIsNotAfter: {date: comparedDate.format(format)}};
      }

      return null;
    };
  }

  private static isBeforeFactory(comparedDate: moment.Moment, couldBeTheSame: boolean, format = 'LL'): ValidatorFn {
    return (formControl: AbstractControl): null | ValidationErrors => {
      let date = moment(formControl.value);

      if (!comparedDate.isValid()) {
        return null;
      }

      if (!date.isValid()) {
        return null;
      }

      let compareFn = couldBeTheSame ? date.isSameOrBefore.bind(date) : date.isBefore.bind(date);

      if (!compareFn(comparedDate)) {
        return {dateIsNotBefore: {date: comparedDate.format(format)}};
      }

      return null;
    };
  }

}
