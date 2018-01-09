const MODULE_NAME = 'cadreon.core.components';

describe(MODULE_NAME, () => {
  beforeEach(angular.mock.module(MODULE_NAME, ($urlRouterProvider) => {
    $urlRouterProvider.deferIntercept();
  }));

  describe('services', () => {
    describe('bannerService', () => {
      let service;
      let $rootScope;

      beforeEach(() => {
        angular.mock.inject((_$rootScope_, bannerService) => {
          $rootScope = _$rootScope_;
          service = bannerService;
        });
      });

      describe('warn()', () => {
        it('sets banner message', () => {
          service.warn('some message');

          expect(service.bannerMessage).to.eql('some message');
        });
      });

      describe('getBannerMessage()', () => {
        it('returns banner message', () => {
          service.warn('some warning message');
          let message = service.getBannerMessage();

          expect(message).to.eql('some warning message');
        });
      });
    });
  });
});
