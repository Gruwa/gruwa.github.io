interface ICadAutofocusAttributes extends ng.IAttributes {
  autofocusSelector?: string;
  jqueryAutofocusSelector?: string;
}

const DEFAULT_SELECTOR = 'input';

export function cadAutofocusDirective($timeout: ng.ITimeoutService): ng.IDirective {
  'ngInject';

  return {
    restrict: 'A',
    link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ICadAutofocusAttributes) => {
      scope.$on('autofocus:activate', _setFocus);
      $timeout(_setFocus);

      function _setFocus() {
        let elementToFocus: HTMLElement;

        if (attrs.jqueryAutofocusSelector) {
          elementToFocus = jQuery(element[0]).find(attrs.jqueryAutofocusSelector)[0];
        } else {
          elementToFocus = <HTMLElement> element[0].querySelector(attrs.autofocusSelector || DEFAULT_SELECTOR);
        }

        elementToFocus = elementToFocus || element[0];
        elementToFocus.focus();
      }
    }
  };
}
