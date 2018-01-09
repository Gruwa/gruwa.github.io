export default (ngModule) => {
  ngModule.directive('cadPanel', [() => {
    let directive = {
      replace: true,
      template: require('./panel.html'),
      require: '?^cadAccordion',
      restrict: 'E',
      transclude: true,
      controller: ['$scope', function($scope) {
        let vm = this;

        $scope.off = () => {
          $scope.isOpen = false;
        };

        $scope.on = () => {
          $scope.isOpen = true;
        };

        vm.getState = () => {
          return $scope.isOpen;
        };

        vm.toggle = () => {
          $scope.isOpen = !$scope.isOpen;
          $scope.$apply();

          $scope.$broadcast('cad-panel:toggle', {isOpen: $scope.isOpen});
        };
      }],
      scope: {
        isOpen: '<?',
        onOpen: '&?',
        onClose: '&?'
      },
      link: (scope, element, attrs, cadAccordionCtrl) => {
        if (attrs.onOpen || attrs.onClose) {
          scope.$watch('isOpen', (isOpen) => {
            if (isOpen && scope.onOpen) scope.onOpen({ isOpen });
            if (!isOpen && scope.onClose) scope.onClose({ isOpen });
          });
        }

        if (cadAccordionCtrl) {
          cadAccordionCtrl.addPanel(scope);
          scope.$watch('isOpen', (newVal) => {
            if (newVal) {
              cadAccordionCtrl.closeOthers(scope);
            }
          });
        }
      }
    };

    return directive;
  }]);
};
