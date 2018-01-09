import {LoginController} from './login/login.controller';
import {b64DecodeUnicode} from '../core/utils/b64';

export function appRoutesConfig(
  $stateProvider: ng.ui.IStateProvider,
  $urlRouterProvider: ng.ui.IUrlRouterProvider
) {
  'ngInject';

  $urlRouterProvider.otherwise(($injector: ng.auto.IInjectorService) => {
    (<any> $injector.get('authService')).invalidRouteRedirect();
  });

  $stateProvider
    .state('shell', {
      abstract: true,
      template: '<cad-ngx-main-view></cad-ngx-main-view>',
      data: {
        needAuthentication: true,
        pageTitle: 'global.default_title'
      },
      params: {
        // declare param at app root state to cadTrackFormChanges works properly across all apps in Unity
        ignoreUnsavedForm: false
      }
    })
    .state('redirectFromOtherUnityApp', {
      url: '/redirect/?data',
      controller: ($window: ng.IWindowService, $state: ng.ui.IStateService, $stateParams) => {
        'ngInject';

        let state: ng.ui.IState;
        const dataRaw = $stateParams.data;

        try {
          // decode base64 and then parse json
          state = angular.fromJson(b64DecodeUnicode(decodeURIComponent(dataRaw)));
        } catch (e) {
          state = {};
        }

        if (_.isEmpty(state.name)) {
          // replace is to not remember this redirect url in browser history
          $window.location.replace($window.location.origin + $window.location.pathname);
        } else {
          const options = {
            location: 'replace', // replaces last history record to not navigate this state by "back" button
            inherit: false // don't inherit url parameters from current url
          };
          $state.go(state.name, state.params, options);
        }
      }
    });

  if (ENVIRONMENT === 'development') {
    // configure state depending on sso flag
    $stateProvider.state('dev-login', {
      url: '/dev-login',
      controllerAs: 'vm',
      controllerProvider: configService => {
        return configService.ssoEnabled ? null : LoginController;
      },
      templateProvider: configService => {
        return configService.ssoEnabled ? '<cad-ngx-dev-login />' : require('./login/dev-login.html');
      }
    });
  }
}
