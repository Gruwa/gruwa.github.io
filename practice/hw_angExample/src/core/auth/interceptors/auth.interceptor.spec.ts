import {authInterceptorFactory} from './auth.interceptor';

export default (ngModule) => {
  describe(ngModule.name, () => {
    describe('authInterceptor', () => {
      let interceptor;
      let mocks;

      beforeEach(() => {
        mocks = {
          $injector: {
            get: sinon.stub()
          },
          authService: {
            accessToken: null,
            refreshToken: null,
            requestingRefreshToken: null,
            refresh: sinon.stub(),
            logoutSuccess: sinon.stub()
          },
          $http: sinon.stub()
        };
        mocks.$injector.get.withArgs('authService').returns(mocks.authService);
        mocks.$injector.get.withArgs('$http').returns(mocks.$http);

        angular.mock.inject(($q, $rootScope) => {
          mocks.$q = $q;
          mocks.$injector.get.withArgs('$q').returns($q);
          mocks.$rootScope = $rootScope;
        });

        interceptor = authInterceptorFactory(mocks.$injector);
      });

      describe('"request" interceptor', () => {
        it('should add authorization token to headers', () => {
          mocks.authService.accessToken = 'aaa';
          const result = interceptor.request({});
          expect(result.headers.Authorization).to.equal('Bearer aaa');
        });

        it('should not change config when special flag present', () => {
          const config = { suppressAuthorization: true };
          expect(interceptor.request(config)).to.equal(config);
        });

        it('should not change config if authorization token is already in headers', () => {
          const config = { headers: { Authorization: 'bbb' } };
          expect(interceptor.request(config)).to.equal(config);
        });
      });

      describe('"responseError" interceptor', () => {
        it('should not change rejections on non 401 errors', () => {
          let result;
          const rejection = { status: 500 };

          interceptor.responseError(rejection).catch((err) => result = err);
          mocks.$rootScope.$digest();

          expect(result).to.equal(rejection);
        });

        it('should handle 401 errors - no refresh token case', () => {
          mocks.authService.refreshToken = null;
          interceptor.responseError({ status: 401 });
          expect(mocks.authService.logoutSuccess).calledOnce;
        });

        it('should handle 401 errors - refresh() ok case', () => {
          let result;
          const refreshDefer = mocks.$q.defer();
          const rejection = {
            status: 401,
            config: {
              url: '/some-url',
              prefix: 'aaa',
              headers: { Authorization: 'bbb' }
            }
          };
          mocks.authService.refreshToken = 'xxx';
          mocks.authService.refresh.returns(refreshDefer.promise);

          result = interceptor.responseError(rejection);
          refreshDefer.resolve();
          mocks.$rootScope.$digest();

          // request should be repeated without our custom added keys in config
          expect(mocks.$http).calledWithExactly({ url: '/some-url', headers: {} });
        });

        it('should handle 401 errors - refresh() failed case', () => {
          let result;
          const refreshDefer = mocks.$q.defer();
          const rejection = {
            status: 401,
            config: {
              prefix: 'aaa',
              headers: { Authorization: 'bbb' }
            }
          };
          mocks.authService.refreshToken = 'xxx';
          mocks.authService.refresh.returns(refreshDefer.promise);

          result = interceptor.responseError(rejection);
          refreshDefer.reject();
          mocks.$rootScope.$digest();

          expect(mocks.$http).not.called;
          expect(mocks.authService.logoutSuccess).calledOnce;
        });
      });

    });
  });
};
