import {SmartFilterItemController, ISmartFilterItemSource} from '../smart-filter-item.component';

export class SmartFilterSearchController implements ISmartFilterItemSource {
  smartFilterItem: SmartFilterItemController;
  query: string;

  constructor() {
    'ngInject';
  }

  $onInit() {
    this.smartFilterItem.initSource(this);
  }

  change(query: string) {
    this.query = query;
  }

  setValue(query: string) {
    this.query = query;
  }

  getValue() {
    return this.query;
  }

  clearValue() {
    this.query = '';
  }

}

export const SmartFilterSearchComponent: ng.IComponentOptions = {
  template: require('./smart-filter-search.html'),
  controller: SmartFilterSearchController,
  controllerAs: 'vm',
  require: {
    smartFilterItem: '^cadSmartFilterItem'
  }
};
