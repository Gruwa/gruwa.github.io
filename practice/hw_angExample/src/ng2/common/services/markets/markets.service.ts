import {Inject, Injectable} from '@angular/core';
import IHttpPromiseCallbackArg = angular.IHttpPromiseCallbackArg;
import {ConfigService} from '../config/config.service';
import {RolesService} from '../roles/roles.service';

export interface IMarketRegion {
  id: string;
  name: string;
  itemLabel?: string; // techical field for dropdown regions list
}

export interface IMarketCurrency {
  id: string;
  name: string;
}

export interface IMarketTimezone {
  id: string;
  countryName: string;
  countryCode: string;
  offset: string;
}

export interface IMarket {
  name: string;
  isoCode: string;
  permission: string;
  region: IMarketRegion;
  currency: IMarketCurrency;
  defaultTimeZone: IMarketTimezone;
  timeZones: IMarketTimezone[];
}

const PAGE_SIZE = 20;

@Injectable()
export class MarketsService {
  private isMultiMarkets: boolean = true;

  constructor(
    private configService: ConfigService,
    private rolesService: RolesService,
    @Inject('$http') private $http: ng.IHttpService
  ) {
  }

  // special method to remove multi-markets from UI for certain apps (like uTag for example)
  disableMultiMarketsUI(): void {
    this.isMultiMarkets = false;
  }

  isMultiMarketsEnabled(): boolean {
    return this.isMultiMarkets;
  }

  getList(page: number, pageSize = PAGE_SIZE): Promise<cad.IEntityListResponse<IMarket>> {
    const marketsPath = `${this.shellUrl}markets`;
    const params = {page, size: pageSize};
    return this.$http.get<cad.IEntityListResponse<IMarket>>(marketsPath, {params}).then(response => response.data);
  }

  getAll(): ng.IPromise<IMarket[]> {
    const marketsPath = `${this.shellUrl}markets?size=500`;

    return this.$http.get(marketsPath, {cache: true})
      .then(
        (response: IHttpPromiseCallbackArg<cad.IEntityListResponse<IMarket>>) => {
          return response.data.content;
        }
      );
  }

  getByIsoCode(isoCode: string): Promise<IMarket> {
    const marketPath = `${this.shellUrl}markets/${isoCode}`;
    return this.$http.get<IMarket>(marketPath).then(response => response.data);
  }

  getMarketsByISOCodes(isoCodes: string[]): ng.IPromise<IMarket[]> {
    return this.getAll().then(
      (markets: IMarket[]) => {
        return _.filter(markets, (market: IMarket) => _.includes(isoCodes, market.isoCode));
      }
    );
  }

  create(market: IMarket): Promise<IMarket> {
    const marketsPath = `${this.shellUrl}markets`;
    return this.$http.post<IMarket>(marketsPath, market).then(res => res.data);
  }

  save(market: IMarket): Promise<IMarket> {
    const marketPath = `${this.shellUrl}markets/${market.isoCode}`;
    return this.$http.put<IMarket>(marketPath, market).then(res => res.data);
  }

  isUserHasMarketWithIsoCodeALL(user: cad.IUser) {
    let userMarketsIsoCodes = this.rolesService.getMarketIsoCodes(user.roles);
    return _.includes(userMarketsIsoCodes, 'ALL');
  }

  getRegions(): Promise<any> {
    const regionsPath = `${this.shellUrl}dictionary/regions`;
    return this.$http.get(regionsPath).then(response => response.data);
  }

  getCurrencies({page, pageSize = PAGE_SIZE, searchCriteria = null}): Promise<cad.IEntityListResponse<any>> {
    const currenciesPath = `${this.shellUrl}dictionary/currencies`;
    const params = {page, size: pageSize, searchCriteria};
    return this.$http.get<cad.IEntityListResponse<any>>(currenciesPath, {params}).then(response => response.data);
  }

  getTimezones({page, pageSize = PAGE_SIZE, searchCriteria = null}): Promise<cad.IEntityListResponse<any>> {
    const timezonesPath = `${this.shellUrl}dictionary/timezones`;
    const params = {page, size: pageSize, searchCriteria};
    return this.$http.get<cad.IEntityListResponse<any>>(timezonesPath, {params}).then(response => response.data);
  }

  private get shellUrl(): string {
    return this.configService.getShellBaseURL();
  }
}
