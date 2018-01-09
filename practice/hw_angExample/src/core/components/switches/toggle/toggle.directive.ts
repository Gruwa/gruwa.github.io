export default (ngModule) => {
  ngModule.directive('cadToggle', [() => {
    return {
      replace: true,
      template: require('./toggle.html'),
      restrict: 'E',
      scope: {
        disable: '@',
        model: '=',
        onClick: '&'
      },
      link: (scope, element) => {
        if (angular.isUndefined(scope.disable)) {
          scope.disable = 'false';
        }

        element.bind('click', () => {
          if (!element.hasClass('disabled') && angular.isDefined(scope.onClick)) {
            scope.onClick();
            scope.$apply();
          }
        });
      }
    };
  }]);
};
