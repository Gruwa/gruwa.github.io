import {IAdvertisersResource, IAdvertiser} from './advertiser.resource';
import IEntityListResponse = cad.IEntityListResponse;

export class AdvertisersService {
  private list: IAdvertiser[];
  private sfIdToAdvertiser;
  private idToAdvertiser;
  private UNKNOWN_ADVERTISER: IAdvertiser;

  private defaultQueryParams = {
    page: 0,
    size: 10000
  };

  constructor(
    private $q: ng.IQService,
    private $log: ng.ILogService,
    private $http: ng.IHttpService,
    private Advertiser: IAdvertisersResource
  ) {
    'ngInject';
    this.UNKNOWN_ADVERTISER = new Advertiser({
      id: null,
      advertiserId: null,
      name: '',
      isBrand: false,
      agencyName: '',
      brands: []
    });
  }

  getAdvertiserByAccountId(accountId) {
    return _.find(this.list, {sfAccountId: accountId});
  }

  findById(id) {
    let deferred = this.$q.defer();
    if (angular.isObject(this.idToAdvertiser)) {
      deferred.resolve(this.lookUpAdvertiserByKey(id, this.idToAdvertiser, {id}));
    } else {
      this.getAll()
        .then(() => {
          deferred.resolve(this.lookUpAdvertiserByKey(id, this.idToAdvertiser, {id}));
        })
        .catch(error => {
          deferred.reject(error);
        });
    }
    return deferred.promise;
  }

  findBySfIdObject(sfId) {
    if (angular.isObject(this.sfIdToAdvertiser)) {
      return this.lookUpAdvertiserByKey(sfId, this.sfIdToAdvertiser, {sfAccountId: sfId});
    }
    let value = this.prepareBlankAdvertiser({sfAccountId: sfId});
    value.$promise = this.findBySfId(sfId).then(
      advertiser => {
        angular.extend(value, advertiser);
      },
      () => {
        value.name = 'Error!';
      }
    );
    return value;
  }

  findBySfId(sfId) {
    let deferred = this.$q.defer();
    if (angular.isObject(this.sfIdToAdvertiser)) {
      deferred.resolve(this.lookUpAdvertiserByKey(sfId, this.sfIdToAdvertiser, {sfAccountId: sfId}));
    } else {
      this.getAll()
        .then(() => {
          deferred.resolve(this.lookUpAdvertiserByKey(sfId, this.sfIdToAdvertiser, {sfAccountId: sfId}));
        })
        .catch(error => {
          deferred.reject(error);
        });
    }
    return deferred.promise;
  }

  loadById(id) {
    return this.Advertiser.get({id}).$promise;
  }

  /**
   * Loads exactly one Advertiser by Salesforce Id.
   *
   * @param sfId
   * @returns {IPromise<IAdvertiser>}
   */
  loadBySfId(sfId: string): ng.IPromise<IAdvertiser> {
    const requestParams =  {
      page: 0,
      size: 1,
      filter_salesforceAccountId: sfId
    };
    return this.Advertiser.query(requestParams).$promise
      .then((res: any) => { // we have to cast to any since Advertiser.query type is not honored
        // now we cast to Paged response
        const pageResponse = <IEntityListResponse<IAdvertiser>> res;
        if (pageResponse.totalElements !== 1) {
          throw Error('Got more than exactly 1 advertiser in search by SF id');
        }
        return pageResponse.content[0];
      });
  }

  getAll() {
    return this.Advertiser
      .query(this.defaultQueryParams).$promise
      .then((data: any) => {
        this.list = data.content;
        this.sfIdToAdvertiser = <IAdvertiser> {};
        this.idToAdvertiser = <IAdvertiser> {};
        angular.forEach(this.list, item => {
          this.sfIdToAdvertiser[item.sfAccountId] = item;
          this.idToAdvertiser[item.id] = item;
        });
        return this.list;
      })
      .catch((e) => {
        this.sfIdToAdvertiser = null;
        return e;
      });
  }

  /**
   * Return Advertiser List with all meta information
   * @param {Object} options Override options
   * @returns {*} promise
   */
  search(options) {
    options = options || {};
    if (options.filter_name_contains === '') {
      delete options.filter_name_contains;
    }
    let queryParams = angular.merge({}, this.defaultQueryParams, options);
    let searchDefer = this.$q.defer();
    this.Advertiser.query(
      queryParams,
      responce => {
        searchDefer.resolve(responce);
      },
      error => {
        this.$log.error('Advertiser loading error', error);
        searchDefer.reject();
      }
    );
    return searchDefer.promise;
  }

  // method for custom agencies and advertisers widget
  // uses special endpoint that search advertisers without check if they could be accessed by current user
  searchAsAdmin(options = {}): ng.IPromise<IAdvertiser[]> {
    const config = {cache: true, prefix: 'shell', params: {}};
    _.extend(config.params, this.defaultQueryParams, options);
    return this.$http.get('user/advertisers', config).then(resp => _.get(resp, 'data.content', []));
  }

  private prepareBlankAdvertiser(defaultAttributes) {
    return angular.extend({}, this.UNKNOWN_ADVERTISER, defaultAttributes);
  }

  private lookUpAdvertiserByKey(key, haystack, defaultAttributes) {
    return haystack[key] || this.prepareBlankAdvertiser(defaultAttributes);
  }
}
