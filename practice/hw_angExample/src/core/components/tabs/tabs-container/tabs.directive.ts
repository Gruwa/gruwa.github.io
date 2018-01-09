export default (ngModule) => {
  ngModule.directive('cadTabs', [() => {
    let directive = {
      replace: true,
      template: require('./tabs.html'),
      restrict: 'E',
      transclude: true,
      scope: {
        type: '@'	// simple || blue || rounded || orange (with underline in design)
      }
    };

    return directive;
  }]);
};
