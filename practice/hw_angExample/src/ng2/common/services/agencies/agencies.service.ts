import {Inject, Injectable} from '@angular/core';
import {IMarket} from '../';

export interface IAgency {
  childAgencies: IAgency[];
  id: number;
  market: string;
  name: string;
  sfAccountId: string;
}

interface IRequestAgenciesConfig {
  cache: boolean;
  prefix: string;
  params: {
    [key: string]: number | string
  };
}

@Injectable()
export class AgenciesService {
  private endpoint = 'user/agencies';
  private defaultConfig: IRequestAgenciesConfig = {
    cache: true,
    prefix: 'shell',
    params: {
      page: 0,
      size: 10000
    }
  };

  constructor(
    @Inject('$http') private $http: ng.IHttpService
  ) {
  }

  getAll(): ng.IPromise<IAgency[]> {
    return this.getAgencies(_.cloneDeep(this.defaultConfig));
  }

  getByMarkets(markets: IMarket[]): ng.IPromise<IAgency[]> {
    const config: any = _.cloneDeep(this.defaultConfig);

    if (!_.isEmpty(markets) && !_.includes(_.map(markets, 'isoCode'), 'ALL')) {
      config.params.filter_market_in = markets.map(market => market.isoCode.toLowerCase()).join(',');
    }

    return this.getAgencies(config);
  }

  getAgencies(config: IRequestAgenciesConfig): ng.IPromise<IAgency[]> {
    return this.$http.get(this.endpoint, config).then(response => _.get(response, 'data.content'));
  }
}
