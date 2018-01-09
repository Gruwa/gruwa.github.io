import {CurrentUserService} from '../../../services/current-user.service';

export default MenuTabsController;

/*@ngInject*/
function MenuTabsController($scope, $state, currentUserService: CurrentUserService) {
  let vm = this;
  vm.isActive = isActive;
  vm.goto = goto;

  activate();

  function activate() {
    updateTabsList();

    $scope.$on('$stateChangeSuccess', () => {
      updateTabsList();
    });
  }

  function updateTabsList() {
    vm.tabs = angular.copy(_.get($state, 'current.data.tabs'));
    vm.tabs = _.filter(
      vm.tabs,
      (tab: {roles?, markets?}) => {
        let isValidRole = !tab.roles || currentUserService.hasPermissions(tab.roles);
        let isValidMarket = !tab.markets || _.includes(tab.markets, currentUserService.market);
        return isValidRole && isValidMarket;
      }
    );
  }

  function isActive(state) {
    return $state.includes(state);
  }

  function goto(state, params, options) {
    $state.go(state, params || {}, options || {});
  }
}
