export default (ngModule) => {
  describe(ngModule.name, () => {
    beforeEach(angular.mock.module(ngModule.name, ($urlRouterProvider) => {
      $urlRouterProvider.deferIntercept();
    }));

    describe('resources', () => {
      describe('industryCategoriesResource', () => {
        let $httpBackend;
        let configService = {getCMBaseURL: () => ''};
        let industryCategoriesResource;

        beforeEach(angular.mock.module(ngModule.name, ($provide) => {
          $provide.value('configService', configService);
        }));

        beforeEach(angular.mock.inject((_industryCategoriesResource_, _$httpBackend_) => {
          $httpBackend = _$httpBackend_;
          industryCategoriesResource = _industryCategoriesResource_;
        }));

        describe('get', () => {
          it('Should get industry categories', () => {
            let res;
            let expectedRes = [
                {name: 'Arts & Entertainment', ttdCategoryId: 54},
                {name: 'Automotive', ttdCategoryId: 62}
              ];

            $httpBackend.expect(
              'GET',
              configService.getCMBaseURL() + 'industrycategories'
            ).respond(expectedRes);

            res = industryCategoriesResource.get();
            $httpBackend.flush();

            expect(res[0].ttdCategoryId).to.equal(54);
          });
        });

        describe('getByAdvertiser', () => {
          it('Should get industry by advertiser', () => {
            let res;
            let expectedRes = {name: 'Arts & Entertainment', ttdCategoryId: 54};

            $httpBackend.expect(
              'GET',
              configService.getCMBaseURL() + 'industrycategories/sf/account'
            ).respond(expectedRes);

            res = industryCategoriesResource.getByAdvertiser();
            $httpBackend.flush();

            expect(res.ttdCategoryId).to.equal(54);
          });
        });
      });
    });
  });
};
