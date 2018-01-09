export default (ngModule) => {
  let directive = () => {
    return {
      restrict: 'E',
      template: require('./search-list.html'),
      replace: true,
      scope: true,
      transclude: true,
      /* tslint:disable:no-empty */
      controller: () => {},
      controllerAs: 'search',
      bindToController: {
        query: '=',
        minLength: '=',
        disabled: '=',
        placeholder: '@'
      }
    };
  };

  ngModule.directive('cadSearchList', directive);
};
