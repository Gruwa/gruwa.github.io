export default (ngModule) => {
  ngModule.directive('cadTabsItem', [() => {
    let directive = {
      replace: true,
      template: require('./tabs-item.html'),
      restrict: 'E',
      transclude: true,
      scope: {
        text: '@',
        active: '=',
        disabled: '=',
        click: '='
      }
    };

    return directive;
  }]);
};
