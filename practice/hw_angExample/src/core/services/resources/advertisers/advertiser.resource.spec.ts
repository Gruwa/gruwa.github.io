export default (ngModule) => {
  describe(ngModule.name, () => {
    beforeEach(angular.mock.module(ngModule.name));

    describe('resources', () => {
      describe('Advertiser', () => {
        let $httpBackend;
        let Advertiser;

        beforeEach(angular.mock.inject((_Advertiser_, _$httpBackend_) => {
          $httpBackend = _$httpBackend_;
          Advertiser = _Advertiser_;
        }));

        describe('query', () => {
          it('should get list of advertisers', () => {
            let res;
            let expectedRes = {
              content: [{
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
              }]
            };

            $httpBackend.expect('GET', 'advertisers?page=0&size=1000')
                        .respond(expectedRes);

            res = Advertiser.query({
              page: 0,
              size: 1000
            });
            $httpBackend.flush();

            expect(res).to.have.deep.property('content.[0].id', 469);
          });
        });

        describe('get', () => {
          it('Should get advertiser detail by id', () => {
            let res;
            let expectedRes = {
              id: 459,
              sfAccountId: '001A0000007XBzvIAG',
              advertiserId: 'AA-2010-2-00517',
              name: 'Chrysler Group',
              agencyName: 'UM-DT',
              industries: [
                'Automotive'
              ],
              market: 'US',
              classification: 'Tier 1',
              opportunitiesCount: 71,
              brands: [
                '2010 Chrysler Brand Upfront',
                'Chrysler',
                'Dodge',
                'Fiat',
                'Jeep',
                'Ram'
              ],
              isBrand: false
            };

            $httpBackend.expect('GET', 'advertisers/459').respond(expectedRes);

            res = Advertiser.get({id: 459});
            $httpBackend.flush();

            expect(res).to.have.deep.property('advertiserId', 'AA-2010-2-00517');
          });
        });
      });
    });
  });
};
