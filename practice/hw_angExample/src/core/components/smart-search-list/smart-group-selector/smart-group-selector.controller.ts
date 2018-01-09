export class SmartGroupSelectorController {
  item: any;
  viewItems: any;
  isShown: boolean;
  highlightString: string;

  private groupItems: any;
  private groupField: string;
  private groupName: string;
  private smartSearchListController: any;

  $onChanges() {
    // flush previous state
    if (this.isShown) {
      this.flush();
    }

    if (this.isFirstItemOfGroup()) {
      this.init();
    }
  }

  selectGroup() {
    _.forEach(this.groupItems, item => {
      if (!this.isItemActive(item)) this.saveItemToSelection(item);
    });
  }

  deselectGroup() {
    _.forEach(this.groupItems, item => {
      if (this.isItemActive(item)) this.saveItemToSelection(item);
    });
  }

  isGroupSelected() {
    let isSelected = true;

    _.forEach(this.groupItems, item => {
      if (!this.isItemActive(item)) {
        return isSelected = false;
      }
    });

    return isSelected;
  }

  private init() {
    this.groupField = this.smartSearchListController.groupByField;
    this.groupName = this.item[this.groupField];
    this.isShown = true;
    this.groupItems = _.filter(this.viewItems, [this.groupField, this.groupName]);
  }

  private flush() {
    this.groupField = '';
    this.groupName = '';
    this.isShown = false;
    this.groupItems = null;
  }

  private isFirstItemOfGroup() {
    const itemIndex = _.findIndex(this.viewItems, viewItem => {
      return angular.equals(this.item, viewItem);
    });
    const groupField = this.smartSearchListController.groupByField;
    const previousItem = this.viewItems[itemIndex - 1];

    return itemIndex === 0 || this.item[groupField] !== previousItem[groupField];
  }

  private saveItemToSelection(...args) {
    return this.smartSearchListController.saveItemToSelection(...args);
  }

  private isItemActive(...args) {
    return this.smartSearchListController.isItemActive(...args);
  }
}
