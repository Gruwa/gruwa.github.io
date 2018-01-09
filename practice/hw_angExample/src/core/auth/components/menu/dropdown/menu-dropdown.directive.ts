import {MenuDropdownController} from './menu-dropdown.controller';

export default (ngModule) => {
  function CadMenuDropdown() {
    let directive = {
      template: require('./menu-dropdown.html'),
      restrict: 'E',
      scope: {},
      controller: MenuDropdownController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }

  ngModule.directive('cadMenuDropdown', CadMenuDropdown);
};
