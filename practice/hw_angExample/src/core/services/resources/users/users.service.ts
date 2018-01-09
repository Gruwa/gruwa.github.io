import IUser = cad.IUser;
import {RolesService} from '../../../../ng2/common/services/roles/roles.service';
import {ConfigService} from '../../../../ng2/common/services/config/config.service';
import {IMarket} from '../../../../ng2/common';

export interface IUsersRequestParams {
  page?: number;
  size?: number;
  search?: string;
  market?: string;
  role?: string;
  isLocked?: boolean;
  status?: 'active' | 'inactive';
}

export interface IListUser extends cad.IUser {
  fullName: string;
  isSelected?: boolean;
  marketNames: string[];
  markets: string[];
  appNames: string[];
  roleNames: string[];
}

export interface IExportCSVData {
  link: string;
}

export interface IUserStatus {
  key: string;
  title: string;
}

export class UsersService {
  url = this.configService.getUserInfoURL() + 'users/';

  private statusList: IUserStatus[] = [
    {
      key: 'active',
      title: this.$translate.instant('user.statuses.active')
    },
    {
      key: 'inactive',
      title: this.$translate.instant('user.statuses.inactive')
    }
  ];

  constructor(
    private $q: ng.IQService,
    private $log: ng.ILogService,
    private $http: ng.IHttpService,
    private $translate: ng.translate.ITranslateService,
    private rolesService: RolesService,
    private $cacheFactory: ng.ICacheFactoryService,
    private configService: ConfigService,
    private User: cad.IUsersResource
  ) {
    'ngInject';
  }

  getMe(): ng.IPromise<IUser> {
    return this.User.me().$promise.then(data => {
      data.customData = this.parseCustomData(data.customData);
      return data;
    });
  }

  getUser(userName: string): ng.IPromise<IUser> {
    return this.User.get({userName}).$promise.then((user) => {
      user.roles = _.without(user.roles, 'Internal/everyone');
      user.customData = this.parseCustomData(user.customData);
      return user;
    });
  }

  getUsersForPage(params: IUsersRequestParams = {}): Promise<cad.IEntityListResponse<IUser>> {
    const defaultParams: IUsersRequestParams = {
      page: 0,
      size: 10
    };

    const url = this.configService.getUserInfoURL() + 'users/paged';
    const config = {
      cache: true,
      params: {...defaultParams, ...params}
    };

    return this.$http.get<cad.IEntityListResponse<IUser>>(url, config).then((resp) => {
      _.each(resp.data.content, user => {
        user.customData = this.parseCustomData(user.customData);
      });

      return resp.data;
    });
  }

  createUser(data: Object): ng.IPromise<IUser> {
    return this.User.save(data).$promise;
  }

  updateUser(userName: string, data: Object): ng.IPromise<IUser> {
    const params = _.extend({userName}, data);
    return this.User.update(params).$promise.finally(() => {
      // invalidate cache when user has been updated so that users list reflect changes
      this.$cacheFactory.get('$http').removeAll();
    });
  }

  deleteUser(userName: string): ng.IPromise<Object> {
    return this.User.delete({userName}).$promise.finally(() => {
      // invalidate cache when user has been deleted so that users list reflect changes
      this.$cacheFactory.get('$http').removeAll();
    });
  }

  updateStatus(userName: string, enable: boolean): ng.IPromise<Object> {
    return this.User.enable({userName, enable}).$promise.finally(() => {
      // invalidate cache when user has been deleted so that users list reflect changes
      this.$cacheFactory.get('$http').removeAll();
    });
  }

  // Admin change password to arbitrary user
  changeUserPassword(userName: string, newPassword: string): ng.IPromise<IUser> {
    return this.User.changeUserPassword({userName , newPassword}).$promise;
  }

  changePassword(data: Object): ng.IPromise<IUser> {
    return this.User.changePassword(data).$promise;
  }

  resetPassword(userName: string): ng.IPromise<IUser> {
    return this.User.resetPassword({userName}).$promise;
  }

  resetPasswordByUser(userName: string): ng.IPromise<IUser> {
    return this.User.resetPasswordByUser({userName}).$promise;
  }

  transformUsersForList(users: cad.IUser[], allMarkets: IMarket[]): IListUser[] {
    return users.map(user => {
      const userForList = <IListUser> _.cloneDeep(user);
      const markets = _.filter(allMarkets, market => {
        return _.includes(this.rolesService.getMarketIsoCodes(user.roles), market.isoCode);
      });

      userForList.fullName = user.fname || user.lname ? user.fname + ' ' + user.lname : '';
      userForList.marketNames = _.map<IMarket, string>(markets, 'name');
      userForList.markets = _.map<IMarket, string>(markets, 'isoCode');

      return userForList;
    });
  }

  export2csv(roleId?: string): ng.IPromise<IExportCSVData> {
    const url = this.configService.getUserInfoURL() + 'users/export';
    const config = roleId ? {params: {role: roleId}} : {};

    return this.$http.get<IExportCSVData>(url, config).then(response => response.data);
  }

  // Create New -----------------

  createUserNew(user: IUser): ng.IPromise<IUser> {
    user = this.prepareUserForSaving(angular.copy(user));
    return this.$q.resolve(user);
  }

  getStatusList(): IUserStatus[] {
    return this.statusList;
  }

  private prepareUserForSaving(user: IUser): IUser {
    if (user.isSuperAdmin) {
      user.apps = [];
    }

    return user;
  }

  private parseCustomData(customData: any): cad.IUserCustomData {
    let result: Object;
    try {
      result = angular.fromJson(customData);
      if (!_.isObject(result)) {
        throw 'error';
      }
    } catch (e) {
      this.$log.error('Incorrect user custom data object. Initialize empty object');
      result = {};
    }
    return result;
  }
}
