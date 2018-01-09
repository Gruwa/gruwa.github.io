import {ConfigService} from '../../services/config/config.service';

/* tslint:disable:no-string-literal */
class PasswordValidatorController implements ng.IController {
  form: ng.IFormController;
  password: ng.INgModelController;

  constructor(
    private configService: ConfigService,
    private $attrs: {cadValidatorPasswordConfirmField: string}
  ) {
    'ngInject';
  }

  $doCheck() {
    this.password.$validators['password_is_too_easy'] = (modelValue, viewValue) => {
      return this.configService.passwordRegexp.test(viewValue);
    };

    const confirmField: ng.INgModelController = this.form[this.$attrs.cadValidatorPasswordConfirmField];
    if (confirmField && confirmField.$viewValue) {
      const isValid = this.password.$viewValue === confirmField.$viewValue;
      this.password.$setValidity('passwords_do_not_match', isValid);
      confirmField.$setValidity('passwords_do_not_match', isValid);
    }
  }
}

export function cadValidatorPassword(): ng.IDirective {
  return {
    restrict: 'A',
    require: {
      form: '^^form',
      password: 'ngModel'
    },
    bindToController: true,
    controller: PasswordValidatorController
  };
}
