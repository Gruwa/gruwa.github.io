interface IListItem {
  id: string | number;
  name: string;
}

class SmartSearchFilterController {
  // input
  inputEmptyListTitle: string; // Title of the filter if no item is selected
  inputActiveItems: string[] | number[] = []; // array of Ids of selected elements
  inputListSource: () => ng.IPromise<IListItem[]>;

  isLoading: boolean = false;
  isDropDownClosed = true;
  disable: boolean;

  allItems: IListItem[] = [];
  selectedItems: string[] = []; // array of Names of selected elements
  temporarySelectedItems: IListItem[] = [];

  // output
  triggerItemsSelectEvent: (arg: {items: IListItem[]}) => void;

  constructor(private $scope: ng.IScope) {
    'ngInject';

  }

  $onInit() {
    this.registerEventsListeners();

    this.isLoading = true;
    this.inputListSource().then((list: IListItem[]) => {
      this.allItems = list;
      this.initSelectedItems(this.inputActiveItems);
    }).finally(() => {
      this.isLoading = false;
    });

  }

  $onChanges(changes: ng.IOnChangesObject) {
    /* tslint:disable:no-string-literal */
    if (changes['inputActiveItems']) {
      this.inputActiveItems = changes['inputActiveItems'].currentValue;
      this.initSelectedItems(this.inputActiveItems);
    }
  }

  applyFilter() {
    this.triggerItemsSelectEvent({items: this.temporarySelectedItems});
    this.$scope.$broadcast('dropdown:close');
  }

  selectAll() {
    this.temporarySelectedItems = this.allItems;
  }

  resetTemporaryItems() {
    this.temporarySelectedItems = [];
  }

  resetItems() {
    this.triggerItemsSelectEvent({items: []});
  }

  private initSelectedItems(inputActiveItems: string[] | number[]) {
    this.temporarySelectedItems = _.filter(
      this.allItems,
      item => _.includes(inputActiveItems, item.id)
    );
    this.selectedItems = _.map<IListItem, string>(this.temporarySelectedItems, 'name');
  }

  private registerEventsListeners() {
    this.$scope.$on('dropdown:beforeOpen', () => {
      this.isDropDownClosed = false;
    });

    this.$scope.$on('dropdown:beforeClose', () => {
      this.isDropDownClosed = true;
    });
  }
}

export const SmartSearchFilterComponent: ng.IComponentOptions = {
  template: require('./smart-search-filter.html'),
  bindings: {
    inputEmptyListTitle: '@emptyListTitle',
    inputActiveItems: '<activeItems',
    inputListSource: '&listSource',
    disable: '=?',
    triggerItemsSelectEvent: '&onItemsSelected'
  },
  controller: SmartSearchFilterController,
  controllerAs: 'vm'
};
