import {UrlInterceptorProvider} from './url.interceptor';

export default (ngModule) => {
  describe(ngModule.name, () => {
    beforeEach(angular.mock.module(ngModule.name));

    describe('interceptor', () => {
      describe('urlInterceptor', () => {
        let urlInterceptor;
        let requestConfig;
        let cachedTemplate;
        let urlInterceptorProvider: UrlInterceptorProvider;

        let mocks = {
          templateCacheMock: {
            get: () => cachedTemplate,
            put: sinon.spy()
          },
          currentUserServiceMock: {
            market: 'YY'
          },
          configService: {
            contextPath: {shell: 'xxx'},
            baseURL: ''
          }
        };

        beforeEach(() => {
          angular.mock.module(($provide, _urlInterceptorProvider_) => {
            urlInterceptorProvider = _urlInterceptorProvider_;
            urlInterceptorProvider.include.market = [];
            $provide.value('$templateCache', mocks.templateCacheMock);
            $provide.value('currentUserService', mocks.currentUserServiceMock);
            $provide.value('configService', mocks.configService);
          });
        });

        beforeEach(angular.mock.inject((_urlInterceptor_) => {
          urlInterceptor = _urlInterceptor_;
          requestConfig = { method: 'GET' };
          cachedTemplate = null;
        }));

        it('should skip processing of request config because template has been requested', () => {
          cachedTemplate = '';
          requestConfig.url = 'template.html';
          let rcCopy = angular.copy(requestConfig);

          urlInterceptor.request(requestConfig);

          expect(requestConfig).to.deep.equal(rcCopy);
        });

        it('should not modify config because no changes is required/requested', () => {
          requestConfig.url = 'http://dev-api.cadreon.com:8280/shell/v1.0/api/advertisers';
          let rcCopy = angular.copy(requestConfig);

          urlInterceptor.request(requestConfig);

          expect(requestConfig).to.deep.equal(rcCopy);
        });

        describe('prefix', () => {
          it('should append both host and prefix', () => {
            requestConfig.url = 'advertisers';
            requestConfig.prefix = 'shell';
            let rcCopy = angular.copy(requestConfig);
            let baseURL = mocks.configService.contextPath.shell;
            rcCopy.url = baseURL + requestConfig.url;

            urlInterceptor.request(requestConfig);

            expect(requestConfig).to.deep.equal(rcCopy);
          });
        });

        describe('markets', () => {
          it('should not add market by default', () => {
            requestConfig.url = 'aaa/bbb/ccc';
            const copy = angular.copy(requestConfig);
            urlInterceptor.request(requestConfig);
            expect(requestConfig).to.deep.equal(copy);
          });

          it('should not add market to forbidden url', () => {
            urlInterceptorProvider.include.market.push(/xxx/);
            requestConfig.url = 'aaa/bbb/ccc';
            const copy = angular.copy(requestConfig);
            urlInterceptor.request(requestConfig);
            expect(requestConfig).to.deep.equal(copy);
          });

          it('should add market to allowed url', () => {
            urlInterceptorProvider.include.market.push(/bbb/);
            requestConfig.url = 'aaa/bbb/ccc';
            urlInterceptor.request(requestConfig);
            expect(_.get(requestConfig, 'headers["Cad-Market"]')).to.equal('YY');
            expect(_.get(requestConfig, 'params["cad-market"]')).to.equal('YY');
          });
          it('should not add market if suppressMarket is given', () => {
            urlInterceptorProvider.include.market.push(/bbb/);
            requestConfig.url = 'aaa/bbb/ccc';
            requestConfig.suppressMarket = true;
            const copy = angular.copy(requestConfig);
            urlInterceptor.request(copy);
            expect(requestConfig).to.deep.equal(copy);
          });
        });
      });
    });
  });
};
