export default (ngModule) => {
  describe(ngModule.name, () => {
    let resource = {
      $promise: {}
    };
    let mocks = {
      industryCategoriesResource: {
        get: sinon.spy(() => {
          return resource;
        }),
        getByAdvertiser: sinon.spy(() => {
          return resource;
        })
      }
    };

    beforeEach(angular.mock.module(ngModule.name, ($provide, $urlRouterProvider) => {
      $urlRouterProvider.deferIntercept();
      $provide.value('industryCategoriesResource', mocks.industryCategoriesResource);
    }));

    describe('services', () => {
      describe('industryCategoriesService', () => {
        let industryCategoriesService;

        beforeEach(angular.mock.inject((_industryCategoriesService_) => {
          industryCategoriesService = _industryCategoriesService_;
        }));

        afterEach(() => {
          mocks.industryCategoriesResource.get.reset();
        });

        describe('getIndustryCategories()', () => {
          it('get all industry categories', () => {
            industryCategoriesService.getIndustryCategories();
            expect(mocks.industryCategoriesResource.get).calledOnce;
            expect(mocks.industryCategoriesResource.get).returned(resource);
          });
        });

        describe('getIndustryCategoryByAdvertiser()', () => {
          it('get industry by advertiser', () => {
            industryCategoriesService.getIndustryCategoryByAdvertiser();
            expect(mocks.industryCategoriesResource.getByAdvertiser).calledOnce;
            expect(mocks.industryCategoriesResource.getByAdvertiser).returned(resource);
          });
        });
      });
    });
  });
};
