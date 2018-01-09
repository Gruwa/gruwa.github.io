import {PopupController} from './popup.controller';

export const popupComponent: ng.IComponentOptions = {
  transclude: true,
  bindings: {
    component: '@',
    resolve: '<',
    onClose: '&',
    size: '@',
    disabled: '<'
  },
  template: require('./popup.html'),
  controllerAs: 'vm',
  controller: <ng.IControllerConstructor> PopupController
};
