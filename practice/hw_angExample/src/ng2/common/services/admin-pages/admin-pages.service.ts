import * as _ from 'lodash';
import {Injectable, Inject} from '@angular/core';
import {ConfigService} from '../config/config.service';
import {CurrentUserService} from '../../../../core/auth/services/current-user.service';

@Injectable()
export class AdminPagesService {
  static adminPermissionsList = [
    'cad_access_advertisers',
    'cad_access_api_integrations',
    'cad_access_markets_management',
    'cad_access_platform_management',
    'cad_access_role_management',
    'cad_access_system_alerts',
    'cad_access_user_management'
  ];

  private adminPagesList: IUnityAdminPage[] = [
    {
      name: 'advertisers_mapping',
      title: 'administration.pages.advertisers_mapping.title',
      link: this.configService.contextPathUI + 'cm/#/campaigns/advertisers/list',
      icon: 'administration-advertisers',
      requiredPermissions: 'cad_access_advertisers'
    },
    {
      name: 'integrations',
      title: 'administration.pages.integrations',
      link: this.configService.contextPathUI + 'cm/#/campaigns/integrations/list',
      icon: 'administration-integrations',
      requiredPermissions: 'cad_access_api_integrations'
    },
    {
      name: 'markets',
      title: 'administration.pages.markets_management',
      link: this.configService.contextPathUI + 'shell/#/administration/markets',
      icon: 'administration-markets',
      requiredPermissions: 'cad_access_markets_management'
    },
    {
      name: 'platforms',
      title: 'administration.pages.platform_management',
      link: this.configService.contextPathUI + 'shell/#/administration/platforms',
      icon: 'administration-platforms',
      requiredPermissions: 'cad_access_platform_management'
    },
    {
      name: 'role_management',
      title: 'administration.pages.role_management',
      link: this.configService.contextPathUI + 'shell/#/administration/roles',
      icon: 'administration-roles',
      requiredPermissions: 'cad_access_role_management'
    },
    {
      name: 'system_alerts',
      title: 'administration.pages.system_alerts',
      link: this.configService.contextPathUI + 'shell/#/administration/alerts',
      icon: 'administration-alerts',
      requiredPermissions: 'cad_access_system_alerts'
    },
    {
      name: 'user_management',
      title: 'administration.pages.user_management',
      link: this.configService.contextPathUI + 'shell/#/administration/users',
      icon: 'administration-users',
      requiredPermissions: 'cad_access_user_management'
    }
  ];

  constructor(
    private configService: ConfigService,
    @Inject('currentUserService') private currentUserService: CurrentUserService
  ) {}

  getAdminPages() {
    return _.cloneDeep(this.adminPagesList)
      .filter(page => this.currentUserService.hasPermissions(page.requiredPermissions));
  }

  getAdminPage(name: string): IUnityAdminPage {
    const adminPage = _.find(this.adminPagesList, { name });
    return adminPage;
  }
}
