export default (ngModule) => {
  ngModule.directive('cadSwitches', [() => {
    let directive = {
      replace: true,
      template: require('./switches.html'),
      restrict: 'E',
      transclude: true,
      scope: {
        type: '@',
        view: '@',
        font: '@'
      }
    };

    return directive;
  }]);
};
