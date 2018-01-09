export interface ICadPaginationOptions {
  itemsOnPage: number;
  number: number; // tslint:disable-line
  totalPages: number;

  nextPage?(): void;
  prevPage?(): void;

  getNumberOfPages?(): number;
  getPageNumber?(): number;
  fetchPageData?(): ng.IPromise<any>;
}

export default (ngModule) => {
  ngModule.directive('cadPagination', [() => {
    let DEFAULT_OPTIONS = {
      itemsOnPage: 2
    };

    let options: ICadPaginationOptions;

    let directive = {
      template: require('./pagination.html'),
      restrict: 'E',
      scope: {
        list: '=*',
        pageNumber: '=',
        options: '='
      },
      controllerAs: 'vm',
      controller: paginationController,
      bindToController: true
    };

    return directive;

    function paginationController() {
      let vm = this;
      let fetchFromServer = angular.isDefined(vm.options.fetchPageData);

      options = angular.extend({}, DEFAULT_OPTIONS, vm.options);

      vm.pageNumber = vm.pageNumber || 1;

      // controls(nextPage, prevPage, getNumberOfPages, getPageNumber) might be passed into component via options,
      // in case if cadPagination is used together with angular-ui-grid built-in pagination
      vm.nextPage = options.nextPage || nextPage;
      vm.prevPage = options.prevPage || prevPage;
      vm.getNumberOfPages = options.getNumberOfPages || getNumberOfPages;
      vm.getPageNumber = options.getPageNumber || getPageNumber;

      function getPageNumber() {
        let numberOfPages = vm.getNumberOfPages();
        if (numberOfPages > 0 && vm.pageNumber > numberOfPages) {
          vm.pageNumber = numberOfPages;
        }

        return vm.pageNumber;
      }

      function getNumberOfPages() {
        if (fetchFromServer) {
          return vm.options.totalPages;
        }

        if (!vm.list) {
          return 0;
        }

        return Math.ceil(vm.list.length / options.itemsOnPage);
      }

      function _fetch() {
        if (!fetchFromServer) {
          return;
        }

        vm.options.number = vm.pageNumber;
        vm.fetching = true;
        vm.options.fetchPageData().then(() => {
          vm.fetching = false;
        });
      }

      function prevPage() {
        if (vm.pageNumber > 1) {
          vm.pageNumber--;
          _fetch();
        }
      }

      function nextPage() {
        if (vm.pageNumber < vm.getNumberOfPages()) {
          vm.pageNumber++;
          _fetch();
        }
      }
    }
  }]);
};
