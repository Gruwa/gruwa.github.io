export default (ngModule) => {
  ngModule.directive('cadIcon', [() => {
    return {
      link,
      replace: true,
      template: require('./icon.html'),
      restrict: 'E',
      scope: {
        name: '@',
        customClass: '@'
      },
      controllerAs: 'vm',
      /* tslint:disable:no-empty */
      controller: () => {
      },
      bindToController: true

    };

    function link(scope, element, attrs) {
      element.css({
        width: attrs.width + 'px' || 'auto',
        height: attrs.height + 'px' || 'auto',
        fill: attrs.fill
      });
    }
  }]);
};
