export default (ngModule) => {
  ngModule.directive('cadSwitchRadio', [() => {
  let directive = {
    replace: true,
    transclude: true,
    template: require('./switch-radio.html'),
    restrict: 'E',
    scope: {
      text: '@',
      name: '@',
      model: '=',
      value: '@',
      disabled: '=',
      change: '&',
      hint: '@',
      strongHint: '@'
    }
  };

  return directive;
  }]);
};
