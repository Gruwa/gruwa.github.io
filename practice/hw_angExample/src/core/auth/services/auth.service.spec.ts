import {AuthService} from './auth.service';

export default (ngModule) => {
  describe(ngModule.name, () => {
    describe('authService', () => {
      let $q: ng.IQService;
      let mocks: any = {};
      let service: AuthService;

      function createService(): AuthService {
        return new AuthService(
          mocks.configService,
          mocks.$rootScope,
          mocks.$http,
          mocks.$window,
          mocks.$state,
          mocks.$httpParamSerializerJQLike,
          mocks.$uibModal,
          mocks.currentUserService,
          mocks.storageService
        );
      }

      beforeEach(() => {
        mocks = {
          configService: {
            baseURL: 'some-url',
            key: 'some-key',
            secret: 'some-secret',
            isDevEnv: sinon.stub()
          },
          $http: {
            post: sinon.stub()
          },
          $window: {
            btoa: sinon.stub(),
            location: {
              pathname: 'aaa',
              hash: 'bbb',
              assign: sinon.stub()
            }
          },
          $state: {
            go: sinon.spy()
          },
          $httpParamSerializerJQLike: sinon.stub(),
          currentUserService: {
            user: null,
            init: sinon.spy(),
            setCurrentUserFromLocalStorage: sinon.spy(),
            unsetCurrentUser: sinon.spy(),
            defaultApp: {entryUrl: ''},
            afterLoginURL: ''
          },
          storageService: {
            read: sinon.stub(),
            write: sinon.stub(),
            remove: sinon.stub()
          },
          $uibModal: {
            open: sinon.stub()
          }
        };

        angular.mock.inject((_$q_, $rootScope) => {
          $q = _$q_;
          mocks.$rootScope = $rootScope;
        });
      });

      it('should exist', () => {
        expect(AuthService).to.exist;
      });

      describe('accessToken', () => {
        beforeEach(() => service = createService());

        it('should read token from local storage', () => {
          mocks.storageService.read.withArgs('accessToken').returns('aaa');
          expect(service.accessToken).to.equal('aaa');
        });

        it('should save token to local storage', () => {
          service.accessToken = 'bbb';
          expect(mocks.storageService.write).calledWith('accessToken', 'bbb');
        });

        it('should reset auth popup', () => {
          service.expirePopup = <any> 'zzz';
          service.accessToken = 'bbb';
          expect(service.expirePopup).to.be.null;
        });
      });

      describe('refreshToken', () => {
        beforeEach(() => service = createService());

        it('should read token from local storage', () => {
          mocks.storageService.read.withArgs('refreshToken').returns('aaa');
          expect(service.refreshToken).to.equal('aaa');
        });

        it('should save token to local storage', () => {
          service.refreshToken = 'bbb';
          expect(mocks.storageService.write).calledWith('refreshToken', 'bbb');
        });
      });

      describe('isAuthenticated()', () => {
        beforeEach(() => service = createService());

        it('should count user authenticated when both tokens and user are set', () => {
          mocks.storageService.read.withArgs('accessToken').returns('aaa');
          mocks.storageService.read.withArgs('refreshToken').returns('bbb');
          mocks.currentUserService.user = {foo: 'bar'};
          expect(service.isAuthenticated()).to.be.true;
        });

        it('should not count user authenticated when tokens are missed', () => {
          mocks.storageService.read.withArgs('accessToken').returns('aaa');
          mocks.storageService.read.withArgs('refreshToken').returns(null);
          mocks.currentUserService.user = {foo: 'bar'};
          expect(service.isAuthenticated()).to.be.false;

          mocks.storageService.read.withArgs('accessToken').returns(null);
          mocks.storageService.read.withArgs('refreshToken').returns('bbb');
          mocks.currentUserService.user = {foo: 'bar'};
          expect(service.isAuthenticated()).to.be.false;
        });

        it('should not count user authenticated when user is missed', () => {
          mocks.storageService.read.withArgs('accessToken').returns('aaa');
          mocks.storageService.read.withArgs('refreshToken').returns('bbb');
          mocks.currentUserService.user = null;
          expect(service.isAuthenticated()).to.be.false;
        });
      });

      describe('authenticate()', () => {
        let postDefer: ng.IDeferred<any>;

        beforeEach(() => {
          service = createService();
          postDefer = $q.defer();
          mocks.$http.post.returns(postDefer.promise);
        });

        it('should call BE to get tokens', () => {
          service.authenticate('aaa', 'bbb');
          expect(mocks.$httpParamSerializerJQLike)
            .calledWith({ grant_type: 'password', username: 'aaa', password: 'bbb' });
          expect(mocks.$http.post).calledWithMatch('token');
        });

        it('should set tokens on success BE call', () => {
          service.authenticate('aaa', 'bbb');
          postDefer.resolve({ data: { access_token: 'xxx', refresh_token: 'yyy' }});
          mocks.$rootScope.$digest();
          expect(mocks.storageService.write).calledWith('accessToken', 'xxx');
          expect(mocks.storageService.write).calledWith('refreshToken', 'yyy');
        });
      });

      describe('revoke()', () => {
        let postDefer: ng.IDeferred<any>;

        beforeEach(() => {
          service = createService();
          postDefer = $q.defer();
          mocks.$http.post.returns(postDefer.promise);
        });

        it('should call BE', () => {
          mocks.storageService.read.withArgs('accessToken').returns('aaa');
          service.revoke();
          expect(mocks.$httpParamSerializerJQLike).calledWith({ token: 'aaa' });
          expect(mocks.$http.post).calledWithMatch('revoke');
        });

        it('should reset all stuff on successful BE call', () => {
          let spy = sinon.spy(service, 'resetAuthData');

          mocks.storageService.read.withArgs('accessToken').returns('aaa');
          mocks.storageService.read.withArgs('refreshToken').returns('bbb');
          mocks.currentUserService.user = {foo: 'bar'};

          service.revoke();
          postDefer.resolve();
          mocks.$rootScope.$digest();

          expect(spy).calledOnce;

          spy.restore();
        });
      });

      describe('refresh()', () => {
        let postDefer: ng.IDeferred<any>;

        beforeEach(() => {
          service = createService();
          postDefer = $q.defer();
          mocks.$http.post.returns(postDefer.promise);
        });

        it('should call BE to get tokens', () => {
          mocks.storageService.read.withArgs('refreshToken').returns('bbb');
          service.refresh();
          expect(mocks.$httpParamSerializerJQLike).calledWith({ grant_type: 'refresh_token', refresh_token: 'bbb' });
          expect(mocks.$http.post).calledWithMatch('token');
        });

        it('should set tokens on success BE call', () => {
          service.refresh();
          postDefer.resolve({ data: { access_token: 'xxx', refresh_token: 'yyy' }});
          mocks.$rootScope.$digest();
          expect(mocks.storageService.write).calledWith('accessToken', 'xxx');
          expect(mocks.storageService.write).calledWith('refreshToken', 'yyy');
        });

        it('should reset "requestingRefreshToken" flag', () => {
          expect(service.requestingRefreshToken).to.be.false;
          service.refresh();
          expect(service.requestingRefreshToken).to.be.true;
          postDefer.resolve();
          mocks.$rootScope.$digest();
          expect(service.requestingRefreshToken).to.be.false;
        });
      });

      describe('rememberAfterLoginURL()', () => {
        it('should save url to local storage', () => {
          service = createService();
          service.rememberAfterLoginURL();
          expect(mocks.currentUserService.afterLoginURL).to.be.equal(
            mocks.$window.location.pathname + mocks.$window.location.hash
          );
        });
      });

      describe('clearAfterLoginURL()', () => {
        it('should remove url from local storage', () => {
          mocks.currentUserService.afterLoginURL = 'some URL';

          service = createService();
          service.clearAfterLoginURL();
          expect(mocks.currentUserService.afterLoginURL).to.be.equal('');
        });
      });

      describe('signInRedirect()', () => {
        it('should redirect to user default app url', () => {
          mocks.currentUserService.afterLoginURL = 'zzz';
          service = createService();
          service.signInRedirect();
          expect(mocks.$window.location.assign).calledWithExactly('zzz');
          mocks.$window.location.assign.reset();
        });
      });

      describe('invalidRouteRedirect()', () => {
        it('should go to user default app url if authenticated', () => {
          service = createService();
          sinon.stub(service, 'isAuthenticated').returns(true);
          mocks.currentUserService.defaultApp.entryUrl = 'qqq';
          service.invalidRouteRedirect();
          expect(mocks.$window.location.assign).calledWithExactly('qqq');
          mocks.$window.location.assign.reset();
        });

        it('should go to login state if not authenticated', () => {
          service = createService();
          sinon.stub(service, 'isAuthenticated').returns(false);
          service.invalidRouteRedirect();
          expect(mocks.$state.go).calledWithExactly('login');
        });
      });

      describe('logoutSuccess()', () => {
        beforeEach(() => service = createService());

        it('should ignore calls when auth popup is visible', () => {
          service.expirePopup = <any> 'zzz';
          const spy = sinon.spy(service, 'resetAuthData');
          service.logoutSuccess();
          expect(spy).not.called;
          spy.restore();
        });

        it('should reset auth tokens and user', () => {
          let spy = sinon.spy(service, 'resetAuthData');
          service.logoutSuccess();
          expect(spy).calledOnce;
          spy.restore();
        });

        it('should broadcast logout message', () => {
          const spy = sinon.spy(mocks.$rootScope, '$broadcast');
          service.logoutSuccess();
          expect(spy).calledWithExactly('logout-success');
        });

        it('should show expiration popup', () => {
          const stub = sinon.stub(service, 'showExpireModal');

          mocks.$state.current = { name: 'lorem.ipsum' };
          service.logoutSuccess();
          expect(stub).calledOnce;
          stub.reset();

          mocks.$state.current = { name: 'login' };
          service.logoutSuccess();
          expect(stub).not.called;
        });
      });

      describe('showExpireModal()', () => {
        beforeEach(() => service = createService());

        it('should remember current url', () => {
          const stub = sinon.stub(service, 'rememberAfterLoginURL');
          service.showExpireModal();
          expect(stub).calledOnce;
        });

        it('should open popup', () => {
          service.showExpireModal();
          expect(mocks.$uibModal.open).calledOnce;
        });
      });

      describe('resetAuthData()', () => {
        beforeEach(() => service = createService());

        it('should reset auth tokens and user', () => {
          mocks.storageService.read.withArgs('accessToken').returns('aaa');
          mocks.storageService.read.withArgs('refreshToken').returns('bbb');
          mocks.currentUserService.user = {foo: 'bar'};
          service.resetAuthData();
          expect(mocks.storageService.remove).calledWith('accessToken');
          expect(mocks.storageService.remove).calledWith('refreshToken');
          expect(mocks.currentUserService.unsetCurrentUser).calledOnce;
        });
      });

    });
  });
};
