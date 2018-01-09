import {UrlParamsBrokerService} from '../../services/url-params-broker/url-params-broker.service';
const DEFAULT_ELEMENTS_ON_PAGE_COUNT = 20;

export class CommonListController {
  protected firstLoad = true;
  protected filters: any = {};
  protected info: any = {
    status: 'init',
    totalPages: 0,
    error: null
  };
  protected items: any[] = [];

  private request: ng.IDeferred<any>;

  constructor(
    protected $scope: ng.IScope,
    protected $window: ng.IWindowService,
    protected $q: ng.IQService,
    protected shared: any,
    protected clParams: any,
    protected urlParamsBrokerService: UrlParamsBrokerService,
    protected $stateParams: {list?: any, sort?: string}
  ) {
    'ngInject';

    _.defaults(this.clParams, {minSearchCharsCount: 1});

    _.each(this.clParams.customFilters, (filter: any) => {
      this.filters[filter.requestName] = this.urlParamsBrokerService.getParam(filter.urlName);
      $scope.$on('urlParamChanged:' + filter.urlName, (event, value) => {
        this.watchUrlFilters(filter.requestName, value);
      });
    });
  }

  fetchNextPage() {
    this.info.page = _.isUndefined(this.info.page) ? 0 : this.info.page + 1;
    // Prevent searching if it last page
    if (!this.info.last) {
      return this.getItems();
    }
  }

  isScrollDisabled() {
    return this.info.last || !/done|init/.test(this.info.status);
  }

  getSearchHighlight() {
    return this.isMeetSearchQuery(this.filters.filter_name_contains) ? this.filters.filter_name_contains : '';
  }

  // allows child to execute custom code after data load
  postProcessing(page: any[]) {
    // override in child
  }

  private watchUrlFilters(filterKey, value) {
    this.filters[filterKey] = value;
    // prevent double loading with infinite-scroll
    if (this.firstLoad) {
      return;
    }
    this.getItems(false);
  }

  private getItems(incremental = true) {
    this.info.status = 'loading';

    if (!incremental && this.request && _.isFunction(this.request.reject)) {
      this.request.reject();
    }

    if (!incremental) {
      this.info.page = 0;
      this.items = [];
      this.$window.scrollTo(0, 0);
    }

    let options: any = _.extend(
      {
        page: this.info.page,
        size: DEFAULT_ELEMENTS_ON_PAGE_COUNT
      },
      this.clParams.filters
    );

    _.each(this.filters, (value: string[], key: string) => {
      if (!_.isUndefined(options[key]) && _.isUndefined(value)) {
        return;
      }
      options[key] = (_.isArray(value)) ? value.join(',') : value;
    });

    if (!_.isEmpty(this.$stateParams.sort)) {
      options.sort = this.$stateParams.sort;
    }

    // cancel loading if there are new search
    this.request = this.$q.defer();

    this.request.promise.then((response) => {
        let content = _.get(response, 'content', []);
        this.items = incremental ? this.items.concat(content) : content;
        _.extend(this.info, {
          last: response.last,
          page: Math.min(response.number, response.totalPages - 1),
          status: content.length ? 'done' : 'empty',
          totalElements: response.totalElements,
          totalPages: response.totalPages
        });

        _.extend(this.shared, this.info);

        this.firstLoad = false;
        this.postProcessing(content);

      }).catch((error) => {
        this.info.status = 'error';
        this.info.error = error;
        this.info.totalPages = 0;
        this.info.totalElements = 0;
      }).finally(() => {
        this.request = null;
      });

    return this.clParams.service
      .search(options)
      .then(this.request.resolve, this.request.reject);
  }

  private isMeetSearchQuery(q) {
    return !q || q.length >= this.clParams.minSearchCharsCount;
  }
}
