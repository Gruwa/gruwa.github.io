/*
* This is temp wrapper for ui-router's "ui-view" to make it possible use it in ng2 components as router outlet
* */
export const RouterOutletComponent: ng.IComponentOptions = {
  bindings: {
    view: '@'
  },
  controllerAs: 'vm',
  template: ($attrs) => {
    'ngInject';
    return _.has($attrs, 'autoscroll')
      ? '<div ui-view="{{ vm.view }}" autoscroll></div>'
      : '<div ui-view="{{ vm.view }}"></div>';
  }
};
