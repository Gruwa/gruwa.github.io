export default (ngModule) => {
  ngModule.directive('cadStatus', [() => {
    let directive = {
      replace: true,
      template: require('./status.html'),
      restrict: 'E',
      scope: {
        value: '=',
        prefix: '@?'
      }
    };

    return directive;
  }]);
};
