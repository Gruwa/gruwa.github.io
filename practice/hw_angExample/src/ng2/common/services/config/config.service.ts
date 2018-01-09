import * as _ from 'lodash';
import {Injectable, Inject} from '@angular/core';
import {rot13} from '../../../../core/utils/rot13';
import {DefaultConfig} from './config-default';
import {WindowService} from '../window/window.service';

@Injectable()
export class ConfigService extends DefaultConfig {
  constructor(
    @Inject(WindowService) private $window: cad.IWindowService
  ) {
    super();

    // decode config from cadreon.js
    let cadreonConfig = $window.cadreon || {};
    if (_.isString(cadreonConfig)) {
      try {
        cadreonConfig = JSON.parse($window.atob(rot13(<string> cadreonConfig)));
      } catch (e) {
        cadreonConfig = {};
      }
    }

    if (ENVIRONMENT !== 'unitTest' && (_.isEmpty(cadreonConfig) || !_.get(cadreonConfig, 'baseURL'))) {
      throw new Error('Can\'t load environment configuration. Check if "cadreon.js" is present and not corrupted.');
    }

    _.merge(this, cadreonConfig);
  }

  getATVBaseURL(): string {
    return this.baseURL + this.contextPath.atv;
  }

  getAMPBaseURL(): string {
    return this.baseURL + this.contextPath.amp;
  }

  getUserInfoURL(): string {
    return this.baseURL + this.contextPath.user;
  }

  getCMBaseURL(): string {
    return this.baseURL + this.contextPath.cm;
  }

  getCREBaseURL(): string {
    return this.baseURL + this.contextPath.creatives;
  }

  getMktBaseUrl(): string {
    return this.baseURL + this.contextPath.marketplace;
  }

  getMktAnalyticsBaseUrl(): string {
    return this.baseURL + this.contextPath.marketplace_analytics;
  }

  getUMBaseURL(): string {
    return this.baseURL + this.contextPath.authmgmt;
  }

  getShellBaseURL(): string {
    return this.baseURL + this.contextPath.shell;
  }

  getTTAGBaseURL(): string {
    return this.baseURL + this.contextPath.ttag;
  }

  getReportsBaseURL(): string {
    return this.baseURL + this.contextPath.reports;
  }

  getSymphonyBaseURL(): string {
    return this.baseURL + this.contextPath.symphony;
  }

  getFinanceDbBaseUrl(): string {
    return this.baseURL + this.contextPath.financedb;
  }

  getCSFBaseUrl(): string {
    return this.baseURL + this.contextPath.csf;
  }

  getNotifiCenterBaseUrl(): string {
    return this.baseURL + this.contextPath.notificenter;
  }

  getOptimizationBaseUrl(): string {
    return this.baseURL + this.contextPath.optimization;
  }

  getRecommendationBaseUrl(): string {
    return this.baseURL + this.contextPath.recommendations;
  }

  isDevEnv(): boolean {
    const allowed = '127\.0\.0\.1:3000|localhost:3000|qa-app\.cadreon\.com|dev-app\.cadreon\.com|ci-app\.cadreon\.com';
    return (new RegExp(allowed)).test(this.$window.location.href);
  }
}
