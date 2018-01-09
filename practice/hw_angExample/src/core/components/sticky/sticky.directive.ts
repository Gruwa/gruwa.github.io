export default (ngModule) => {
  ngModule.directive('cadSticky', ['$window', ($window) => {
    let directive = {
      restrict: 'A',
      scope: {
        stickyFrom: '@'
      },
      link: (scope, element) => {
        let stickyFrom = scope.stickyFrom || 0;
        angular.element($window).bind('scroll', function() {
          element.toggleClass('is-fixed', this.pageYOffset > stickyFrom);
        });
      }
    };

    return directive;
  }]);
};
