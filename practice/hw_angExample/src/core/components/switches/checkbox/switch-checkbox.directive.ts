export default (ngModule) => {
  ngModule.directive('cadSwitchCheckbox', [() => {
  let directive = {
    replace: true,
    template: require('./switch-checkbox.html'),
    restrict: 'E',
    transclude: true,
    /* TODO remove title property */
    scope: {
      text: '@',
      title: '@',
      click: '&',
      disabled: '=',
      checked: '=',
      tooltipPlacement: '@?'
    }
  };

  return directive;
  }]);
};
