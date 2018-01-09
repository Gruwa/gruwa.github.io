export default (ngModule) => {
  describe(ngModule.name, () => {
    beforeEach(angular.mock.module(ngModule.name));

    describe('services', () => {
      describe('advertisersService', () => {
        let $httpBackend;
        let advertisersService;
        let Advertiser;
        let $rootScope;
        let mockAdvertisersResponse = {
          content: [
            {
              id: 469,
              sfAccountId: '001A0000007ZZwvIAG',
              advertiserId: 'AA-2010-3-00172',
              name: '2010 Chrysler Brand Upfront',
              parentAccountName: 'Chrysler Group',
              agencyName: 'UM-DT',
              industries: ['Industrial/Manufacturing', 'Transportation'],
              market: 'US',
              classification: 'Tier 1',
              opportunitiesCount: 0,
              isBrand: true
            },
            {
              id: 471,
              sfAccountId: '001A0022007ZZwvIAG',
              advertiserId: 'AA-2010-3-00173',
              name: 'BMW',
              parentAccountName: 'BMW Group',
              agencyName: 'UM-DT',
              industries: ['Industrial/Manufacturing', 'Transportation'],
              market: 'US',
              classification: 'Tier 1',
              opportunitiesCount: 0,
              isBrand: true
            }
          ]
        };
        let allAdvertiserUrl;

        beforeEach(angular.mock.inject((_$rootScope_, _advertisersService_, _$httpBackend_, _Advertiser_) => {
          $httpBackend = _$httpBackend_;
          advertisersService = _advertisersService_;
          Advertiser = _Advertiser_;
          $rootScope = _$rootScope_;

          allAdvertiserUrl = 'advertisers?page=0&size=10000';
        }));

        describe('getAll', () => {
          it('should return all advertisers with call', () => {
            let spy = sinon.spy(Advertiser, 'query');
            advertisersService.getAll();
            expect(spy).calledOnce;
          });
        });

        describe('findBySfId', () => {
          it('should initiate getAll call if the list of advertisers is not loaded', () => {
            $httpBackend.expect(
              'GET',
              allAdvertiserUrl
            ).respond(mockAdvertisersResponse);

            let spy = sinon.spy(Advertiser, 'query');

            let sfId = '001A0022007ZZwvIAG';
            advertisersService.findBySfId(sfId);
            $httpBackend.verifyNoOutstandingExpectation();
            expect(spy).calledOnce;
          });

          it('should return correct advertiser', () => {
            $httpBackend.expect(
              'GET',
              allAdvertiserUrl
            ).respond(mockAdvertisersResponse);

            let spy = sinon.spy(Advertiser, 'query');

            let sfId = '001A0022007ZZwvIAG';
            let res;

            advertisersService.findBySfId(sfId).then((advertiser) => {
              res = advertiser;
            });
            $httpBackend.flush();

            $httpBackend.verifyNoOutstandingExpectation();
            expect(spy).calledOnce;
            expect(res).to.exist;
            expect(res).to.have.property('sfAccountId').and.equal(sfId);
          });

          it('should return advertiser from the cache if it exists', () => {
            $httpBackend.expect(
              'GET',
              allAdvertiserUrl
            ).respond(mockAdvertisersResponse);

            let spy = sinon.spy(Advertiser, 'query');

            let sfId = '001A0022007ZZwvIAG';
            let res;

            advertisersService.getAll();
            $httpBackend.flush();
            expect(spy).calledOnce;
            $httpBackend.verifyNoOutstandingExpectation();

            spy.reset();

            advertisersService.findBySfId(sfId).then((advertiser) => {
              res = advertiser;
            });

            $rootScope.$apply();

            expect(spy).not.called;
            expect(res).to.exist;
            expect(res).to.have.property('sfAccountId').and.equal(sfId);
          });
        });

        describe('findById', () => {
          it('should initiate getAll call if the list of advertisers is not loaded', () => {
            $httpBackend.expect(
              'GET',
              allAdvertiserUrl
            ).respond(mockAdvertisersResponse);

            let spy = sinon.spy(Advertiser, 'query');

            let id = 469;

            advertisersService.findById(id);
            $httpBackend.verifyNoOutstandingExpectation();
            expect(spy).calledOnce;
          });

          it('should return correct advertiser', () => {
            $httpBackend.expect(
              'GET',
              allAdvertiserUrl
            ).respond(mockAdvertisersResponse);

            let spy = sinon.spy(Advertiser, 'query');

            let id = 469;
            let res;

            advertisersService.findById(id).then((advertiser) => {
              res = advertiser;
            });
            $httpBackend.flush();

            $httpBackend.verifyNoOutstandingExpectation();
            expect(spy).calledOnce;
            expect(res).to.exist;
            expect(res).to.have.property('id').and.equal(id);
          });

          it('should return advertiser from the cache if it exists', () => {
            $httpBackend.expect(
              'GET',
              allAdvertiserUrl
            ).respond(mockAdvertisersResponse);

            let spy = sinon.spy(Advertiser, 'query');

            let id = 469;
            let res;

            advertisersService.getAll();
            $httpBackend.flush();
            expect(spy).calledOnce;
            $httpBackend.verifyNoOutstandingExpectation();

            spy.reset();

            advertisersService.findById(id).then((advertiser) => {
              res = advertiser;
            });

            $rootScope.$apply();

            expect(spy).not.called;
            expect(res).to.exist;
            expect(res).to.have.property('id').and.equal(id);
          });
        });

        describe('findBySfIdObject', () => {
          it('should return empty object synchronously and load data asyncly', () => {
            $httpBackend.expect(
              'GET',
              allAdvertiserUrl
            ).respond(mockAdvertisersResponse);

            let spy = sinon.spy(Advertiser, 'query');

            let sfId = '001A0022007ZZwvIAG';
            let advertiser = advertisersService.findBySfIdObject(sfId);

            expect(spy).to.be.called;
            expect(advertiser).to.exist;
            expect(advertiser).to.have.property('sfAccountId').and.equal(sfId);
            expect(advertiser).to.have.property('name').and.equal('');

            $httpBackend.flush();
            $httpBackend.verifyNoOutstandingExpectation();
            expect(advertiser).to.have.property('name').and.equal('BMW');
          });
        });

        describe('search', () => {
          it('should call search request with default params', () => {
            let searchQueryMock = 'test';
            let searchUrlRegExp = new RegExp('^advertisers\\?(.+)$');
            let spy = sinon.spy(Advertiser, 'query');
            $httpBackend.expectGET(searchUrlRegExp).respond((method, url) => {
              expect(url).to.contain('name=' + searchQueryMock);
              expect(url).to.contain('page=0');
              expect(url).to.contain('size=10000');
              return [200, {}];
            });
            advertisersService.search({name: searchQueryMock});
            $httpBackend.flush();
            expect(spy).calledWith({ name: searchQueryMock, page: 0, size: 10000 });
          });
        });
      });
    });
  });
};
