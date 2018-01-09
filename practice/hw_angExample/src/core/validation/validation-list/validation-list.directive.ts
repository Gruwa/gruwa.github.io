export default ngModule => {
  ngModule.directive('cadValidationTemplateList', () => ({
      template: require('./validation-list.html'),
      restrict: 'E',
      transclude: true
    })
  );
};
