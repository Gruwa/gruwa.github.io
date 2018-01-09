export default (ngModule) => {
  ngModule.directive('cadChip', [() => {
    let directive = {
      replace: true,
      template: require('./chip.html'),
      restrict: 'E',
      transclude: false,
      scope: {
        text: '@',
        bindHtml: '@',
        onDelete: '&',
        errorMessage: '@',
        iconName: '=?'
      }
    };

    return directive;
  }]);
};
