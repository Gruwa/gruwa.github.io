import * as moment from 'moment-timezone';
import {IMarket} from '../../../ng2/common';

export default (ngModule) => {
  describe(ngModule.name, () => {
    let mocks = {
      configService: {
        isDevEnv: sinon.stub(),
        devDefaultUrl: 'defaultUrl'
      },
      localeService: {
        getLocaleById: sinon.stub(),
        getDefaultLocale: sinon.stub(),
        getLanguageById: sinon.stub(),
        getDefaultLanguage: sinon.stub(),
        getGroupingById: sinon.stub(),
        getDefaultGrouping: sinon.stub(),
        getDecimalById: sinon.stub(),
        getDefaultDecimal: sinon.stub(),
        applyUserPreferences: sinon.spy()
      },
      storageService: {
        write: sinon.spy(),
        read: sinon.stub(),
        remove: sinon.spy()
      },
      timezoneService: {
        getTimezoneByName: sinon.stub()
      },
      marketsService: {
        getMarketsByISOCodes: sinon.stub(),
        isUserHasMarketWithIsoCodeALL: sinon.stub(),
        getMarketById: sinon.stub()
      },
      rolesService: {
        hasPermissions: sinon.stub(),
        getMarketIsoCodes: sinon.stub()
      },
      appService: {
        getApplications: sinon.stub()
      }
    };

    const usMarket = <IMarket> {
      name: 'United States',
      isoCode: 'US',
      permission: 'cad_access_market_us',
      defaultTimeZone: null,
      timeZones: null
    };

    beforeEach(angular.mock.module(ngModule.name, ($provide) => {
      $provide.value('configService', mocks.configService);
      $provide.value('localeService', mocks.localeService);
      $provide.value('rolesService', mocks.rolesService);
      $provide.value('storageService', mocks.storageService);
      $provide.value('timezoneService', mocks.timezoneService);
      $provide.value('marketsService', mocks.marketsService);
      $provide.value('appService', mocks.appService);
    }));

    describe('services ->', () => {
      describe('CurrentUserService ->', () => {
        let service;

        beforeEach(angular.mock.inject((currentUserService) => {
          service = currentUserService;
        }));

        describe('user()', () => {
          it('should return user info', () => {
            let user = { name: 'test' };
            service._user = user;

            expect(service.user).to.deep.equal(user);
          });
        });

        describe('name() -> ', () => {
          it('should return part of "endUser" before @ sign', () => {
            _.set(service, '_user.endUser', 'aaa@bbb');
            expect(service.name).to.equal('aaa');
          });
        });

        describe('market() -> ', () => {
          it('should return user market', () => {
            let market = 'US';
            service._user = {
              market
            };
            expect(service.market).to.deep.equal(market);
          });
        });

        describe('availableMarkets() -> ', () => {
          it('should return all user available markets', () => {
            let markets = ['US', 'AU'];
            service._user = {
              roles: ['cad_access_market_us', 'cad_access_market_au']
            };
            mocks.rolesService.getMarketIsoCodes.withArgs(service._user.roles).returns(markets);

            expect(service.availableMarkets).to.equal(markets);
          });
        });

        describe('locale ->', () => {
          let defaultLocale = {
            id: 'default/locale'
          };
          beforeEach(() => {
            mocks.localeService.getDefaultLocale.returns(defaultLocale);
          });

          it('should return default locale if it is not defined in customData', () => {
            service._user = {
              customData: {}
            };
            expect(service.locale).to.deep.equal(defaultLocale);
          });

          it('should return default locale if it is defined but does not exists', () => {
            const localeData = {
              locale: 'unknown'
            };
            service._user = {
              customData: {
                localization: localeData
              }
            };
            mocks.localeService.getLocaleById.withArgs(localeData.locale).returns(undefined);

            expect(service.locale).to.deep.equal(defaultLocale);
          });

          it('should return user locale', () => {
            const localeData = {
              locale: 'en-us'
            };
            service._user = {
              customData: {
                localization: localeData
              }
            };
            const locale = { name: 'test' };
            mocks.localeService.getLocaleById.withArgs(localeData.locale).returns(locale);
            expect(service.locale).to.deep.equal(locale);
          });
        });

        describe('language ->', () => {
          let defaultLanguage = {
            id: 'default/language'
          };
          beforeEach(() => {
            mocks.localeService.getDefaultLanguage.returns(defaultLanguage);
          });

          it('should return default language if it is not defined in customData', () => {
            service._user = {
              customData: {}
            };
            expect(service.language).to.deep.equal(defaultLanguage);
          });

          it('should return default language if it is defined but does not exists', () => {
            const localeData = {
              language: 'unknown'
            };
            service._user = {
              customData: {
                localization: localeData
              }
            };
            mocks.localeService.getLanguageById.withArgs(localeData.language).returns(undefined);

            expect(service.language).to.deep.equal(defaultLanguage);
          });

          it('should return user language', () => {
            const localeData = {
              language: 'en-us'
            };
            service._user = {
              customData: {
                localization: localeData
              }
            };
            const language = { name: 'test' };
            mocks.localeService.getLanguageById.withArgs(localeData.language).returns(language);
            expect(service.language).to.deep.equal(language);
          });
        });

        describe('grouping ->', () => {
          let defaultGrouping = {
            id: 'default/grouping'
          };
          beforeEach(() => {
            mocks.localeService.getDefaultGrouping.returns(defaultGrouping);
          });

          it('should return default grouping if it is not defined in customData', () => {
            service._user = {
              customData: {}
            };
            expect(service.grouping).to.deep.equal(defaultGrouping);
          });

          it('should return default grouping if it is defined but does not exists', () => {
            const groupingData = {
              grouping: 'unknown'
            };
            service._user = {
              customData: {
                localization: groupingData
              }
            };
            mocks.localeService.getGroupingById.withArgs(groupingData.grouping).returns(undefined);

            expect(service.grouping).to.deep.equal(defaultGrouping);
          });

          it('should return user grouping', () => {
            const groupingData = {
              grouping: ' '
            };
            service._user = {
              customData: {
                localization: groupingData
              }
            };
            const grouping = { name: 'test' };
            mocks.localeService.getGroupingById.withArgs(groupingData.grouping).returns(grouping);
            expect(service.grouping).to.deep.equal(grouping);
          });
        });

        describe('decimal ->', () => {
          let defaultDecimal = {
            id: 'default/language'
          };
          beforeEach(() => {
            mocks.localeService.getDefaultDecimal.returns(defaultDecimal);
          });

          it('should return default decimal if it is not defined in customData', () => {
            service._user = {
              customData: {}
            };
            expect(service.decimal).to.deep.equal(defaultDecimal);
          });

          it('should return default decimal if it is defined but does not exists', () => {
            const localeData = {
              decimal: 'unknown'
            };
            service._user = {
              customData: {
                localization: localeData
              }
            };
            mocks.localeService.getDecimalById.withArgs(localeData.decimal).returns(undefined);

            expect(service.decimal).to.deep.equal(defaultDecimal);
          });

          it('should return user decimal', () => {
            const localeData = {
              decimal: ','
            };
            service._user = {
              customData: {
                localization: localeData
              }
            };
            const decimal = { name: 'test' };
            mocks.localeService.getDecimalById.withArgs(localeData.decimal).returns(decimal);
            expect(service.decimal).to.deep.equal(decimal);
          });
        });

        describe('timezone ->', () => {
          it('should return current user timezone if it set', () => {
            const timezoneInfo = { id: 'test' };
            const timezone = 'Africa/Ouagadougou';
            mocks.timezoneService.getTimezoneByName.withArgs('Africa/Ouagadougou').returns(timezoneInfo);

            service._user = {
              customData: {
                timezone
              }
            };
            expect(service.timezone).to.deep.equal(timezoneInfo);
          });

          it('should return guessed timezone for user timezone was not found', () => {
            const guessedTimezone = moment.tz.guess();
            const guessedTimezoneInfo = {id: 'guessed'};
            const timezone = 'Africa/Ouagadougou';
            service._user = {
              customData: {
                timezone
              }
            };
            mocks.timezoneService.getTimezoneByName.withArgs(timezone).returns(undefined);
            mocks.timezoneService.getTimezoneByName.withArgs(guessedTimezone).returns(guessedTimezoneInfo);

            expect(service.timezone).to.deep.equal(guessedTimezoneInfo);
          });

          it('should return guessed timezone for user if it is not set', () => {
            const timezone = moment.tz.guess();
            const timezoneInfo = { id: 'test' };
            service._user = {
              customData: {}
            };
            mocks.timezoneService.getTimezoneByName.withArgs(timezone).returns(timezoneInfo);

            expect(service.timezone).to.deep.equal(timezoneInfo);
          });
        });

        describe('defaultApp()', () => {
          const appCSF = {name: 'csf'};
          const appATV = {name: 'atv'};
          const appCM = {name: 'cm'};

          beforeEach(() => {
            service._user = {
              customData: {
                defaultAppName: null
              }
            };
          });

          it('should return app basing on custom data value', () => {
            mocks.appService.getApplications.returns([appCM, appATV, appCSF]);
            service._user.customData.defaultAppName = 'csf';
            expect(service.defaultApp).to.deep.equal(appCSF);
          });

          it('should fallback to CM if custom data refers to app with revoked access', () => {
            mocks.appService.getApplications.returns([appATV, appCM]);
            service._user.customData.defaultAppName = 'csf';
            expect(service.defaultApp).to.deep.equal(appCM);
          });

          it('should return CM app if it is allowed and nothing is in custom data', () => {
            mocks.appService.getApplications.returns([appCSF, appCM]);
            service._user.customData.defaultAppName = null;
            expect(service.defaultApp).to.deep.equal(appCM);
          });

          it('should return first available app if CM is not available and nothing is in custom data', () => {
            mocks.appService.getApplications.returns([appATV, appCSF]);
            service._user.customData.defaultAppName = null;
            expect(service.defaultApp).to.deep.equal(appATV);
          });
        });

        describe('get afterLoginURL()', () => {
          beforeEach(() => {
            mocks.storageService.write.reset();
            mocks.storageService.remove.reset();
          });

          it('should update afterLoginURL in the storage', () => {
            service.afterLoginURL = 'test';

            expect(mocks.storageService.write).calledWith('afterLoginURL', 'test');
            expect(mocks.storageService.remove).not.called;
          });

          it('should update afterLoginURL in the storage', () => {
            service.afterLoginURL = '';

            expect(mocks.storageService.write).not.called;
            expect(mocks.storageService.remove).calledWith('afterLoginURL');
          });

        });

        describe('set afterLoginURL()', () => {
          beforeEach(() => {
            service._user = {
              customData: {
                defaultAppName: 'default'
              }
            };
          });

          it('should remove saved url from local storage once called', () => {
            service.afterLoginURL;

            expect(mocks.storageService.read).calledWith('afterLoginURL');
            expect(mocks.storageService.remove).calledWith('afterLoginURL');
          });

          it('should redirect to saved location (if any)', () => {
            mocks.storageService.read.withArgs('afterLoginURL').returns('aaa');

            expect(service.afterLoginURL).to.equal('aaa');
          });

          it('should redirect to dev default url if we are in dev mode', () => {
            mocks.storageService.read.withArgs('afterLoginURL').returns(null);
            mocks.configService.isDevEnv.returns(true);
            mocks.configService.devDefaultUrl = 'this-is-dev-url';

            expect(service.afterLoginURL).to.equal('this-is-dev-url');
          });
        });

        describe('setCustomData()', () => {
          it('should merge passed data into custom data prop and save user in local storage', () => {
            service._user = {
              customData: {prop: 'val'}
            };
            const language = {};
            const locale = {};
            const grouping = {};
            const decimal = {};
            const saveUserToLocalStorageSpy = sinon.spy(service, 'saveUserToLocalStorage');
            sinon.stub(service, 'language', {get: () => language});
            sinon.stub(service, 'locale', {get: () => locale});
            sinon.stub(service, 'grouping', {get: () => grouping});
            sinon.stub(service, 'decimal', {get: () => decimal});

            service.setCustomData({foo: 'bar', prop: 123});
            expect(service._user.customData).to.deep.equal({foo: 'bar', prop: 123});
            expect(saveUserToLocalStorageSpy).calledOnce;
            expect(mocks.localeService.applyUserPreferences).calledWith(language, locale, grouping, decimal);
          });
        });

        describe('setMarket()', () => {
          const market = <IMarket> {
            name: 'Australia',
            isoCode: 'AU',
            permission: 'cad_access_market_au',
            defaultTimeZone: null,
            timeZones: null
          };
          let saveUserToLocalStorageSpy;
          let saveMarketToLocalStorageSpy;

          beforeEach(() => {
            service._user = <any> {};
            saveUserToLocalStorageSpy = sinon.stub(service, 'saveUserToLocalStorage');
            saveMarketToLocalStorageSpy = sinon.stub(service, 'saveMarketToLocalStorage');

            service.setMarket(market);
          });

          afterEach(() => {
            saveUserToLocalStorageSpy.restore();
            saveMarketToLocalStorageSpy.restore();
          });

          it('should save market to user', () => {
            expect(service.market).to.equal('AU');
          });

          it('should update user in local storage', () => {
            expect(saveUserToLocalStorageSpy).calledOnce;
          });

          it('should update markets record in local storage', () => {
            expect(saveMarketToLocalStorageSpy).calledOnce;
          });
        });

        describe('init()', () => {
          it('should init user from localStorage', () => {
            const user = {};
            let stub = sinon.stub(service, 'getUserFromLocalStorage');
            let spy = sinon.stub(service, 'initUser');
            stub.returns(user);

            service.init();
            expect(spy).calledOnce.calledWith(user);

            stub.restore();
            spy.restore();
          });
        });

        describe('isStateAllowed()', () => {
          it('should return true when there are no permissions in state', () => {
            let stub = sinon.stub(service, 'hasPermissions');

            const result = service.isStateAllowed({});
            expect(result).to.be.true;
            expect(stub).not.called;

            stub.restore();
          });

          it('should call hasPermissions method if state has "requiredPermissions" record', () => {
            let stub = sinon.stub(service, 'hasPermissions');
            stub.withArgs('aaa').returns(true);
            stub.withArgs('bbb').returns(false);

            expect(service.isStateAllowed({ data: { requiredPermissions: 'aaa' } })).to.be.true;
            expect(service.isStateAllowed({ data: { requiredPermissions: 'bbb' } })).to.be.false;

            stub.restore();
          });

          it('should call hasPermissions method if state has "requiredRoles" record', () => {
            let stub = sinon.stub(service, 'hasPermissions');
            stub.withArgs('aaa').returns(false);
            stub.withArgs('bbb').returns(true);

            expect(service.isStateAllowed({ data: { requiredRoles: 'bbb' } })).to.be.true;
            expect(service.isStateAllowed({ data: { requiredRoles: 'aaa' } })).to.be.false;

            stub.restore();
          });
        });

        describe('hasPermissions()', () => {
          it('should call roles service hasPermissions()', () => {
            mocks.rolesService.hasPermissions.returns(true);

            expect(service.hasPermissions('test')).to.be.true;
          });
        });

        describe('isActiveMarketWithin()', () => {
          beforeEach(() => service._user = {market: 'US'});
          it('no required markets', () => expect(service.isActiveMarketWithin([])).to.be.true);
          it('no markets specified', () => expect(service.isActiveMarketWithin(undefined)).to.be.true);
          it('current market matches', () => expect(service.isActiveMarketWithin(['US', 'CA'])).to.be.true);
          it('current market does not match', () => expect(service.isActiveMarketWithin(['SU', 'CA'])).to.be.false);
        });

        describe('setCurrentUser()', () => {
          it('should init defined user', () => {
            let initUserStub = sinon.stub(service, 'initUser');
            let saveUserToLocalStorageStub = sinon.stub(service, 'saveUserToLocalStorage');
            let saveMarketToLocalStorageStub = sinon.stub(service, 'saveMarketToLocalStorage');
            let user = {};

            service.setCurrentUser(user);

            expect(initUserStub).calledOnce.and.calledWith(user);
            expect(saveUserToLocalStorageStub).calledOnce;
            expect(saveMarketToLocalStorageStub).calledOnce;

            initUserStub.restore();
            saveUserToLocalStorageStub.restore();
            saveMarketToLocalStorageStub.restore();
          });
        });

        describe('unsetCurrentUser()', () => {
          it('should unset user', () => {
            service._user = {};
            let removeUserFromLocalStorageSpy = sinon.spy(service, 'removeUserFromLocalStorage');

            service.unsetCurrentUser();

            expect(service.user).to.be.null;
            expect(removeUserFromLocalStorageSpy).calledOnce;

            removeUserFromLocalStorageSpy.restore();
          });
        });

        describe('getUserMarketFromLocalStorage()', () => {
          it('should return user market', () => {
            let getMarketsFromLocalStorageStub = sinon.stub(service, 'getMarketsFromLocalStorage');

            const user = <any> {
              login: 'bestic'
            };
            const storageMarkets = {
              bestic: 'AU'
            };
            service._user = user;
            getMarketsFromLocalStorageStub.returns(storageMarkets);

            expect(service.getUserMarketFromLocalStorage()).to.equal('AU');

            getMarketsFromLocalStorageStub.restore();
          });
        });

        describe('getMarketsFromLocalStorage()', () => {
          it('should return markets from localStorage', () => {
            const markets = [];
            mocks.storageService.read.withArgs('markets').returns(markets);
            expect(service.getMarketsFromLocalStorage()).to.equal(markets);
          });
        });

        describe('saveMarketToLocalStorage()', () => {
          it('should store user market', () => {
            mocks.storageService.write.reset();
            const user = <any> {
              login: 'bestic',
              market: 'US'
            };
            service._user = user;
            let getMarketsFromLocalStorageStub = sinon.stub(service, 'getMarketsFromLocalStorage');
            const storageMarkets = {};
            getMarketsFromLocalStorageStub.returns(storageMarkets);

            service.saveMarketToLocalStorage();

            expect(mocks.storageService.write).calledOnce.and.calledWith('markets', {bestic: 'US'}, {useBase64: true});

            getMarketsFromLocalStorageStub.restore();
          });
        });

        describe('getUserFromLocalStorage()', () => {
          it('should call storage read() method and return it\'s result', () => {
            mocks.storageService.read.withArgs('userData').returns({foo: 'bar'});
            const result = service.getUserFromLocalStorage();
            expect(mocks.storageService.read).calledWith('userData', {useBase64: true, fallbackVal: null});
            expect(result).to.deep.equal({foo: 'bar'});
          });
        });

        describe('saveUserToLocalStorage()', () => {
          it('should call storage write() method', () => {
            service._user = {foo: 'bar'};
            service.saveUserToLocalStorage();
            expect(mocks.storageService.write).calledWith('userData', {foo: 'bar'}, {useBase64: true});
          });
        });

        describe('removeUserFromLocalStorage()', () => {
          it('should call storage remove() method', () => {
            service.removeUserFromLocalStorage();
            expect(mocks.storageService.remove).calledWith('userData');
          });
        });

        describe('findInitialMarket()', () => {
          let getUserMarketFromLocalStorageStub;

          afterEach(() => getUserMarketFromLocalStorageStub.restore());

          it('should return value loaded from local storage', () => {
            getUserMarketFromLocalStorageStub = sinon.stub(service, 'getUserMarketFromLocalStorage').returns('FR');
            sinon.stub(service, 'availableMarkets', {get: () => ['AU', 'US', 'FR']});

            expect(service.findInitialMarket()).to.equal('FR');
          });

          it('should check if loaded market is still available for user', () => {
            getUserMarketFromLocalStorageStub = sinon.stub(service, 'getUserMarketFromLocalStorage').returns('FR');
            sinon.stub(service, 'availableMarkets', {get: () => ['AU', 'US']});

            // expect to return 1st available market even though local storage value is FR market
            expect(service.findInitialMarket()).to.equal('AU');
          });

          it('should return US market for user with all markets permission', () => {
            getUserMarketFromLocalStorageStub = sinon.stub(service, 'getUserMarketFromLocalStorage').returns(null);
            mocks.marketsService.isUserHasMarketWithIsoCodeALL.returns(true);

            expect(service.findInitialMarket()).to.equal('US');
          });

          it('should return 1st item from available markets list', () => {
            getUserMarketFromLocalStorageStub = sinon.stub(service, 'getUserMarketFromLocalStorage').returns(null);
            sinon.stub(service, 'availableMarkets', {get: () => ['AU', 'US']});
            mocks.marketsService.isUserHasMarketWithIsoCodeALL.returns(false);

            expect(service.findInitialMarket()).to.equal('AU');
          });

          it('should return null for user with no markets assigned', () => {
            getUserMarketFromLocalStorageStub = sinon.stub(service, 'getUserMarketFromLocalStorage').returns(null);
            mocks.marketsService.isUserHasMarketWithIsoCodeALL.returns(false);
            sinon.stub(service, 'availableMarkets', {get: () => []});

            expect(service.findInitialMarket()).to.be.null;
          });
        });

        describe('initUser() -> ', () => {
          it('should init user with initial data', () => {
            let stub = sinon.stub(service, 'findInitialMarket').returns(usMarket);
            let user = {
              customData: {
                localization: {
                  language: 'en-us',
                  locale: 'en-us',
                  grouping: '.',
                  decimal: '.'
                }
              }
            };

            service.initUser(user);

            expect(service._user).to.equal(user);
            expect(service._user.market).to.equal(usMarket);
            expect(mocks.localeService.applyUserPreferences).calledWith(
              service.language,
              service.locale,
              service.grouping,
              service.decimal
            );
            stub.restore();
          });
        });
      });
    });
  });
};
