import validationList from './validation-list/validation-list.directive';
import validatorEmailDirective from './email/validator-email.directive';
import {cadValidatorPassword} from './password/validator-password.directive';
import {cadLessThan} from './greater-than/less-than.directive';

require('./validation-template.html');

const ngModule = angular.module('cadreon.core.validation', ['ngFabForm']);

ngModule
  .directive('cadLessThan', cadLessThan)
  .directive('cadValidatorPassword', cadValidatorPassword)
  .config(ngFabFormProvider => {
    'ngInject';

    // ng-fab-form configuration
    const customInsertFn = (compiledAlert, el) => {
      // Should not add validation for inputs inside block with class .uib-timepicker.
      // This is bootstrap directive for choosing time. Validation divs break formatting
      // of this element.
      if (angular.element(el).parents('.uib-timepicker').length === 0) {
        let formGroup = el.parent().after(compiledAlert);
        formGroup.after(compiledAlert);
      }
      // Custom validation errors placement for advertiser mapping table
      if (angular.element('.ng-fab-form_custom_error_holder').length > 0) {
        angular.element('.ng-fab-form_custom_error_holder').append(compiledAlert);
      }
    };

    ngFabFormProvider.setInsertErrorTplFn(customInsertFn);
    ngFabFormProvider.extendConfig({
      globalFabFormDisable: true,
      validationsTemplate: 'core/validation/validation-template.html'
    });
  })
;

validationList(ngModule);
validatorEmailDirective(ngModule);

export default ngModule;
