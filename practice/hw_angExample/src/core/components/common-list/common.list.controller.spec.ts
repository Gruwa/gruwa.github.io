import {CommonListController} from './common.list.controller';
describe('cadreon.core.components', () => {
  beforeEach(angular.mock.module('cadreon.core.components', ($urlRouterProvider) => {
    $urlRouterProvider.deferIntercept();
  }));

  describe('CommonListController', () => {
    let ctrl;
    let scope;
    let searchDeferred;
    let requestDeferred;
    let searchQuery = 'test';
    let advertisersSample = ['foo', 'bar'];
    let platformsSample = ['foo', 'bar'];
    let mediaTypesSample = ['Video', 'Display'];

    let mocks = {
      $window: {
        scrollTo: sinon.spy()
      },
      $q: {
        defer: sinon.spy(() => {
          return requestDeferred;
        })
      },
      shared: {},
      clParams: {
        filters: {
          sort: ''
        },
        service: {
          search: sinon.spy(() => {
            return searchDeferred.promise;
          })
        },
        customFilters: [
          {urlName: 'advertisers', requestName: 'filter_platform.subCampaign.opportunity.sfAccountId_in'},
          {urlName: 'platforms', requestName: 'filter_dsp_in'},
          {urlName: 'mediaTypes', requestName: 'filter_mediaType_in'},
          {urlName: 'q', requestName: 'filter_name_contains'}
        ]
      },
      urlParamsBrokerService: {
        getParam: sinon.stub()
      }
    };

    beforeEach(angular.mock.inject(($controller, $rootScope, $q) => {
      scope = $rootScope.$new(true);
      searchDeferred = $q.defer();
      requestDeferred = $q.defer();

      mocks.urlParamsBrokerService.getParam.withArgs('q').returns(searchQuery);
      mocks.urlParamsBrokerService.getParam.withArgs('advertisers').returns(advertisersSample);
      mocks.urlParamsBrokerService.getParam.withArgs('platforms').returns(platformsSample);
      mocks.urlParamsBrokerService.getParam.withArgs('mediaTypes').returns(mediaTypesSample);

      ctrl = $controller(CommonListController, {
        $scope: scope,
        shared: mocks.shared,
        clParams: mocks.clParams,
        urlParamsBrokerService: mocks.urlParamsBrokerService
      });

      scope.vm = ctrl;
    }));

    afterEach(() => {
      mocks.clParams.service.search.reset();
      mocks.$q.defer.reset();
    });

    describe('on init', () => {
      it('creates a controller and fill it with params', () => {
        expect(ctrl.filters.filter_name_contains).to.equal(searchQuery);
        expect(ctrl.filters['filter_platform.subCampaign.opportunity.sfAccountId_in']).to.equal(advertisersSample);
        expect(ctrl.filters.filter_dsp_in).to.equal(platformsSample);
        expect(ctrl.filters.filter_mediaType_in).to.equal(mediaTypesSample);
      });
    });

    describe('fetchNextPage()', () => {
      it('should not start search if we try to fetch next to last page', () => {
        ctrl.info.last = true;
        ctrl.fetchNextPage();
        expect(mocks.clParams.service.search).not.called;
      });

      it('should fetch next page', () => {
        ctrl.fetchNextPage();
        expect(mocks.clParams.service.search).calledOnce.and.calledWith({
          'filter_dsp_in': platformsSample.join(),
          'filter_mediaType_in': mediaTypesSample.join(),
          'filter_name_contains': searchQuery,
          'filter_platform.subCampaign.opportunity.sfAccountId_in': advertisersSample.join(),
          'page': 0,
          'size': 20,
          'sort': ''
        });
      });
    });

    describe('isScrollDisabled()', () => {
      it('should return true if last page reached', () => {
        ctrl.info.last = true;
        expect(ctrl.isScrollDisabled()).to.be.true;
      });
      it('should return true if current status not "done" or "init"', () => {
        ctrl.info.status = 'loading';
        expect(ctrl.isScrollDisabled()).to.be.true;
      });
      it('should return false if current status are "done" or "init"', () => {
        ctrl.info.status = 'done';
        expect(ctrl.isScrollDisabled()).to.be.false;
      });
    });

    describe('getSearchHighlight()', () => {
      it('should get highlighted string', () => {
        expect(ctrl.getSearchHighlight()).to.equal('test');
      });
    });

    describe('watchFilters()', () => {
      it('should not start loading if it is first call', () => {
        scope.$apply();
        expect(mocks.clParams.service.search).not.called;
      });

      it('should start loading if it is not first call', () => {
        ctrl.firstLoad = false;
        scope.$emit('urlParamChanged:q', 'foobar');
        scope.$apply();
        expect(mocks.clParams.service.search).calledOnce;
      });
    });

    describe('$on() filters change', () => {
      it('sets platforms filter', () => {
        scope.$emit('urlParamChanged:platforms', ['bar', 'test']);
        expect(ctrl.filters.filter_dsp_in).to.be.eql(['bar', 'test']);
      });
      it('sets search query filter', () => {
        scope.$emit('urlParamChanged:q', 'foo');
        expect(ctrl.filters.filter_name_contains).to.be.eql('foo');
        scope.$emit('urlParamChanged:q', '');
        expect(ctrl.filters.filter_name_contains).to.be.eql('');
      });
    });

    describe('getItems()', () => {
      it('should\'n set filters if tey not available', () => {
        ctrl.filters.filter_name_contains = null;
        ctrl.filters.filter_mediaType_in = null;
        ctrl.fetchNextPage();
        expect(mocks.clParams.service.search.getCall(0).args)
          .to.not.contains.keys('filter_name_contains', 'filter_mediaType_in');
      });

      it('sets \'empty\' status if response not contains any data', () => {
        ctrl.info.page = 1;
        ctrl.filters = {};
        ctrl.filters.filter_name_contains = 'fooBar';
        ctrl.filters.filter_mediaType_in = ['42', 'test'];
        let items = {
          content: [],
          number: 0,
          totalPages: 0,
          totalElements: 0
        };
        scope.$apply();
        mocks.clParams.service.search.reset();

        ctrl.fetchNextPage();
        searchDeferred.resolve(items);
        scope.$apply();
        expect(mocks.clParams.service.search).calledOnce.and.calledWith({
          'filter_name_contains': 'fooBar',
          'filter_mediaType_in': ['42', 'test'].join(','),
          'page': 2,
          'size': 20,
          'sort': ''
        });
      });

      it('sets \'canceled\' status if request was rejected', () => {
        ctrl.fetchNextPage();
        searchDeferred.reject({err: 'data'});
        scope.$apply();
        expect(ctrl.info.status).to.be.equal('error');
        expect(ctrl.info.error).to.be.eql({err: 'data'});
      });
    });
  });
});
