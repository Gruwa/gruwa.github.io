export default (ngModule) => {
  function directive() {
    let directive = {
      replace: true,
      template: require('./link-action.html'),
      restrict: 'E',
      transclude: true,
      scope: {
        head: '@',
        titleText: '@',
        color: '@',
        icon: '@',
        limit: '@?',
        size: '@',
        openAction: '&',
        visible: '=?',
        disable: '=?',
        closed: '=?',
        titleEnable: '@?'
      },
      link: (scope) => {
        scope.visible = false;
        scope.click = click;
        scope.close = close;
        scope.open = open;

        scope.$watch('closed', (newValue, oldValue) => {
          if (oldValue && !newValue) {
            scope.close();
          }
        });

        function close() {
          scope.visible = false;
        }

        function open() {
          scope.openAction();
          scope.visible = true;
        }

        function click() {
          if (!scope.disable) {
            open();
          }
        }
      }
    };

    return directive;
  }

  ngModule.directive('cadLinkAction', directive);
};
