export function CadTileIcon(): ng.IDirective {
  'ngInject';

  return {
    template: require('./tile-icon.html'),
    restrict: 'E',
    controllerAs: 'vm',
    controller: angular.noop,
    scope: true,
    bindToController: {
      icon: '@',
      name: '@',
      state: '@',
      titleClasses: '@'
    }
  };
}
