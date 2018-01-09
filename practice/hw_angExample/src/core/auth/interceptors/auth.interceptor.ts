import {AuthService} from '../services/auth.service';

export function authInterceptorFactory($injector: ng.auto.IInjectorService): Object {
  'ngInject';

  const UNAUTHORIZED_CODE = 401;
  let pendingRequests: any[] = [];

  return {
    request: _request,
    responseError: _responseError
  };

  function _request(config: ng.IRequestShortcutConfig): ng.IRequestShortcutConfig {
    // if no special flag in request config - add auth token to outgoing http requests
    if (!config.suppressAuthorization) {
      const authService = <AuthService> $injector.get('authService');

      config.headers = config.headers || {};
      if (authService.accessToken && !_.has(config.headers, 'Authorization')) {
        config.headers['Authorization'] = 'Bearer ' + authService.accessToken; // tslint:disable-line
      }
    }

    return config;
  }

  function _responseError(rejection: {status: number; config: any}): ng.IPromise<any> {
    const $q = <ng.IQService> $injector.get('$q');
    let result = $q.reject(rejection);

    // special handling of "unauthorized" http responses
    if (rejection.status === UNAUTHORIZED_CODE) {
      const $http = <ng.IHttpService> $injector.get('$http');
      const authService = <AuthService> $injector.get('authService');

      authService.accessToken = null;

      // if there's refresh token - launch refresh routine, once it finished - repeat failed requests again
      if (authService.refreshToken) {
        // remove our custom fields from request config to be able to reproduce it again
        delete rejection.config.headers.Authorization;
        delete rejection.config.prefix;

        const request = $q.defer();
        pendingRequests.push({
          defer: request,
          config: angular.copy(rejection.config)
        });
        result = request.promise;

        if (!authService.requestingRefreshToken) {
          authService.refresh()
            .then(() => {
              // repeat failed requests again
              pendingRequests.forEach(item => item.defer.resolve($http(item.config)));
            })
            .catch((error) => {
              pendingRequests.forEach(item => item.defer.reject(error));
              authService.logoutSuccess();
            })
            .finally(() => {
              pendingRequests = [];
            });
        }
      } else {
        // if no refresh token - do complete "logout-success"
        authService.logoutSuccess();
      }
    }

    return result;
  }
}
