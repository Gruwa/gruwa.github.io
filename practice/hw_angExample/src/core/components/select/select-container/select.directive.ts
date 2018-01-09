export default (ngModule) => {
  ngModule.directive('cadSelect', ['$timeout', ($timeout) => {
    let directive = {
      replace: true,
      template: require('./select.html'),
      restrict: 'E',
      transclude: true,
      scope: {
        head: '@',
        headLabel: '@',
        color: '@',
        position: '@',
        icon: '@',
        limit: '@',
        visible: '=?',
        size: '@',
        disable: '=?'
      },
      link: (scope) => {
        scope.visible = false;
        scope.click = click;
        scope.close = close;
        scope.open = open;

        scope.$on('dropdown:close', close);

        function close() {
          scope.visible = false;
        }

        function open() {
          $timeout(() => {
            scope.visible = true;
          });
        }

        function click() {
          if (!scope.disable) {
            if (scope.visible) {
              close();
            } else {
              open();
            }
          }
        }
      }
    };

    return directive;
  }]);
};
