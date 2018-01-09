/* tslint:disable:max-file-line-count */
import * as moment from 'moment-timezone';

import {LocaleService, ILocale, ILanguage, IGrouping, IDecimal} from '../../services/locale/locale.service';
import {TimezoneService, ITimezoneInfo} from '../../timezone';
import {MarketsService} from '../../services/resources/markets/markets.service';
import {StorageService} from '../../services/storage/storage.service';
import {AppService} from '../../services/app/app.service';
import {RolesService} from '../../services/resources/roles/roles.service';
import {ConfigService} from '../../services/config/config.service';
import {DefaultLocalePopupController} from '../components/default-locale-popup/default-locale-popup.controller';
import {IMarket} from '../../../ng2/common';

export class CurrentUserService {
  private _user: cad.IUser = null;

  constructor(
    private $uibModal: ng.ui.bootstrap.IModalService,
    private $q: ng.IQService,
    private configService: ConfigService,
    private localeService: LocaleService,
    private storageService: StorageService,
    private timezoneService: TimezoneService,
    private rolesService: RolesService,
    private appService: AppService,
    private marketsService: MarketsService) {
    'ngInject';
  }

  /**
   * Direct interface for getting currently authorized user. To prevent mutation this function returns user copy.
   *
   * @returns {cad.IUser}
   */
  get user(): cad.IUser {
    return angular.copy(this._user);
  }

  /**
   * Returns user name. Used in some API calls to get info about user
   *
   * @returns {string}
   */
  get name(): string {
    return this._user.endUser.substr(0, this._user.endUser.indexOf('@'));
  }

  /**
   * Returns user market iso code (copy)
   *
   * @returns {string} market ISOCode
   */
  get market(): string {
    return angular.copy(_.get(this._user, 'market'));
  }

  /**
   * Returns sorted list of all markets available to user
   *
   * @returns {string[]}
   */
  get availableMarkets(): string[] {
    return this.rolesService.getMarketIsoCodes(this._user.roles).sort();
  }

  /**
   * Returns current user locale (set from user preferences) or default if not set
   *
   * @returns {ILocale}
   */
  get locale(): ILocale {
    let localeId: string = _.get(this._user, 'customData.localization.locale');
    if (!localeId) {
      return {...this.localeService.getDefaultLocale()};
    }

    let locale: ILocale = this.localeService.getLocaleById(localeId);

    if (!locale) {
      return {...this.localeService.getDefaultLocale()};
    }

    return {...locale};
  }

  /**
   * Returns current user language (set from user preferences) or default if not set
   *
   * @returns {ILanguage}
   */
  get language(): ILanguage {
    let languageId: string = _.get(this._user, 'customData.localization.language');

    if (!languageId) {
      return {...this.localeService.getDefaultLanguage()};
    }

    let language: ILanguage = this.localeService.getLanguageById(languageId);
    if (!language) {
      return {...this.localeService.getDefaultLanguage()};
    }

    return {...language};
  }

  /**
   * Returns user preferences according to how to group digits in numbers. 1'234'567
   *
   * @returns {IGrouping}
   */
  get grouping(): IGrouping {
    let groupingId: string = _.get(this._user, 'customData.localization.grouping');

    if (!groupingId) {
      return {...this.localeService.getDefaultGrouping(this.locale)};
    }

    let grouping: IGrouping = this.localeService.getGroupingById(groupingId);
    if (!grouping) {
      return {...this.localeService.getDefaultGrouping(this.locale)};
    }
    return {...grouping};
  }

  /**
   * Returns user preferences according to how to sepatage integer part of the number and decimal
   *
   * @returns {IDecimal}
   */
  get decimal(): IDecimal {
    let decimalId: string = _.get(this._user, 'customData.localization.decimal');

    if (!decimalId) {
      return {...this.localeService.getDefaultDecimal(this.locale)};
    }

    let decimal: IDecimal = this.localeService.getDecimalById(decimalId);
    if (!decimal) {
      return {...this.localeService.getDefaultDecimal(this.locale)};
    }

    return {...decimal};
  }

