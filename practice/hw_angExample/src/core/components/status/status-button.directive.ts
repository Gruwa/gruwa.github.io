export default (ngModule) => {
  ngModule.directive('cadStatusButton', [() => {
    let directive = {
      replace: true,
      template: require('./status-button.html'),
      restrict: 'E',
      scope: {
        value: '@'
      },
      link: Link
    };

    function Link(scope, element, attrs) {
      // $eval don't evaluate JavaScript; it evaluate AngularJS expressions
      if (scope.$eval(attrs.disabled)) {
        element.addClass('status-button-disabled');
      }
    }

    return directive;
  }]);
};
