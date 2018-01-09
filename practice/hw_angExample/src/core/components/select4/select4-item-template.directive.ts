export default function CadSelect4ItemTemplateDirective($compile, $timeout): ng.IDirective {
  'ngInject';

  let directive = {
    restrict: 'E',
    require: '^cadSelect4',
    replace: true,
    compile: _compileFn
  };

  function _compileFn($element) {
    let itemTemplateContent = $element.html();
    let itemEl = angular.element('<div>').append(itemTemplateContent);
    itemEl.addClass('select4-item');

    let itemScopes: ng.IScope[] = [];

    return ($scope, $element2, $attrs, cadSelect4ctrl) => {
      cadSelect4ctrl.getElement().on('select2:close', () => {
        _.each(itemScopes, scope => scope.$destroy());
      });

      cadSelect4ctrl.getElement().data('select2').options.options.templateResult = (repo) => {
        if (repo.loading) {
          return $compile('<cad-icon name="preloader" custom-class="centered medium"></cad-icon>')($scope);
        }

        let localScope = $scope.$new();
        localScope.item = repo;
        itemScopes.push(localScope);
        let temp = $compile(itemEl.clone())(localScope)[0];
        $timeout(() => {
          localScope.$digest();
        });
        return temp;
      };
    };
  }

  return directive;
}
