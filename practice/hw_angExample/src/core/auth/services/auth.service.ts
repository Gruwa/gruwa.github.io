import * as _ from 'lodash';
import {StorageService} from '../../services/storage/storage.service';
import {ConfigService} from '../../services/config/config.service';
import {CurrentUserService} from './current-user.service';

export class AuthService {
  requestingRefreshToken: boolean = false;
  expirePopup: ng.ui.bootstrap.IModalServiceInstance;

  private tokenUrl: string;
  private revokeUrl: string;
  private httpConfig: Object;

  constructor(
    private configService: ConfigService,
    private $rootScope: cad.IRootScopeService,
    private $http: ng.IHttpService,
    private $window: ng.IWindowService,
    private $state: ng.ui.IStateService,
    private $httpParamSerializerJQLike,
    private $uibModal: ng.ui.bootstrap.IModalService,
    private currentUserService: CurrentUserService,
    private storageService: StorageService
  ) {
    'ngInject';

    this.tokenUrl = configService.baseURL + 'token';
    this.revokeUrl = configService.baseURL + 'revoke';
    this.httpConfig = {
      headers: <ng.IHttpRequestConfigHeaders> {
        'Authorization': 'Basic ' + $window.btoa(configService.key + ':' + configService.secret),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    this.currentUserService.init();
  }

  get accessToken(): string {
    return this.storageService.read('accessToken');
  }
  set accessToken(value: string) {
    if (value) {
      this.expirePopup = null;
      this.storageService.write('accessToken', value);
    } else {
      this.storageService.remove('accessToken');
    }
  }

  get refreshToken(): string {
    return this.storageService.read('refreshToken');
  }
  set refreshToken(value: string) {
    if (value) {
      this.storageService.write('refreshToken', value);
    } else {
      this.storageService.remove('refreshToken');
    }
  }

  // user must be loaded in order to perform many operations in app, thus check for both tokens and user as well
  isAuthenticated(): boolean {
    return !_.isEmpty(this.accessToken) &&
           !_.isEmpty(this.refreshToken) &&
           !_.isEmpty(this.currentUserService.user);
  }

  authenticate(login: string, password: string): ng.IPromise<void> {
    const params: any = {
      grant_type: 'password',
      username: login
    };

    // add "password" prop only when password is set
    if (!_.isEmpty(password)) {
      params.password = password;
    }

    const data = this.$httpParamSerializerJQLike(params);

    return this.$http.post(this.tokenUrl, data, this.httpConfig).then((response) => {
      this.accessToken = _.get(response, 'data.access_token', null);
      this.refreshToken = _.get(response, 'data.refresh_token', null);
    });
  }

  revoke(): ng.IPromise<void> {
    const data = this.$httpParamSerializerJQLike({ token: this.accessToken });
    return this.$http.post(this.revokeUrl, data, this.httpConfig).then(() => this.resetAuthData());
  }

  refresh(): ng.IPromise<void> {
    const data = this.$httpParamSerializerJQLike({
      grant_type: 'refresh_token',
      refresh_token: this.refreshToken
    });
    this.requestingRefreshToken = true;

    return this.$http.post(this.tokenUrl, data, this.httpConfig)
      .then((response) => {
        this.accessToken = _.get(response, 'data.access_token', null);
        this.refreshToken = _.get(response, 'data.refresh_token', null);
      })
      .finally(() => {
        this.requestingRefreshToken = false;
      });
  }

  rememberAfterLoginURL() {
    const url = this.$window.location.pathname + this.$window.location.hash;
    this.currentUserService.afterLoginURL = url;
  }

  clearAfterLoginURL() {
    this.currentUserService.afterLoginURL = '';
  }

  signInRedirect() {
    this.$window.location.assign(this.currentUserService.afterLoginURL);
  }

  startSso() {
    this.$window.location.href = '/saml-redirect';
  }

  invalidRouteRedirect() {
    if (this.isAuthenticated()) {
      this.$window.location.assign(this.currentUserService.defaultApp.entryUrl);
    } else {
      this.$state.go('login');
    }
  }

  logoutSuccess() {
    // exit if auth expiration popup is already visible
    if (this.expirePopup) return;

    this.resetAuthData();
    this.$rootScope.$broadcast('logout-success');
    if (_.get(this.$state, 'current.name') !== 'login') {
      this.showExpireModal();
    }
  }

  showExpireModal() {
    this.rememberAfterLoginURL();

    this.expirePopup = this.$uibModal.open({
      backdrop: 'static',
      template: require('../templates/auth-expire-popup.html'),
      size: 'sm-390',
      controller: ($scope, $uibModalInstance) => {
        'ngInject';
        $scope.ok = () => {
          $uibModalInstance.close();
          this.$state.go('login');
        };
      }
    });
  }

  resetAuthData() {
    this.accessToken = null;
    this.refreshToken = null;
    this.currentUserService.unsetCurrentUser();
  }
}
