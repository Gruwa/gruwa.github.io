interface IStateData {
  pageTitle?: string;
  pageTitleNoInheritance?: boolean;
}

export default (ngModule) => {
  function cadPageTitleDirective() {
    return {
      restrict: 'A',
      controller: _ctrlFn
    };

    /*@ngInject*/
    function _ctrlFn($scope, $attrs, $translate, $window) {
      let delimiter = ' | ';
      let defaultTitle = $translate.instant($attrs.cadPageTitle);

      $scope.$on('$stateChangeSuccess', (event, toState) => {
        let chunks = [];
        let stateData = toState.data;
        while (stateData) {
          let dataCopy: IStateData = {};
          _.assign(dataCopy, stateData); // copy state data to lookup in its own properties only, not in prototypes
          if (dataCopy.pageTitle) chunks.push(dataCopy.pageTitle);
          stateData = dataCopy.pageTitleNoInheritance ? null : Object.getPrototypeOf(stateData);
        }

        let title = chunks.map($translate.instant).reverse().join(delimiter);
        $window.document.title = title || defaultTitle;
      });
    }
  }

  ngModule.directive('cadPageTitle', cadPageTitleDirective);
};
