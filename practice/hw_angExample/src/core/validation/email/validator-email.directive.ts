import {EMAIL_REGEXP} from '../../../ng2/common/validators/email/email-validator.directive';

export default (ngModule) => {
  function CadValidatorEmail() {
    let directive = {
      restrict: 'A',
      require: 'ngModel',
      link
    };

    return directive;

    function link(scope, element, attrs, model) {
      model.$validators.email = (modelValue, viewValue) => {
        return EMAIL_REGEXP.test(viewValue);
      };
    }
  }

  ngModule.directive('cadValidatorEmail', CadValidatorEmail);
};
