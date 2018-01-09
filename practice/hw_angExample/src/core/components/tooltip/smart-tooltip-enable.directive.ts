/*
 *
 * Smartly enable Angular UI Bootstrap tooltip only if inner text is truncated due to CSS overflow.
 * Enabling is done via original attribute "tooltip-enable" that is bound to our overflow checker routine.
 *
 * Directive attribute value could be CSS selector to find exact text element inside directive. If no selector
 * provided - current element will be used to track overflow.
 *
 * */

export default (ngModule) => {
  function SmartTooltipEnableDirective($interpolate, $document, deviceDetector) {
    'ngInject';

    return {
      restrict: 'A',
      scope: true, // important! directive must have it's own scope in order to keep track on correct DOM elements
      controller: _controllerFn,
      controllerAs: 'cadSmartTooltipEnableController',
      replace: true,
      transclude: true,
      compile: _compileFn,
      template: (tElement) => {
        let newEl = angular.element($document[0].createElement(tElement[0].nodeName));
        newEl.attr('uib-tooltip-template', '\'copy-clipboard-template.html\'');
        newEl.attr('copy2clipboard', '');
        newEl.attr('ng-transclude', '');
        return newEl[0].outerHTML;
      }
    };

    function _controllerFn($element, $attrs) {
      let vm = this;
      let textElem = $element[0];
      let textSelector = $attrs.cadSmartTooltipEnable;

      // we can check overflow for any element inside this directive, just need to put css selector as attr value
      if (textSelector) {
        textElem = textElem.querySelector(textSelector) || textElem;
      }

      vm.isOverflow = () => {
        return textElem.scrollWidth > textElem.offsetWidth;
      };
    }

    function _compileFn(element, attrs) {
      attrs.$set('tooltipEnable', 'cadSmartTooltipEnableController.isOverflow()');

      if (_.isUndefined(attrs.ignoreCopy2clipboard) && !_.isUndefined(attrs.uibTooltip)) {
        let uibTooltipContent = $interpolate(attrs.uibTooltip, true);

        // Remove simple tooltip directive to avoid 2 tooltip appear
        attrs.$set('uibTooltip', null);

        return (scope, el) => {
          scope.os = deviceDetector.os;
          scope.$watch(uibTooltipContent, (newVal) => {
            scope.tooltipText = newVal;
          });
        };
      } else {
        // if copy2clipboard is ignored - do not render appropriate tooltip
        attrs.$set('uibTooltipTemplate', null);
        attrs.$set('copy2clipboard', null);
      }

    }
  }

  ngModule.directive('cadSmartTooltipEnable', SmartTooltipEnableDirective);
};
