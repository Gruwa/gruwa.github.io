export default (ngModule) => {
  ngModule.directive('popupIn', popupIn);

  /* @ngInject */
  function popupIn() {
    return {
      restrict: 'AC',
      compile: (template) => {
        let spinner = angular.element('<div ng-show="$uibModalInstance.showSpinner" class="popup__spinner"></div>');
        spinner.append('<cad-icon name="preloader" custom-class="centered big"></cad-icon>');
        template.append(spinner);
      }
    };
  }
};
