import {SmartFilterItemController, ISmartFilterItemSource} from '../smart-filter-item.component';

export class SmartFilterDropdownController implements ISmartFilterItemSource {
  select = 'select';
  smartFilterItem: SmartFilterItemController;

  constructor() {
    'ngInject';
  }

  $onInit() {
    this.smartFilterItem.initSource(this);
  }

  change(value) {
    this.select = value;
  }

  setValue(select: string) {
    this.select = select;
  }

  getValue() {
    return this.select;
  }

  clearValue() {
    this.select = 'select';
  }
}

export const SmartFilterDropdownComponent: ng.IComponentOptions = {
  template: require('./smart-filter-dropdown.html'),
  controller: SmartFilterDropdownController,
  controllerAs: 'vm',
  require: {
    smartFilterItem: '^cadSmartFilterItem'
  }
};
