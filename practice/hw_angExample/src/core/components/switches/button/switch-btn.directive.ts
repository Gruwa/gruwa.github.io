export default (ngModule) => {
  ngModule.directive('cadSwitchBtn', [() => {
    let directive = {
      replace: true,
      template: require('./switch-btn.html'),
      restrict: 'E',
      transclude: true
    };

    return directive;
  }]);
};
