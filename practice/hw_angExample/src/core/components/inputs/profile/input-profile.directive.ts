export default (ngModule) => {
  ngModule.directive('cadInputProfile', [() => {
    let directive = {
      template: require('./input-profile.html'),
      restrict: 'E',
      scope: {
        icon: '@',
        placeholder: '@',
        type: '@',
        model: '=',
        name: '@',
        maxlength: '@',
        formName: '@'
      }
    };

    return directive;
  }]);
};
