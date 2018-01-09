import * as moment from 'moment';
import Moment = moment.Moment;

export function dateTimeValidationDirectiveFactory(name: string,
                                                   validationFn: (startDate: Moment, endDate: Moment) => boolean) {
  'ngInject';

  return () => {
    return {
      require: '?ngModel',
      link: ($scope, $element, $attrs, ngModelCtrl) => {
        // to do comparison we need to know a format which is used
        // for storing date object in model. this info is provied in
        // 'cadDateTimePicker' directive. so we ought to depend on it
        // in order to be sure to get modelFormat string that is passed with
        // help of 'cadDateTimePicker' attribute

        // cad-date-time-picker="{'modelFormat': 'YYYY-MM-DDTHH:mm'}"

        if (angular.isUndefined($attrs.cadDateTimePicker)) {
          throw '`cadDateTimePicker` attribute should be defined';
        }

        let modelOptions = $scope.$eval($attrs.cadDateTimePicker);

        ngModelCtrl.$validators[name] = (modelValue) => {
          let startDate = moment($attrs[name], modelOptions.modelFormat);
          let endDate = moment(modelValue, modelOptions.modelFormat);

          return validationFn(startDate, endDate);
        };

        $attrs.$observe(name, () => {
          ngModelCtrl.$validate();
        });
      },
      restrict: 'A'
    };
  };
}

export function validateAfterFn(startDate: Moment, endDate: Moment) {
  let setValidity = (startDate.isValid() && endDate.isValid()) ? startDate.isBefore(endDate) : true;
  return setValidity;
}

export function validateAfterOrEqualFn(startDate: Moment, endDate: Moment) {
  let setValidity = (startDate.isValid() && endDate.isValid()) ? startDate.isSameOrBefore(endDate) : true;
  return setValidity;
}

export function validateBeforeFn(startDate: Moment, endDate: Moment) {
  let setValidity = (startDate.isValid() && endDate.isValid()) ? startDate.isAfter(endDate) : true;
  return setValidity;
}

export function validateBeforeOrEqualFn(startDate: Moment, endDate: Moment) {
  let setValidity = (startDate.isValid() && endDate.isValid()) ? startDate.isSameOrAfter(endDate) : true;
  return setValidity;
}
