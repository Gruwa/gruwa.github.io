import {IMarket, MarketsService} from './markets.service';
import {fakeAsync, tick} from '@angular/core/testing';

describe('marketsService ->', () => {
  let marketsService: MarketsService;
  let mocks = {
    configService: <any> {
      getShellBaseURL: sinon.stub()
    },
    $http: <any> {
      get: sinon.stub()
    },
    rolesService: <any> {
      getMarketIsoCodes: sinon.stub()
    }
  };
  let promise;
  let markets = {
    data: {
      content: []
    }
  };
  let arMarket = <IMarket> {
    isoCode: 'AR',
    name: 'Argentina',
    permission: 'cad_access_market_ar',
    defaultTimeZone: null,
    timeZones: null
  };
  let auMarket = <IMarket> {
    isoCode: 'AU',
    name: 'Australia',
    permission: 'cad_access_market_au',
    defaultTimeZone: null,
    timeZones: null
  };

  beforeEach(() => {
    marketsService = new MarketsService(mocks.configService, mocks.rolesService, mocks.$http);
  });

  describe('getAll() -> ', () => {
    beforeEach(() => {
      mocks.configService.getShellBaseURL.returns('testUrl/');
      mocks.$http.get.returns(Promise.resolve(markets));

      promise = marketsService.getAll();
    });

    it('should return all markets', () => {
      expect(mocks.$http.get).calledWith('testUrl/markets?size=500', {cache: true});
    });

    it('should return content', fakeAsync(() => {
      tick();
      promise.then((data) => {
        expect(data).to.equal(markets.data.content);
      });
    }));
  });

  describe('getByIsoCode() -> ', () => {
    beforeEach(() => {
      mocks.configService.getShellBaseURL.returns('testUrl/');
      mocks.$http.get.returns(Promise.resolve({data: arMarket}));

      promise = marketsService.getByIsoCode('AR');
    });

    it('should fetch market', () => {
      expect(mocks.$http.get).calledWith('testUrl/markets/AR');
    });

    it('should return content', fakeAsync(() => {
      tick();
      promise.then((data) => {
        expect(data).to.eql(arMarket);
      });
    }));
  });

  describe('getMarketsByISOCodes() -> ', () => {
    let getAllStub;

    beforeEach(() => {
      getAllStub = sinon.stub(marketsService, 'getAll').returns(Promise.resolve([arMarket, auMarket]));

      promise = marketsService.getMarketsByISOCodes(['US', 'AU']);
    });

    afterEach(() => {
      getAllStub.restore();
    });

    it('should return ', fakeAsync(() => {
      tick();

      promise.then((data) => {
        expect(data).to.deep.equal([auMarket]);
      });
    }));
  });

  describe('isUserHasMarketWithIsoCodeALL() -> ', () => {
    beforeEach(() => {
      mocks.rolesService.getMarketIsoCodes.withArgs(['cad_access_market_all']).returns(['ALL']);
      mocks.rolesService.getMarketIsoCodes.withArgs([]).returns([]);
    });

    it('should return true if user has all markets', () => {
      let user = <any> {
        roles: ['cad_access_market_all']
      };
      expect(marketsService.isUserHasMarketWithIsoCodeALL(user)).to.be.true;
    });

    it('should return false if user has all markets', () => {
      let user = <any> {
        roles: []
      };
      expect(marketsService.isUserHasMarketWithIsoCodeALL(user)).to.be.false;
    });
  });
});
