import {MenuPlusController} from './menu-plus.controller';

export default (ngModule) => {
  function CadMenuPlus() {
    let directive = {
      template: require('./menu-plus.html'),
      restrict: 'E',
      scope: {
        disable: '=?'
      },
      controller: MenuPlusController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }

  ngModule.directive('cadMenuPlus', CadMenuPlus);
};
