export default (ngModule) => {
  ngModule.directive('cadColumn', [() => {
    let directive = {
      restrict: 'A',
      link: (scope, element, attrs) => {
        element.addClass('column').css('width', attrs.cadColumn + '%');
      }
    };

    return directive;
  }]);
};
