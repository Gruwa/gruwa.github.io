interface INumberDirectiveAttr extends ng.IAttributes {
  ngModel: string;
}

interface INumberOptions {
  max?: number;
  min?: number;
  maxDecimals?: number;
  maxDigits?: number;
  maxIntegerPart?: number;
  restrictInvalid?: boolean;
  format?: boolean;
}

export function CadNumberDirective(
  $locale: ng.ILocaleService,
  $timeout: ng.ITimeoutService,
  $filter: cad.IFilterService
): ng.IDirective {
  'ngInject';

  let DEFAULT_OPTIONS: INumberOptions = {
    max: undefined,
    min: undefined,
    maxDecimals: undefined,
    maxDigits: undefined,
    maxIntegerPart: undefined,
    restrictInvalid: false,
    format: false
  };

  return {
    require: 'ngModel',
    restrict: 'A',
    link: linkFunction
  };

  function linkFunction(scope: ng.IScope,
                        element: ng.IAugmentedJQuery,
                        attrs: INumberDirectiveAttr,
                        controller) {
    let options: INumberOptions = {};

    attrs.$observe('cadNumber', (newValue: string) => {
      options = angular.extend({}, DEFAULT_OPTIONS, scope.$eval(newValue));

      // Need this to display properly error message
      attrs.$set('min', options.min);
      attrs.$set('max', options.max);
      attrs.$set('maxDecimals', options.maxDecimals);
      attrs.$set('maxDigits', options.maxDigits);
      attrs.$set('maxIntegerPart', options.maxIntegerPart);

      if (options.restrictInvalid) {
        scope.$watch(attrs.ngModel, (newVal, oldVal) => {
          if (!newVal && newVal !== '' && newVal !== 0) {
            controller.$setViewValue(oldVal);
            controller.$render();
          }
        });
      }
      controller.$validate();
    });

    // Should return number or parseError
    controller.$parsers.unshift((viewVal) => {
      if (!viewVal) {
        return viewVal;
      }

      viewVal = String(viewVal);
      viewVal = removeGroupSepSymbols(viewVal);

      viewVal = viewVal.replace($locale.NUMBER_FORMATS.DECIMAL_SEP, '.');

      if (isValid(viewVal)) {
        return parseFloat(viewVal);
      } else {
        return viewVal;
      }
    });

    /**
     * Format entered number according to locale
     */
    controller.$formatters.push((val) => {
      if (!options.format) {
        return val;
      }

      if (!isValid(val)) {
        return val;
      }

      return $filter('number')(val, options.maxDecimals);

    });

    // Validate if it is a number
    controller.$validators.cadNumberInvalid = (value) => {
      if (!value) {
        return true;
      }

      return isValid(value);
    };

    // Validate if it more then max
    controller.$validators.cadNumberMax = (value) => {
      return !isValid(value)
        || angular.isUndefined(options.max)
        || value <= Number(options.max);
    };

    // Validate if it less then min
    controller.$validators.cadNumberMin = (value) => {
      return !isValid(value)
        || angular.isUndefined(options.min)
        || value >= Number(options.min);
    };

    // Validate number of decimals
    controller.$validators.cadNumberMaxDecimals = (value) => {
      if (!isValid(value)) {
        return true;
      }

      if (angular.isUndefined(options.maxDecimals)) {
        return true;
      }

      let parts = String(value).split('.');
      let decimals = parts[1] || '';

      if (decimals.length > options.maxDecimals) {
        return false;
      }

      return true;
    };

    // Validate number of digits
    controller.$validators.cadNumberMaxDigits = (value) => {
      if (!isValid(value)) {
        return true;
      }

      if (angular.isUndefined(options.maxDigits)) {
        return true;
      }

      let pure = value.toLocaleString('en-US').replace(/[^\d]/g, '') || '';

      if (pure.length > options.maxDigits) {
        return false;
      }

      return true;
    };

    controller.$validators.cadNumberMaxIntegerPart = (value) => {
      if (!isValid(value)) {
        return true;
      }

      if (angular.isUndefined(options.maxIntegerPart)) {
        return true;
      }

      let parts = String(value).split('.');
      let decimals = parts[0] || '';

      if (decimals.length > options.maxIntegerPart) {
        return false;
      }

      return true;
    };

    element.on('focus', () => {
      let newVal = element.val();
      newVal = removeGroupSepSymbols(newVal);

      element.val(newVal);

      return (<HTMLInputElement> element[0]).select();
    });

    element.on('blur', reformatViewValue);
    $timeout(reformatViewValue);

    function reformatViewValue() {
      controller.$commitViewValue();
      let viewValue = controller.$modelValue;

      if (viewValue === null || !isValid(viewValue)) {
        return;
      }

      viewValue = controller.$formatters.reduce((prev, formatter) => formatter(prev), viewValue);

      controller.$viewValue = viewValue;
      controller.$render();
    }
  }

  function isValid(val) {
    if (isNaN(parseFloat(val)) || !isFinite(val)) {
      return false;
    }

    return true;
  }

  function removeGroupSepSymbols(value: string) {
    if ($locale.NUMBER_FORMATS.GROUP_SEP) {
      value = value.replace(new RegExp('\\' + $locale.NUMBER_FORMATS.GROUP_SEP, 'g'), '');
    }
    return value;
  }

}
