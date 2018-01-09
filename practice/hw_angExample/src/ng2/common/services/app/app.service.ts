import * as _ from 'lodash';
import {Injectable, Inject} from '@angular/core';
import {ConfigService} from '../config/config.service';
import {AdminPagesService} from '../admin-pages/admin-pages.service';

@Injectable()
export class AppService {
  private appList: cad.IUnityApp[] = [
    {
      name: 'shell',
      title: this.$translate.instant('applications.administration'),
      permissions: AdminPagesService.adminPermissionsList,
      roleUrl: 'roles',
      marketUrl: 'markets',
      baseUrl: this.configService.getShellBaseURL(),
      entryUrl: this.configService.contextPathUI + 'shell/#/administration',
      statePattern: /^(login|forgot-password|set-password|ui-kit|shell\.|home\.)/,
      path: this.configService.contextPathUI + 'shell/'
    },
    {
      name: 'cm',
      title: this.$translate.instant('applications.cm'),
      permissions: ['cad_access_campaign_manager'],
      roleUrl: 'roles',
      marketUrl: 'markets',
      baseUrl: this.configService.getCMBaseURL(),
      entryUrl: this.configService.contextPathUI + 'cm/#/campaigns',
      statePattern: /^(campaigns\.|opportunities\.)/,
      path: this.configService.contextPathUI + 'cm/'
    },
    {
      name: 'atv',
      title: this.$translate.instant('applications.atv'),
      permissions: ['cad_access_advanced_tv'],
      roleUrl: 'roles',
      marketUrl: 'markets',
      baseUrl: this.configService.getATVBaseURL(),
      entryUrl: this.configService.contextPathUI + 'atv/#/advancedtv',
      statePattern: /^advancedtv\./,
      path: this.configService.contextPathUI + 'atv/'
    },
    {
      name: 'utag',
      title: this.$translate.instant('applications.utag'),
      permissions: ['cad_access_total_tag'],
      roleUrl: 'roles',
      marketUrl: 'markets',
      baseUrl: this.configService.getTTAGBaseURL(),
      entryUrl: this.configService.contextPathUI + 'utag/#/utag',
      hasMultipleMarkets: true,
      statePattern: /^totaltag\./,
      path: this.configService.contextPathUI + 'utag/'
    },
    {
      name: 'creatives',
      title: this.$translate.instant('applications.creatives'),
      permissions: ['cad_access_cm_creatives'],
      roleUrl: 'roles',
      marketUrl: 'markets',
      baseUrl: this.configService.getCREBaseURL(),
      entryUrl: this.configService.contextPathUI + 'creatives/#/',
      statePattern: /^creatives\./,
      path: this.configService.contextPathUI + 'creatives/'
    },
    {
      name: 'reporting',
      title: this.$translate.instant('applications.reports'),
      permissions: ['cad_access_reporting'],
      roleUrl: 'roles',
      marketUrl: 'markets',
      baseUrl: this.configService.getReportsBaseURL(),
      entryUrl: this.configService.contextPathUI + 'reporting/#/reporting',
      statePattern: /^reporting\./,
      path: this.configService.contextPathUI + 'reporting/'
    },
    {
      name: 'financedb',
      title: this.$translate.instant('applications.cfd'),
      permissions: ['cad_access_financedb'],
      roleUrl: 'roles',
      marketUrl: 'markets',
      baseUrl: this.configService.getFinanceDbBaseUrl(),
      entryUrl: this.configService.contextPathUI + 'cfd/#/financedb',
      statePattern: /^financedb\./,
      path: this.configService.contextPathUI + 'cfd/'
    },
    {
      name: 'amp',
      title: this.$translate.instant('applications.amp'),
      permissions: ['cad_access_amp'],
      roleUrl: 'roles',
      marketUrl: 'markets',
      baseUrl: this.configService.getAMPBaseURL(),
      entryUrl: this.configService.contextPathUI + 'amp/#/amp',
      statePattern: /^amp\./,
      path: this.configService.contextPathUI + 'amp/'
    },
    {
      name: 'csf',
      title: this.$translate.instant('applications.csf'),
      permissions: ['cad_access_csf'],
      roleUrl: 'roles',
      marketUrl: 'markets',
      baseUrl: this.configService.getCSFBaseUrl(),
      entryUrl: this.configService.contextPathUI + 'csf/#/csf',
      statePattern: /^(csf\.|insertion-orders\.)/,
      path: this.configService.contextPathUI + 'csf/'
    },
    {
      name: 'marketplace',
      title: this.$translate.instant('applications.marketplace'),
      permissions: ['cad_access_marketplace'],
      roleUrl: 'roles',
      marketUrl: 'markets',
      baseUrl: this.configService.getMktBaseUrl(),
      entryUrl: this.configService.contextPathUI + 'marketplace/#/marketplace',
      statePattern: /^marketplace\./,
      path: this.configService.contextPathUI + 'marketplace/'
    },
    {
      name: 'marketplace-analytics',
      title: this.$translate.instant('applications.marketplace-analytics'),
      permissions: ['cad_access_marketplace_dm', 'cad_access_administration'],
      roleUrl: 'roles',
      marketUrl: 'markets',
      baseUrl: this.configService.getMktAnalyticsBaseUrl(),
      entryUrl: this.configService.contextPathUI + 'marketplace/#/analytics',
      statePattern: /^mkt-analytics\./,
      path: this.configService.contextPathUI + 'marketplace/'
    },
    {
      name: 'taxonomies',
      title: this.$translate.instant('applications.taxonomies'),
      permissions: ['mbww_access_taxonomies'],
      roleUrl: 'roles',
      marketUrl: 'markets',
      baseUrl: this.configService.getSymphonyBaseURL(),
      entryUrl: this.configService.contextPathUI + 'taxonomies/#/taxonomies',
      statePattern: /^taxonomies\./,
      path: this.configService.contextPathUI + 'taxonomies/'
    },
    {
      name: 'datamanager',
      title: this.$translate.instant('applications.publisher_data_manager'),
      permissions: ['mbww_access_data_manager'],
      roleUrl: 'roles',
      marketUrl: 'markets',
      baseUrl: this.configService.getSymphonyBaseURL(),
      entryUrl: this.configService.contextPathUI + 'datamanager/#/datamanager',
      statePattern: /^datamanager\./,
      path: this.configService.contextPathUI + 'datamanager/'
    },
    {
      name: 'dashboards',
      // temporary commented, as we need to replace title while we will not get
      // another new application
      // title: this.$translate.instant('applications.dashboards'),
      title: this.$translate.instant('applications.planning_and_booking'),
      permissions: ['mbww_access_dashboards'],
      roleUrl: 'roles',
      marketUrl: 'markets',
      baseUrl: this.configService.getSymphonyBaseURL(),
      entryUrl: this.configService.contextPathUI + 'dashboards/#/dashboards',
      statePattern: /^dashboards\./,
      path: this.configService.contextPathUI + 'dashboards/'
    },
    {
      name: 'tools',
      title: this.$translate.instant('applications.tools'),
      permissions: ['mbww_access_taxonomies'],
      roleUrl: 'roles',
      marketUrl: 'markets',
      baseUrl: this.configService.getSymphonyBaseURL(),
      entryUrl: this.configService.contextPathUI + 'tools/#/tools',
      statePattern: /^tools\./,
      path: this.configService.contextPathUI + 'tools/'
    },
    {
      name: 'optimization',
      title: this.$translate.instant('applications.optimization'),
      permissions: ['cad_access_optimization_admin', 'cad_access_optimization_manager', 'cad_access_optimization_user'],
      roleUrl: 'roles',
      marketUrl: 'markets',
      baseUrl: this.configService.getOptimizationBaseUrl(),
      entryUrl: this.configService.contextPathUI + 'optimization/#/optimization',
      statePattern: /^optimization\./,
      path: this.configService.contextPathUI + 'optimization/'
    }
  ];

  constructor(
    @Inject('$translate') private $translate: ng.translate.ITranslateService,
    private configService: ConfigService
  ) {}

  // return either apps available for given user roles or full apps list
  getApplications(user?: cad.IUser): cad.IUnityApp[] {
    const result = _.isEmpty(user)
      ? this.appList
      : _.filter(this.appList, app => _.difference(app.permissions, user.roles).length === 0);

    return _.cloneDeep(result);
  }

  getAppPath(name: string): string {
    const app = _.find(this.appList, { name });
    return app ? app.path : '';
  }

  getAppByName(name: string): cad.IUnityApp {
    return _.cloneDeep(_.find(this.appList, { name }));
  }

  findAppPathByState(stateName: string): string {
    const app = _.find(this.appList, (item: cad.IUnityApp) => item.statePattern.test(stateName));
    return app ? app.path : '';
  }
}
