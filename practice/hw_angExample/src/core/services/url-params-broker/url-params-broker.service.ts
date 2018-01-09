import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

export class UrlParamsBrokerService {
  params = {};

  private url$ = new Subject<{param: string, value: any}>();

  constructor(private $rootScope: ng.IRootScopeService,
              private $location: ng.ILocationService) {
    'ngInject';

  }

  urlParamChanges(): Observable<{param: string, value: any}> {
    return this.url$.asObservable();
  }

  getParam(param: string) {
    return this.params[param];
  }

  /*
   flow:
   1. $stateChangeStart
   2. $locationChangeSuccess
   */
  setParam(param: string, value: any, isSilent?: boolean) {
    if (_.isObjectLike(value) && _.isEmpty(value)) {
      value = undefined;
    }

    if (!_.isObjectLike(value) && (_.isNil(value) || value === '')) {
      value = undefined;
    }

    if (!_.isEqual(this.getParam(param), value)) {
      this.params[param] = value;
      this.$location.search(param, this.encodeURLParam(value));

      if (!isSilent) {
        this.$rootScope.$broadcast('urlParamChanged:' + param, value);
        this.url$.next({param, value});
      }
    }
  }

  startWatchingUrl() {
    // Initialize params with current params (from url)
    this.$rootScope.$on('$stateChangeStart', (event, toState, toParams) => {
      // Send event when param was reset by state change
      _.each(this.params, (value, param) => {
        if (!_.has(toParams, param) || _.isEmpty(toParams[param]) && !_.isEmpty(value)) {
          this.$rootScope.$broadcast('urlParamReseted:' + param);
          this.url$.next({param, value: null});
          _.unset(this.params, param);
        }
      });

      _.each(toParams, (value, param) => {
        this.params[param] = this.decodeURLParam(value);
      });
    });

    // Changes from URL
    this.$rootScope.$on('$locationChangeSuccess', () => {
      let locationParams = this.$location.search();

      _.each(locationParams, (value, param) => {
        // If param was change notify all about this change
        this.setParam(param, this.decodeURLParam(value));
      });
    });
  }

  private decodeURLParam(value) {
    if (_.isNil(value)) {
      return;
    }

    try {
      let result = angular.fromJson(value);
      if (!_.isObjectLike(result)) {
        result = value;
      }
      return result;
    } catch (e) {
      return value;
    }
  }

  private encodeURLParam(value) {
    //
    if (_.isArray(value) || _.isObject(value)) {
      return angular.toJson(value);
    }

    return value;
  }
}
