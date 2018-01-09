import {IPagination} from '../pagination/pagination';

export class UiGridPagerController {
  // input bindings
  // todo: fix unit tests TS errors when type specified
  gridOptions: any;
  // gridOptions: uiGrid.IGridOptions;
  pagination: IPagination;
  remote: string; // TODO: How to make `remote` boolean when we pass this attr as `remote="true"`?

  // output bindings
  onPageChanged: (arg: {pagination: IPagination}) => void;

  // todo: fix unit tests TS errors when type specified
  private gridApi: any;
  // private gridApi: uiGrid.IGridApi;

  constructor() {
    this.initPagination();
    this.initGridOptions();
  }

  goToNextPage() {
    this.pagination = this.pagination.goToNextPage();

    this.setPage(this.pagination);
  }

  goToPrevPage() {
    this.pagination = this.pagination.goToPrevPage();

    this.setPage(this.pagination);
  }

  private initPagination() {
    this.pagination = _.cloneDeep(this.pagination);
  }

  // TODO: Avoid mutation of gridOptions
  private initGridOptions() {
    this.gridOptions.onRegisterApi = (api) => {
      this.gridApi = api;
    };
    this.gridOptions.enablePaginationControls = false;
    this.gridOptions.paginationPageSize = this.pagination.pageSize;

    let listLength = _.get(this.gridOptions, 'data.length', 0);
    this.gridOptions.minRowsToShow = this.pagination.pageSize > listLength ? listLength : this.pagination.pageSize;

    if (this.remote === 'true') {
      this.gridOptions.useExternalPagination = true;
    }
  }

  private setPage(pagination: IPagination) {
    if (!this.gridApi.pagination) {
      throw new Error(
        'UiGridPager: Unable to change page. Have you missed to specify `ui-grid-pagination` directive on your grid?'
      );
    }

    // +1 because uiGrid.IGridPaginationApi starts pages from 1 and IPagination from 0
    this.gridApi.pagination.seek(pagination.page + 1);

    this.onPageChanged({pagination});
  }
}

export const uiGridPagerComponent: ng.IComponentOptions = {
  template: require('./ui-grid-pager.html'),
  controller: <ng.IControllerConstructor> UiGridPagerController,
  controllerAs: 'vm',
  bindings: {
    gridOptions: '<',
    pagination: '<api',
    remote: '@',
    onPageChanged: '&'
  }
};
