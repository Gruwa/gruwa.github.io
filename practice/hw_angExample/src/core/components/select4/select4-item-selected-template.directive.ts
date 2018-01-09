export default function CadSelect4ItemSelectedTemplateDirective($compile): ng.IDirective {
  'ngInject';

  let directive = {
    restrict: 'E',
    require: '^cadSelect4',
    replace: true,
    compile: _compileFn
  };

  function _compileFn($element) {
    let itemSelectedTemplateContent = $element.html();
    let itemSelEl = angular.element('<div>').append(itemSelectedTemplateContent);
    itemSelEl.addClass('select4-item-selected');

    let itemScopes: ng.IScope[] = [];

    return ($scope, $element2, $attrs, cadSelect4ctrl) => {
      $scope.$on('$destroy', () => {
        _.each(itemScopes, scope => scope.$destroy());
      });

      cadSelect4ctrl.getElement().data('select2').options.options.templateSelection = (repo) => {
        let localScope = $scope.$new();
        localScope.item = repo;
        itemScopes.push(localScope);
        let temp = $compile(itemSelEl.clone())(localScope)[0];
        if (!localScope.$$phase && !_.get($scope.$root, '$$phase', true)) {
          localScope.$digest();
        }
        return temp;
      };
    };
  }

  return directive;
}
