export function DateRangePickerDirective(): ng.IDirective {
  'ngInject';

  return {
    restrict: 'A',
    link: _linkFn
  };

  function _linkFn(scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) {
    attrs.$set('readonly', true);
  }
}
