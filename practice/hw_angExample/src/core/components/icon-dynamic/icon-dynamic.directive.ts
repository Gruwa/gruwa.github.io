export default (ngModule) => {
  function cadIconDynamicDirective() {
    return {
      link,
      replace: true,
      template: require('./icon-dynamic.html'),
      restrict: 'E',
      scope: {
        name: '@',
        customClass: '@?'
      },
      controllerAs: 'vm',
      /* tslint:disable:no-empty */
      controller: () => {
      },
      bindToController: true
    };

    function link(scope, element, attrs) {
      scope.iconStyle = {
        width: attrs.width + 'px' || 'auto',
        height: attrs.height + 'px' || 'auto',
        fill: attrs.fill
      };
    }
  }

  ngModule
    .directive('cadIconDynamic', cadIconDynamicDirective);
};
