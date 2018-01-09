export default (ngModule) => {
  ngModule.directive('cadSelectItem', [() => {
    let directive = {
      replace: true,
      template: require('./select-item.html'),
      restrict: 'E',
      transclude: true
    };

    return directive;
  }]);
};
