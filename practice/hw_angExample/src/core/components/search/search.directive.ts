export default (ngModule) => {
  ngModule
    .directive('cadSearch', cadSearch);

  function cadSearch() {
    return {
      replace: true,
      template: require('./search.html'),
      restrict: 'E',
      scope: {
        query: '=',
        onChange: '&',
        onFocus: '&',
        onBlur: '&',
        searchDisabled: '=',
        placeholder: '@?',
        minLength: '@?',
        debounceInterval: '@?'
      },
      /* tslint:disable:no-empty */
      controller: () => {
      },
      controllerAs: 'vm',
      bindToController: true,
      link: (scope: ng.IScope,
             element: ng.IAugmentedJQuery) => {
        let clearEl = element.find('.field__reset');
        let inputEl = element.find('input');
        clearEl.on('click', () => {
          inputEl.focus();
        });
      }
    };
  }
};
