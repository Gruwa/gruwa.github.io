import {ConfigService} from './../../services/config/config.service';
import {CurrentUserService} from '../../auth';

export const MARKET_HEADER = 'Cad-Market';

function urlInterceptorFactory(
  $templateCache: ng.ITemplateCacheService,
  $injector: ng.auto.IInjectorService,
  configService: ConfigService
) {
  'ngInject';

  return {
    request: (config: ng.IRequestShortcutConfig): ng.IRequestShortcutConfig => {
      let currentUserService = <CurrentUserService> $injector.get('currentUserService');

      // skip template requests ($templateCache uses $http under the hood)
      if (_.isString($templateCache.get(config.url))) {
        return config;
      }

      // prepend baseURL basing on "prefix" param
      if (config.prefix && configService.contextPath[config.prefix]) {
        config.url = configService.baseURL + configService.contextPath[config.prefix] + config.url;
      }

      // check if url matches any "include" regexp conditions + few extra required conditions
      const addMarketConditions = [
        this.include.market.some(val => val.test(config.url)),
        _.includes(this.include.methods, config.method) || config.method === 'GET',
        !_.has(config.headers, MARKET_HEADER),
        currentUserService.market,
        !config.suppressMarket
      ];

      // if all conditions pass - add current active market to request header and url params
      if (_.every(addMarketConditions)) {
        config.headers = config.headers || {};
        config.params = config.params || [];
        config.headers[MARKET_HEADER] = currentUserService.market;

        if (config.method === 'GET') {
          config.params[MARKET_HEADER.toLowerCase()] = currentUserService.market;
        }

      }

      return config;
    }
  };
}

export class UrlInterceptorProvider implements ng.IServiceProvider {
  // placeholder for pattern if to modify request by url interceptor
  include: {market: RegExp[], methods: string[]} = {market: [], methods: []};
  $get = urlInterceptorFactory;
}
