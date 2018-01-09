import {SmartSearchListController} from './smart-search-list.controller';
import {cadSmartGroupSelector} from './smart-group-selector/smart-group-selector.component';

export default (ngModule) => {
  function cadSmartSearchListDirective() {
    let itemCustomTemplate = '';

    return {
      restrict: 'E',
      template: _templateFn,
      compile: _compileFn,
      require: {
        dropdownController: '?^^cadDropdown'
      },
      replace: true, // should be removed but it results to bugs with CSS due to many nested selectors
      scope: {
        items: '=', // all items list
        selected: '=', // only selected items
        onSelected: '&', // notify this callback when selection changed
        details: '=', // used to send array of details objects
        multiSelect: '@?',
        searchQuery: '=?',
        searchDebounceInterval: '@?',
        noResultsMessage: '@?',
        searchPlaceholder: '@?',
        selectionPopover: '=?',
        externalSearch: '@?',
        labelField: '@?',
        groupByField: '@?',
        minLength: '@?',
        tooltipPlacement: '@?',
        showSpinner: '=?',
        bottomSpinner: '=?'
      },
      controller: SmartSearchListController,
      controllerAs: 'vm',
      bindToController: true
    };

    // copy html inside this directive instance before it processed by angular compiler
    function _templateFn(elem) {
      itemCustomTemplate = elem[0].innerHTML.trim();
      return require('./smart-search-list.html');
    }

    // transform directive's DOM here
    function _compileFn(elem, attrs) {
      let repeatedItem = elem.find('repeated-item'); // angular's jqLite can search by tag name only
      let ngRepeat = repeatedItem.parent();

      // replace default template inside ng-repeat with custom one, if any
      if (itemCustomTemplate) {
        repeatedItem.replaceWith(itemCustomTemplate);
      }

      // add virtual scroll wrapper over ng-repeat
      if (angular.isDefined(attrs.virtualScroll)) {
        let repeatedItemSize: string = attrs.virtualScroll;
        const isGroupFieldEnabled = angular.isDefined(attrs.groupByField);
        const isItemSizeDefined = repeatedItemSize.length > 0;

        if (isGroupFieldEnabled && !isItemSizeDefined) {
          repeatedItemSize = '50';
        }

        ngRepeat.wrap(`<div vs-repeat="${ repeatedItemSize }" vs-scroll-parent=".cad-search-list__body">`);
      }
    }
  }

  ngModule.directive('cadSmartSearchList', cadSmartSearchListDirective);
  ngModule.component('cadSmartGroupSelector', cadSmartGroupSelector);
};