  /**
   * Returns user locale from preferences or settings from browser.
   *
   * @returns {ITimezoneInfo}
   */
  get timezone(): ITimezoneInfo {
    let getGuessedTimezone = (): ITimezoneInfo => {
      let guessedTimezone = moment.tz.guess();
      if (guessedTimezone) {
        return this.timezoneService.getTimezoneByName(guessedTimezone);
      }
    };

    let timezoneName: string = _.get(this._user, 'customData.timezone');

    if (!timezoneName) {
      return {...getGuessedTimezone()};
    }

    let timezone: ITimezoneInfo = this.timezoneService.getTimezoneByName(timezoneName);
    if (!timezone) {
      return {...getGuessedTimezone()};
    }
    return {...timezone};
  }

  /**
   * Returns user default application that should be navigated by default after clear login
   *
   * @returns {cad.IUnityApp}
   */
  get defaultApp(): cad.IUnityApp {
    const appList = this.appService.getApplications(this._user);
    const userApp = _.find(appList, {name: this._user.customData.defaultAppName});
    const cmApp =  _.find(appList, {name: 'cm'});

    // if no default user app via user custom data - fallback to either CM or first available app
    return angular.copy(userApp || cmApp || appList[0]);
  }

  /**
   * set / delete (if empty) last visited url, need to be redirected to
   *
   * @param url
   */
  set afterLoginURL(url: string) {
    if (!url) {
      this.storageService.remove('afterLoginURL', {type: 'session'});
    } else {
      this.storageService.write('afterLoginURL', url, {type: 'session'});
    }
  }

  /**
   * Getting url to redirect for user
   *
   * @returns {any|string}
   */
  get afterLoginURL(): string {
    const afterLoginURL = this.storageService.read('afterLoginURL', {type: 'session'});
    this.storageService.remove('afterLoginURL', {type: 'session'});

    let defaultUrl: string;
    if (this.configService.isDevEnv() && this.configService.devDefaultUrl) {
      defaultUrl = this.configService.devDefaultUrl;
    } else {
      defaultUrl = this.defaultApp.entryUrl;
    }
    return afterLoginURL || defaultUrl;
  }

  /**
   * Merges passed data into "customData" user property and save user to local storage
   *
   * @param data - any object
   */
  setCustomData(data: Object) {
    _.assign(this._user.customData, data);
    this.saveUserToLocalStorage();
    this.localeService.applyUserPreferences(
      this.language,
      this.locale,
      this.grouping,
      this.decimal
    );
  }

  /**
   * Changes user market. Replaces User and Market in LocalStorage
   *
   * @param market
   */
  setMarket(market: IMarket) {
    this._user.market = market.isoCode;

    // update user in local storage to keep selected market when navigating thru Unity apps
    this.saveUserToLocalStorage();
    this.saveMarketToLocalStorage();
  }

  /**
   * Init User. This function is called after user successfully authorized. Replaces User and Market in LocalStorage
   *
   * @param user
   */
  setCurrentUser(user: cad.IUser) {
    this.initUser(user);
    this.saveUserToLocalStorage();
    this.saveMarketToLocalStorage();
  }

  /**
   * Remove current user info. Remove info from localStorage. Info about user market is retained
   */
  unsetCurrentUser() {
    this._user = null;
    this.removeUserFromLocalStorage();
  }

  /**
   * Returns market that should be active - either last active market from local storage or basing on user's roles
   *
   * @returns {IMarket}
   */
  findInitialMarket(): string {
    const lastActiveMarket = this.getUserMarketFromLocalStorage();
    const isAllMarketsAvailable = this.marketsService.isUserHasMarketWithIsoCodeALL(this._user);

    // if saved marked exists and it's still available to user - return it
    if (lastActiveMarket && (isAllMarketsAvailable || _.includes(this.availableMarkets, lastActiveMarket))) {
      return lastActiveMarket;
    }

    if (isAllMarketsAvailable) {
      return 'US';
    }

    return _.isEmpty(this.availableMarkets) ? null : this.availableMarkets[0];
  }

  /**
   * Then browser page is reloaded it's need to restore information about currently authorized user.
   * This function is responsible for this actions.
   */
  public init() {
    const user: cad.IUser = this.getUserFromLocalStorage();

    if (user) {
      this.initUser(user);
    }
  }

  /**
   * Checks if state is allowed to be navigated to user
   *
   * @param state
   * @returns {boolean}
   */
  isStateAllowed(state: ng.ui.IState): boolean {
    const requiredPermissions: string = _.get(state, 'data.requiredPermissions') ||
                                        _.get(state, 'data.requiredRoles');

    const requiredMarkets: string[] = _.get(state, 'data.requiredMarkets', []);

    // if no roles|markets required the state is allowed
    if (!requiredPermissions && _.isEmpty(requiredMarkets)) {
      return true;
    }

    return this.hasPermissions(requiredPermissions) && this.isActiveMarketWithin(requiredMarkets);
  }

