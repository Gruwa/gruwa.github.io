import {SmartFilterService} from './smart-filter.service';
import {SmartFilterItemController} from './item/smart-filter-item.component';

export class SmartFilterController {
  list: SmartFilterItemController[] = [];
  id: string;

  showPanel = false;

  constructor(private smartFilterService: SmartFilterService) {
    'ngInject';
  }

  $onInit() {
    this.smartFilterService.initSlot(this.id);
  }

  addItem(item: SmartFilterItemController) {
    this.list.push(item);
  }

  apply() {
    let data = {};
    _.each(this.list, (item) => {
      data[item.id] = item.value;
    });

    this.smartFilterService.setSlotData(this.id, data);
  }

  clear() {
    _.each(this.list, (item) => {
      item.clearValue();
    });
  }
}

export const SmartFilterComponent: ng.IComponentOptions = {
  template: require('./smart-filter.html'),
  controller: SmartFilterController,
  controllerAs: 'vm',
  transclude: {
    filterList: 'cadSmartFilterList'
  },
  bindings: {
    id: '@' // unique param using as slot name for storing filters data
  }
};
