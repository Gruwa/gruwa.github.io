import {SmartGroupSelectorController} from './smart-group-selector.controller';

export const cadSmartGroupSelector = {
  bindings: {
    item: '<',
    viewItems: '<',
    highlightString: '<'
  },
  require: {
    smartSearchListController: '^^cadSmartSearchList'
  },
  template: require('./smart-group-selector'),
  controller: SmartGroupSelectorController,
  controllerAs: 'vm'
};
