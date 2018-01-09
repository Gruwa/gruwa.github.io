import {CadDropdownController} from '../dropdown/dropdown.directive';

export class SmartSearchListController {
  items: any[];
  viewItems = [];
  groupSelectorEnabled = false;
  externalSearch: boolean;
  multiSelect: boolean;
  searchQuery: string;
  highlightString: string;
  selected: any;
  onSelected: (selection: any) => void;
  minLength: number;
  labelField: string;
  groupByField: string;
  private DEFAULT_MIN_LENGTH = 0;
  private dropdownController: CadDropdownController; // Passed from require param in directive configuration

  constructor(
    private $scope: ng.IScope,
    private $filter: cad.IFilterService,
    private $attrs: { virtualScroll?: string },
    private $element: Element
  ) {
    'ngInject';
  }

  $onInit() {
    if (this.dropdownController) {
      this.dropdownController.$scope.$on('dropdown:afterClose', () => {
        this.searchQuery = '';
      });
    }

    this.$scope.$watchCollection(
      () => this.items,
      () => {
        if (angular.isArray(this.items)) {
          this.viewItems = this.items;
          this.groupSelectorEnabled = this.isGroupSelectorEnabled(this.viewItems);
          this.triggerLocalSearch();
          this.setHighlightString();
        }
      }
    );

    // when items array size decreases due to search filtering - vs-repeat doesn't update scroll position
    // so if previously scroll position was at the bottom - we'll see empty list, however list is actually OK
    // it just our scroll position keeps old value and there are no visible items here as list is shorter now
    // see https://github.com/kamilkp/angular-vs-repeat/issues/116
    // as a workaround manually update scroll position of current list
    if (angular.isDefined(this.$attrs.virtualScroll)) {
      this.$scope.$watch(
        () => this.viewItems.length,
        () => this.$element[0].querySelector('.cad-search-list__body').scrollTop = 0
      );
    }

    if (!this.externalSearch) {
      this.$scope.$watch(
        () => this.searchQuery,
        (newVal, oldVal) => {
          if (newVal !== oldVal) {
            this.triggerLocalSearch();
            this.setHighlightString();
          }
        }
      );
    }
  }

  saveItemToSelection(item) {
    if (_.isUndefined(this.multiSelect) || !this.multiSelect) {
      this.selected = item;
    } else {
      let index = this.selectedIndex(item);
      if (index < 0) {
        this.selected.push(item);
      } else {
        _.pullAt(this.selected, index);
      }
    }
    this.callOnSelected();
  }

  resetSelection() {
    this.selected = null;
    this.callOnSelected();
  }

  isItemActive(item): boolean {
    if (_.isUndefined(this.multiSelect) || !this.multiSelect) {
      return angular.equals(item, this.selected);
    }
    return this.selectedIndex(item) > -1;
  }

  private callOnSelected() {
    if (_.isFunction(this.onSelected)) {
      this.onSelected({ selection: this.selected });
    }
  }

  private selectedIndex(item) {
    return _.findIndex(this.selected, (selectedItem) => {
      return angular.equals(item, selectedItem);
    });
  }

  private triggerLocalSearch() {
    if (!this.externalSearch) {
      if (this.shouldTriggerSearch()) {
        this.viewItems = _.filter(this.items, this.filterFn.bind(this));
      } else {
        this.viewItems = this.items || [];
      }
    }
  }

  private setHighlightString() {
    if (this.shouldTriggerSearch()) {
      this.highlightString = this.searchQuery;
    } else {
      this.highlightString = '';
    }
  }

  private shouldTriggerSearch(): boolean {
    return !_.isEmpty(this.searchQuery) && this.isMinLengthOk(this.searchQuery);
  }

  private isMinLengthOk(searchQuery: string): boolean {
    return searchQuery.length >= (this.minLength || this.DEFAULT_MIN_LENGTH);
  }

  private filterFn(item): boolean {
    let itemLabel = this.$filter('translate')(this.$filter('itemLabel')(item, this.labelField));
    return _.includes(itemLabel.toLowerCase(), this.searchQuery.toLowerCase());
  }

  private isGroupSelectorEnabled(viewItems: any[]): boolean {
    return _.isString(this.groupByField)
      && this.groupByField.length > 0
      && viewItems.length
      && _.isString(viewItems[0][this.groupByField]);
  }
}
