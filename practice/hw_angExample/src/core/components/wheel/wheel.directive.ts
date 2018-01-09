export default (ngModule) => {
  /*@ngInject*/
  ngModule.directive('cadWheel', ($parse, $document) => {
    let action = 'DOMMouseScroll';

    if ('onwheel' in $document[0].createElement('div')) {
      action = 'wheel';
    } else
    if (!_.isEmpty($document.onmousewheel)) {
      action = 'mousewheel';
    }

    let directive = {
      restrict: 'A',
      link: linkFn
    };

    function linkFn($scope, $element, $attrs) {
      let fnWheel = $parse($attrs.cadWheel);

      $element.on(action, event => {
        $scope.$apply(() => {
          fnWheel($scope, {
            $event: event
          });
        });
      });
    }

    return directive;
  });
};
