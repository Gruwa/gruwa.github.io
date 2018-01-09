class LessThanValidatorController implements ng.IController {
  form: ng.IFormController;
  model: ng.INgModelController;

  constructor(private $attrs: { cadLessThan: string }) {
    'ngInject';
  }

  $doCheck() {
    const checkField: ng.INgModelController = this.form[this.$attrs.cadLessThan];
    if (checkField && checkField.$viewValue) {
      const isValid = this.model.$viewValue < checkField.$viewValue;
      this.model.$setValidity('cadValidateLessThan', isValid);
    }
  }
}

export function cadLessThan(): ng.IDirective {
  return {
    restrict: 'A',
    require: {
      form: '^^form',
      model: 'ngModel'
    },
    bindToController: true,
    controller: LessThanValidatorController
  };
}
