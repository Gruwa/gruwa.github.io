interface IListItem {
  id: string | number;
  name: string;
}

interface IItemsFilterChanges extends ng.IOnChangesObject {
  inputActiveItems: ng.IChangesObject<string[] | number[]>;
  inputIsMultiselect: ng.IChangesObject<string>;
}

export class ItemsFilterController {
  // input
  inputIsMultiselect: string;
  inputEmptyListTitle: string; // Title of the filter if no item is selected
  inputActiveItems: string[] | number[]; // array of Ids of selected elements
  inputListSource: () => ng.IPromise<IListItem[]>;

  isLoading: boolean = false;
  isDropDownClosed = true;

  isMultiselect: boolean;
  allItems: IListItem[] = [];
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

  $onChanges(changes: IItemsFilterChanges) {
    if (changes.inputActiveItems) {
      this.inputActiveItems = changes.inputActiveItems.currentValue;
      this.initSelectedItems(this.inputActiveItems);
    }

    if (changes.inputIsMultiselect) {
      this.isMultiselect = changes.inputIsMultiselect.currentValue === 'true' ? true : false;
    }
  }

  resetItems() {
    this.temporarySelectedItems = [];
    this.triggerItemsSelectEvent({items: this.temporarySelectedItems});

    if (!this.isMultiselect) {
      this.$scope.$broadcast('dropdown:close');
    }
  }

  // Only for isMultiple === true
  selectAllItems() {
    this.temporarySelectedItems = this.allItems;
  }

  select(item: IListItem) {
    if (!this.isMultiselect) {
      this.temporarySelectedItems = [];
    }
    if (!this.isSelected(item)) {
      this.temporarySelectedItems.push(item);
    }

    if (!this.isMultiselect) {
      this.triggerItemsSelectEvent({items: this.temporarySelectedItems});
      this.$scope.$broadcast('dropdown:close');
    }
  }

  // Only for isMultiple === true
  applyFilter() {
    this.triggerItemsSelectEvent({items: this.temporarySelectedItems});
    this.$scope.$broadcast('dropdown:close');
  }

  isSelected(item: IListItem) {
    return _.includes(this.temporarySelectedItems, item);
  }

  private initSelectedItems(inputActiveItems: string[] | number[]) {
    this.temporarySelectedItems = _.filter(
      this.allItems,
      item => _.includes(inputActiveItems, item.id)
    );
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

export const ItemsFilterComponent: ng.IComponentOptions = {
  template: require('./items-filter.html'),
  bindings: {
    inputIsMultiselect: '@isMultiselect',
    inputEmptyListTitle: '@emptyListTitle',
    inputActiveItems: '<activeItems',
    inputListSource: '&listSource',
    triggerItemsSelectEvent: '&onItemsSelected'
  },
  controller: ItemsFilterController,
  controllerAs: 'vm'
};
