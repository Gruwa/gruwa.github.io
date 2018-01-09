import {Inject, Injectable} from '@angular/core';
import {ConfigService} from '../config/config.service';
import {IMarket} from '../';

export interface IRole {
  id: number;
  name: string;
  isDefault: boolean;
  permissions: string[];
  permissionsCount?: number;
  usersCount?: number;
  apps?: string[];
  appsCount?: number;
  updatedDate?: string;
}

const MARKET_ROLE_PREFIX = 'cad_access_market_';

@Injectable()
export class RolesService {
  roles: IRole[] = null;

  private roleIdPrefix = 'cad_role_id_';

  constructor(
    @Inject('$http') private $http: ng.IHttpService,
    @Inject('$cacheFactory') private $cacheFactory: ng.ICacheFactoryService,
    private configService: ConfigService
  ) {
  }

  // getAll(): Promise<IRole[]> {
  //   return Promise.resolve(require('./roles.json'));
  // }

  getAll(): ng.IPromise<IRole[]> {
    return this.$http.get(`${this.configService.getUMBaseURL()}roles`, {
      cache: true // dictionary data
    }).then((r: ng.IHttpPromiseCallbackArg<IRole[]>) => this.roles = r.data);
  }

  fetchRoleById(id: number): ng.IPromise<IRole> {
    return this.$http.get(`${this.configService.getUMBaseURL()}roles/${id}`, {
      cache: true // dictionary data
    }).then((r: ng.IHttpPromiseCallbackArg<IRole>) => r.data);
  }

  createRole(data: {roleName: string, permissions: string[]}): ng.IHttpPromise<{}> {
    return this.$http.post(`${this.configService.getUMBaseURL()}roles/`, data).then(result => {
      this.$cacheFactory.get('$http').removeAll();
      return result;
    });
  }

  updateRole(role: IRole, data: {newRoleName: string, permissions: string[]}): ng.IHttpPromise<{}> {
    return this.$http.put(`${this.configService.getUMBaseURL()}roles/${role.name}`, data).then(result => {
      this.$cacheFactory.get('$http').removeAll();
      return result;
    });
  }

  deleteRole(role: IRole): ng.IHttpPromise<{}> {
    return this.$http.delete(`${this.configService.getUMBaseURL()}roles/${role.id}`).then(result => {
      this.$cacheFactory.get('$http').removeAll();
      return result;
    });
  }

  getRoleById(id: number): IRole {
    return _.find(this.roles, {id});
  }

  getRoleByWSOPermissions(rolesList: string[]): IRole {
    // Need to find role 'cad_role_id_{ID}' among roles came from WSO
    let roleIdAsString: string = _.find(rolesList, (role: string) => {
      return _.startsWith(role, this.roleIdPrefix);
    });

    if (_.isUndefined(roleIdAsString)) {
      return null;
    }

    let roleId = parseInt(_.last(roleIdAsString.split('_')), 10);
    return this.getRoleById(roleId);
  }

  getRoleListByPermissions(permissions: string[]): IRole[] {
    let matchedPermissions = _.filter<string>(permissions, permission => _.startsWith(permission, this.roleIdPrefix));
    let roleIds = _.map<string, number>(matchedPermissions, permission => parseInt(_.last(permission.split('_')), 10));
    return _.map<number, IRole>(roleIds, roleId => this.getRoleById(roleId));
  }

  isMarketPermission(permission: string): boolean {
    return _.startsWith(permission, MARKET_ROLE_PREFIX);
  }

  // returns a list of market ISO codes in upper case derived from the collection of permissions
  // ['cad_access_market_us', 'cad_access_market_ca'] --> ['US', 'CA']
  getMarketIsoCodes(roles: string[]): string[] {
    if (_.isEmpty(roles)) {
      return [];
    }
    return _(roles).chain()
      .filter(el => _.startsWith(el, MARKET_ROLE_PREFIX))
      .map(el => el.split(MARKET_ROLE_PREFIX)[1])
      .map(el => el.toUpperCase())
      .uniq()
      .value();
  }

  createPermissions(roles: IRole[], markets: IMarket[]): string[] {
    const rolePermissions = _.reject(this.getPermissionsFromRoles(roles), permission => {
      return _.startsWith(permission, MARKET_ROLE_PREFIX); // remove old market to add new one (CCS-477)
    });

    _.each(roles, role => rolePermissions.push(this.roleIdPrefix + role.id));

    return _.concat(rolePermissions, this.getPermissionsFromMarkets(markets));
  }

  getPermissionsFromMarkets(markets: IMarket[]): string[] {
    return _.map(markets, market => market.permission);
  }

  getPermissionsFromRoles(roles: IRole[]): string[] {
    return _.union(..._.map(roles, role => role.permissions));
  }

  getCampaignManagementRole(allRoles: IRole[]): IRole {
    return _.find(allRoles, {id: 2});
  }

  hasPermissions(user: cad.IUser, requiredPermissions: string | string[], match = 'any'): boolean {
    let permissions: string[] = _.isArray(requiredPermissions)
      ? <string[]> requiredPermissions
      : (<string> requiredPermissions).split(',');

    let commonPermissions: string[] = _.intersection(permissions, _.get(user, 'roles', []));

    if (match === 'all') {
      return permissions.length === commonPermissions.length;
    }

    return commonPermissions.length > 0;
  }

  // create new -----------------
  getAppAllRoles(app: cad.IUnityApp): Promise<IRole[]> {
    return Promise.resolve(require('./roles.json'));

    // return $http({
    //   method: 'GET',
    //   url: app.baseUrl + app.roleUrl
    // });
  }
}
