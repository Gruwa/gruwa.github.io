import {angulartics} from 'angulartics';
import {AuthService} from '../core/auth';
import {CurrentUserService} from '../core/auth';
import {AppService} from '../core/services/app/app.service';
import {AdBlockService} from '../core/services/ad-block/ad-block.service';
import {ClipboardService} from '../core/services/clipboard/clipboard.service';
import {UrlParamsBrokerService} from '../core/services/url-params-broker/url-params-broker.service';
import {ConfigService} from '../core/services/config/config.service';
import {b64EncodeUnicode} from '../core/utils/b64';
import {AlertListService} from '../ng2/message/alerts/alerts-list.service';
import {NotificationsService} from '../ng2/header/notifications';

const SHA1 = require('crypto-js/sha1');

export function appStateChangeWatchersInit(
  $analytics: angulartics.IAnalyticsService,
  $state: ng.ui.IStateService,
  $rootScope: cad.IRootScopeService,
  notificationsService: NotificationsService,
  systemMessageService: AlertListService,
  authService: AuthService,
  $window: ng.IWindowService,
  $log: ng.ILogService,
  appService: AppService,
  currentUserService: CurrentUserService,
  configService: ConfigService
) {
  'ngInject';

  let authAreaVisited = false;

  $rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
    $log.error('State change error', error);
  });

  $rootScope.$on('$stateChangeStart', (event, toState) => {
    // don't enter login page if we are already logged in
    if (authService.isAuthenticated() && (toState.name === 'login' || toState.name === 'login-redirect')) {
      event.preventDefault();
      authService.signInRedirect();
      return;
    }

    // skip states that don't need authentication checks
    if (!toState.data || !toState.data.needAuthentication) {
      return;
    }

    // Go to login page in case if we have not authenticated yet + remember page where we were
    if (!authService.isAuthenticated()) {
      event.preventDefault();
      authService.rememberAfterLoginURL();
      $state.go('login');
      return;
    }

    // perform one-time actions required when visit authenticated area first time
    if (authService.isAuthenticated() && !authAreaVisited) {
      authAreaVisited = true;
      $rootScope.$broadcast('login-success');

      notificationsService.startPolling();
      systemMessageService.showSystemMessagesIfAny();

      // configure user ID tracking
      if (configService.googleTagManagerId) {
        $analytics.setUsername(SHA1(currentUserService.user.login).toString());
        $analytics.setUserProperties({
          dimension1: currentUserService.availableMarkets.join(',')
        });
      }
    }
  });

  // try to redirect to another app if non-existing state requested
  $rootScope.$on('$stateNotFound', (event: ng.IAngularEvent, unfound: {to: string, toParams: any}) => {
    event.preventDefault();

    // there's no "forbidden" state anymore, so just trigger page forbidden wrapper and exit
    if (unfound.to === 'forbidden') {
      $rootScope.$broadcast('forbidden:show-page-wrapper');
      return;
    }

    if (ENVIRONMENT === 'development') {
      if (unfound.to === 'login') {
        $state.go('dev-login');
        return;
      }
    }

    const newAppPath = appService.findAppPathByState(unfound.to);

    if (newAppPath) {
      const state = {
        name: unfound.to,
        params: unfound.toParams
      };

      // when there's redirect to "login" state from another app - make sure to reset auth data to open login page
      if (state.name === 'login') {
        authService.resetAuthData();
      }

      $window.location.href =
        `${newAppPath}#/redirect/?data=${encodeURIComponent(b64EncodeUnicode(angular.toJson(state)))}`;
    } else {
      $log.error('No app corresponding to state', unfound.to);
    }
  });
}

export function appGeneralInit(
  $rootScope: cad.IRootScopeService,
  $window: cad.IWindowService,
  $state: ng.ui.IStateService,
  $uibModalStack: ng.ui.bootstrap.IModalStackService,
  urlParamsBrokerService: UrlParamsBrokerService,
  notificationsService: NotificationsService,
  adBlockService: AdBlockService,
  clipboardService: ClipboardService,
  authService: AuthService,
  currentUserService: CurrentUserService,
  configService: ConfigService
) {
  'ngInject';

  $window.Highcharts.setOptions({
    tooltip: {
      style: {
        padding: 12
      }
    },
    exporting: {
      enabled: false
    }
  });

  if (authService.isAuthenticated()) {
    currentUserService.checkDefaultLocale().then(() => {
      $state.go($state.current, {}, {reload: true});
    });
  }
  adBlockService.checkAdBlock();
  clipboardService.initClipboard();

  urlParamsBrokerService.startWatchingUrl();
  $rootScope.global = {};
  $rootScope.global.isDevEnv = configService.isDevEnv.bind(configService);
  $rootScope.global.defaultModelOptions = configService.defaultModelOptions;
  $rootScope.global.mobileAppUrl = configService.mobileAppUrl;
  $rootScope.global.emailForSupportRequests = configService.emailForSupportRequests;
  $rootScope.global.whitelabel = WHITELABEL;

  // close popup when user clicks "Back" button in browser - https://cadreon.atlassian.net/browse/TTAG-1724
  $rootScope.$on('$stateChangeStart', () => {
    let top = $uibModalStack.getTop();
    if (top) {
      $uibModalStack.dismiss(top.key);
    }
  });

  $rootScope.$on('logout-success', () => notificationsService.stopPolling());
}
