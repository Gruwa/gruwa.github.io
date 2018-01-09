export default function CadSelect4Directive($timeout): ng.IDirective {
  'ngInject';

  let directive = {
    restrict: 'E',
    template: '<select class="select4"></select>',
    scope: {
      options: '='
    },
    controller: 'select4Controller',
    priority: 1,
    require: ['cadSelect4', 'ngModel'],
    transclude: true,
    replace: true,
    link: _linkFn
  };

  function _linkFn($scope, $element, $attrs, ctrls, transcludeFn) {
    let cadSelect4ctrl = ctrls[0];
    let ngModelCtrl = ctrls[1];

    if (_.has($attrs, 'multiple')) {
      cadSelect4ctrl.options.multiple = true;
    }

    $scope.$watch(() => ngModelCtrl.$modelValue, (newValue, oldValue) => {
      if (_.isEmpty(newValue) && newValue !== oldValue) {
        $element.val(newValue);
        $element.trigger('change.select2');
      }
    });

    $scope.$watch($attrs.ngModel, () => {
      initSelect2(angular.copy(ngModelCtrl.$modelValue));
    });

    function initSelect2(initialValues: any) {
      let options = angular.copy(cadSelect4ctrl.options);

      // this is required to for case when only 1 items can be selected
      if (!_.isArray(initialValues))  {
        initialValues = [initialValues];
      }

      if (!_.isEmpty(initialValues)) {
        options.data = initialValues;
      }

      $element.select2(options);
      cadSelect4ctrl.setElement($element);

      $timeout(() => {
        $element.val(_.map(initialValues, 'id'));
        $element.trigger('change');
      });

      function openWhenReady() {
        let offset = $element.next().offset();
        if (offset.top === 0 && offset.left === 0) {
          $timeout(openWhenReady);
        } else {
          $element.select2('open');
        }
      }

      $scope.$on('select4:focus', openWhenReady);

      $scope.$on('select4:open', () => $element.select2('open'));

      $scope.$on('select4:close', () => $element.select2('close'));

      transcludeFn((clone) => {
        $element.append(clone);
      });
    }
  }

  return directive;
}
