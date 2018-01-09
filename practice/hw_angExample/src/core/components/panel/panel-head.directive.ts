export default (ngModule) => {
  ngModule.directive('cadPanelHead', [() => {
    let directive = {
      replace: true,
      require: '^cadPanel',
      template: require('./panel-head.html'),
      restrict: 'E',
      transclude: {
        title: '?cadPanelHeadTitle',
        preTitle: '?cadPanelHeadPreTitle'
      },
      scope: {
        head: '@',
        counter: '@',
        headColumnWidth: '@'
      },
      link: (scope, element, attrs, cadPanelCtrl) => {
        scope.headColumnWidth = scope.headColumnWidth ? scope.headColumnWidth : 50;
        scope.$watch(() => cadPanelCtrl.getState(), (newState) => {
          scope.isOpen = newState;
        });
        element.bind('click', () => {
          cadPanelCtrl.toggle();
          scope.isOpen = cadPanelCtrl.getState();
          scope.$apply();
        });
      }
    };

    return directive;
  }]);
};
