export default (ngModule) => {
  ngModule.directive('cadSubheader', [() => {
    let directive = {
      replace: true,
      template: require('./subheader.html'),
      restrict: 'E',
      transclude: true
    };

    return directive;
  }]);
};