  /**
   * Checks if current user has specified permissions
   *
   * @param requiredPermissions
   * @param match
   * @returns {boolean}
   */
  hasPermissions(requiredPermissions: string | string[], match = 'any'): boolean {
    return this.rolesService.hasPermissions(this._user, requiredPermissions, match);
  }

  /**
   * Checks if current user set locale, if not - show popup with
   * suggestion to use locale (determined by browser) in Unity
   */
  checkDefaultLocale(): ng.IPromise<void> {
    // Do not show modal popup if user already set locale
    if (_.get(this._user, 'customData.localization.locale')) {
      return this.$q.reject();
    }

    let browserLocale = this.localeService.getLocaleBasedByBrowser();

    // Do not show modal popup if it's not possible to determine locale
    if (!browserLocale) {
      return this.$q.reject();
    }

    // Do not show modal popup if user browser locale is the same as Unity default locale
    if (browserLocale === this.localeService.getDefaultLocale()) {
      return this.$q.reject();
    }

    // Do not show modal popup if we already have asked about it in this session
    if (this.storageService.read('alreadyAskedAboutLocale', {type: 'session'})) {
      return this.$q.reject();
    }

    let modal = this.$uibModal.open({
      size: 'sm-440',
      template: require('../components/default-locale-popup/default-locale-popup.html'),
      controller: DefaultLocalePopupController,
      controllerAs: 'vm',
      resolve: {
        browserLocale
      }
    });

    return modal.result.catch(() => {
      this.storageService.write('alreadyAskedAboutLocale', true, {type: 'session'});
    });
  }

  /**
   * Checks if active market is among requiredMarkets
   *
   * @param requiredMarkets
   * @returns {boolean}
   */
  isActiveMarketWithin(requiredMarkets: string[]): boolean {
    if (_.isEmpty(requiredMarkets)) {
      return true;
    }

    return _.includes(requiredMarkets, this.market);
  }

  /**
   * Get user market ISO code from localStorage
   *
   * @returns {string}
   */
  private getUserMarketFromLocalStorage(): string {
    const storageMarkets = this.getMarketsFromLocalStorage();
    let marketISOCode = storageMarkets[this._user.login];

    // backward compatibility
    // if we have Market Id instead of Market ISO Code - convert it
    if (_.isString(marketISOCode) && marketISOCode.length > 2) {
      [marketISOCode] = this.rolesService.getMarketIsoCodes([marketISOCode]);
    }
    return marketISOCode;
  }

  /**
   * Get all markets from localStorage
   *
   * @returns {string[]}
   */
  private getMarketsFromLocalStorage(): string[] {
    return this.storageService.read('markets', {useBase64: true});
  }

  /**
   * Storing user's market.
   *
   * "market" record in local storage is object where key - user login, value - market ISO Code
   */
  private saveMarketToLocalStorage() {
    const storageMarkets = this.getMarketsFromLocalStorage();
    storageMarkets[this._user.login] = this._user.market;
    this.storageService.write('markets', storageMarkets, {useBase64: true});
  }

  /**
   * Get information about currently authorized user from localStorage.
   *
   * @returns {any}
   */
  private getUserFromLocalStorage(): cad.IUser {
    return this.storageService.read('userData', {useBase64: true, fallbackVal: null});
  }

  /**
   * Save information about currently authorized user to localStorage.
   */
  private saveUserToLocalStorage() {
    this.storageService.write('userData', this._user, {useBase64: true});
  }

  /**
   * Remove any information about currently authorized user to localStorage.
   */
  private removeUserFromLocalStorage() {
    this.storageService.remove('userData');
    this.storageService.remove('alreadyAskedAboutLocale', {type: 'session'});
  }

  /**
   * Initialize application with user preferences
   *
   * @param user
   */
  private initUser(user: cad.IUser) {
    this._user = user;
    this._user.market = this.findInitialMarket();

    // Apply custom user preferences (locale, language)
    this.localeService.applyUserPreferences(this.language, this.locale, this.grouping, this.decimal);
  }
}
