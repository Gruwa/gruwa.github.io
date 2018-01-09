import {SmartFilterController} from '../smart-filter.component';

export interface ISmartFilterItemSource {
  getValue: () => any;
  setValue: (value: any) => void;
  clearValue: () => void;
  $onInit: () => void;
}

export class SmartFilterItemController {
  id: string;
  title: string;

  source: ISmartFilterItemSource;
  smartFilter: SmartFilterController;

  constructor() {
    'ngInject';
  }

  $onInit() {
    this.smartFilter.addItem(this);
  }

  initSource(source: ISmartFilterItemSource) {
    this.source = source;
  }

  set value(value) {
    this.source.setValue(value);
  }

  get value() {
    return this.source.getValue();
  }

  clearValue() {
    this.source.clearValue();
  }
}

export const SmartFilterItemComponent: ng.IComponentOptions = {
  template: require('./smart-filter-item.html'),
  controller: SmartFilterItemController,
  controllerAs: 'vm',
  transclude: true,
  require: {
    smartFilter: '^cadSmartFilter'
  },
  bindings: {
    id: '@',
    title: '@'
  }
};
