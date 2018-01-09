import {ConfigService} from '../../../../ng2/common/services/config/config.service';

export function UsersResource(
  $resource: ng.resource.IResourceService,
  configService: ConfigService
): cad.IUsersResource {
  'ngInject';

  let url = configService.getUserInfoURL() + 'users/:userName';

  let actions = {
    me: {
      url: url + 'users/me',
      method: 'GET'
    },
    update: {
      params: {
        userName: '@userName'
      },
      method: 'PUT'
    },
    changeUserPassword: {
      url: url + '/password',
      params: {
        userName: '@userName'
      },
      method: 'PUT'
    },
    changePassword: {
      method: 'PUT'
    },
    resetPassword: {
      url: url + '/change-password-request',
      params: {
        userName: '@userName'
      },
      method: 'POST'
    },
    resetPasswordByUser: {
      url: url + '/change-password-request-by-user',
      params: {
        userName: '@userName'
      },
      method: 'POST'
    },
    enable: {
      url: url + '/enable',
      params: {
        userName: '@userName'
      },
      method: 'PUT'
    }
  };

  return <cad.IUsersResource> $resource(url, {}, actions);
}
