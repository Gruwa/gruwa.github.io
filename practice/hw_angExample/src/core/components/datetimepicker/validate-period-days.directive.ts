import * as moment from 'moment';

interface IValidatePeriodAttributes extends ng.IAttributes {
  cadDateTimePicker: string;
  cadDateTimeValidateAfter: string;
  cadValidatePeriodDays: number;
}

export function cadValidatePeriodDays(): ng.IDirective {
  'ngInject';
  return {
    restrict: 'A',
    require: '?ngModel',
    link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: IValidatePeriodAttributes, ngModelCtrl: any) => {
      // to do comparison we need to know a format which is used
      // for storing date object in model. this info is provied in
      // 'cadDateTimePicker' directive. so we ought to depend on it
      // in order to be sure to get modelFormat string that is passed with
      // help of 'cadDateTimePicker' attribute

      // cad-date-time-picker="{'modelFormat': 'YYYY-MM-DDTHH:mm'}"
      // cad-date-time-validate-after="{{ vm.campaign.endDate }}"

      if (angular.isUndefined(attrs.cadDateTimePicker)) {
        throw '`cadDateTimePicker` attribute should be defined';
      }

      let modelOptions = scope.$eval(attrs.cadDateTimePicker);

      ngModelCtrl.$validators.cadValidatePeriod = (modelValue: any) => {
        let startDate = moment(attrs.cadDateTimeValidateAfter, modelOptions.modelFormat);
        let endDate = moment(modelValue, modelOptions.modelFormat);

        return validate(startDate, endDate);
      };

      attrs.$observe('cadDateTimeValidateAfter', (modelValue: any) => {
        let startDate = moment(modelValue, modelOptions.modelFormat);
        let endDate = moment(ngModelCtrl.masterValue, modelOptions.modelFormat);

        ngModelCtrl.$setValidity('cadValidatePeriod', validate(startDate, endDate));
      });

      function validate(startDate, endDate) {
        let setValidity = (startDate.isValid() && endDate.isValid()) ?
                          endDate.diff(startDate, 'days') <= attrs.cadValidatePeriodDays : true;

        return setValidity;
      }
    }
  };
}
