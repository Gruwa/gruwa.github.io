import menuTabsController from './menu-tabs.controller';

export default (ngModule) => {
  function CadMenuTabs() {
    let directive = {
      template: require('./menu-tabs.html'),
      restrict: 'E',
      scope: {},
      controller: menuTabsController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }

  ngModule.directive('cadMenuTabs', CadMenuTabs);
};
