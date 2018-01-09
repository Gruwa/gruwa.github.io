import {IValidationMessage, ValidationErrorMessagesService} from './validation-error-messages.service';

export class CadValidationErrorMessagesController {
  public fieldErrorMessage: string;

  private form: ng.IFormController;
  private field: ng.INgModelController;

  private errors: IValidationMessage[];
  private errorsParams: any;
  private formValidator: Function;
  private formValidatorLinkedCollection: ng.INgModelController[];
  private elementValidator: (data) => [string, boolean] | ng.IPromise<[string, boolean]>;
  private displayCondition: boolean;

  private ERRORS: IValidationMessage[] = [];

  constructor(
    private $scope: ng.IScope,
    private $translate: ng.translate.ITranslateService,
    private $q: ng.IQService,
    private $log: ng.ILogService,
    private validationErrorMessagesService: ValidationErrorMessagesService
  ) {
    'ngInject';

    this.errorsParams = this.errorsParams || {};

    if (!_.isEmpty(this.errors)) {
      this.ERRORS = _.uniqBy(this.errors.concat(this.validationErrorMessagesService.errors), 'name');
    } else {
      this.ERRORS = [].concat(this.validationErrorMessagesService.errors);
    }

    if (this.formValidator) {
      if (!_.isEmpty(this.formValidatorLinkedCollection)) {
        $scope.$watchCollection(
          () => _.map(this.formValidatorLinkedCollection, '$modelValue'),
          this.formValidatorProxy.bind(this)
        );
      } else {
        $scope.$watch(() => this.field.$modelValue, this.formValidatorProxy.bind(this));
      }
    }

    if (this.elementValidator) {
      $scope.$watch(() => this.field.$modelValue, this.elementValidatorProxy.bind(this));
    }

    $scope.$watchCollection(() => this.field.$error, this._updateFieldError.bind(this));
  }

  isElementInteracted() {
    if (this.displayCondition) {
      return this.displayCondition;
    }
    return this.field.$invalid && (this.field.$touched || this.field.$dirty || this.form.$submitted);
  }

  private _updateFieldError(): void {
    if (_.isEmpty(this.field.$error)) {
      this.fieldErrorMessage = '';
      return;
    }

    let errors: IValidationMessage[] = _.filter(this.ERRORS, error => error.name in this.field.$error);
    if (_.isEmpty(errors)) {
      this.$log.error('No translations for errors: ' + JSON.stringify(this.field.$error));
      this.fieldErrorMessage = '';
      return;
    }

    errors = _.sortBy(errors, o => o.priority);

    this.fieldErrorMessage = this.$translate.instant(errors[0].message, this.errorsParams[errors[0].name]);
  }

  private formValidatorProxy(newValue, oldValue): void {
    if (newValue === oldValue) {
      return;
    }
    this.formValidator({
      form: this.form
    });
  }

  /*
   elementValidator should return one of the following
    - array res, where
      res[0]: string (error name)
      res[1]: true/false (result of validation)
    - promise that resolved into res, where
      res[0]: string (error name)
      res[1]: true/false (result of validation)
   */
  private elementValidatorProxy(newValue, oldValue): void {
    if (newValue === oldValue) {
      return;
    }

    let promise: ng.IPromise<[string, boolean]> = this.$q.when(this.elementValidator({
      newValue,
      oldValue
    }));

    promise.then(res => {
      if (!_.isArray(res) || res.length !== 2) {
        this.$log.error('validation return error');
      } else {
        this.field.$setValidity(res[0], res[1]);
      }
    }).catch(() => {
      this.$log.error('could not execute validation, validation is rejected');
    });
  }
}

export function CadValidationErrorMessagesDirective(): ng.IDirective {
  'ngInject';

  const ERROR_MESSAGE_TYPE = 'text';

  let directive = {
    restrict: 'E',
    templateUrl: (tElement, tAttrs) => {
      if (_.isEmpty(tAttrs.type)) {
        tAttrs.type = ERROR_MESSAGE_TYPE;
      }
      return `validation-error-messages-${tAttrs.type}.html`;
    },
    scope: {
      type: '@',
      form: '<',
      field: '<',
      displayCondition: '=?',
      errors: '<?',
      errorsParams: '<?',
      elementValidator: '&?',
      formValidator: '&?',
      formValidatorLinkedCollection: '<'
    },
    controller: <ng.IControllerConstructor> CadValidationErrorMessagesController,
    controllerAs: 'vm',
    bindToController: true
  };

  return directive;
}
