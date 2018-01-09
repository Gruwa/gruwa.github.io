export default (ngModule) => {
  ngModule.directive('cadTags', [() => {
    let directive = {
      replace: true,
      template: require('./tags.html'),
      restrict: 'E',
      transclude: true,
      scope: {
        items: '='
      }
    };

    return directive;
  }]);
};
