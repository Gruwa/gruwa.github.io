import {AgenciesService} from './agencies.service';
import {fakeAsync, tick} from '@angular/core/testing';
import {IMarket} from '../markets/markets.service';

describe('agenciesService -> ', () => {
  let agenciesService: AgenciesService;

  let mocks = <any> {
    $http: {
      get: sinon.stub()
    }
  };

  let ALLMarket = <IMarket> {
    name: 'all',
    isoCode: 'ALL',
    permission: 'cad_access_market_all',
    defaultTimeZone: null,
    timeZones: null
  };

  let USMarket = <IMarket> {
    name: 'us',
    isoCode: 'US',
    permission: 'cad_access_market_us',
    defaultTimeZone: null,
    timeZones: null
  };

  let ARMarket = <IMarket> {
    name: 'ar',
    isoCode: 'AR',
    permission: 'cad_access_market_ar',
    defaultTimeZone: null,
    timeZones: null
  };

  let BZMarket = <IMarket> {
    name: 'bz',
    isoCode: 'BZ',
    permission: 'cad_access_market_bz',
    defaultTimeZone: null,
    timeZones: null
  };

  beforeEach(() => {
    agenciesService = new AgenciesService(mocks.$http);
  });

  it('should exists', () => {
    expect(agenciesService).to.be.not.empty;
  });

  describe('getAll() -> ', () => {
    it('should call getAgencies() with default config', () => {
      let stub = sinon.stub(agenciesService, 'getAgencies');
      agenciesService.getAll();

      expect(stub).calledOnce.calledWith({
        cache: true,
        prefix: 'shell',
        params: {
          page: 0,
          size: 10000
        }
      });
      stub.restore();
    });
  });

  describe('getByMarkets() -> ', () => {
    it('should call without filtering for all markers', () => {
      let stub = sinon.stub(agenciesService, 'getAgencies');

      agenciesService.getByMarkets([ALLMarket]);

      expect(stub).calledOnce.calledWith({
        cache: true,
        prefix: 'shell',
        params: {
          page: 0,
          size: 10000
        }
      });
      stub.restore();
    });

    it('should call with only market', () => {
      let stub = sinon.stub(agenciesService, 'getAgencies');

      agenciesService.getByMarkets([USMarket]);

      expect(stub).calledOnce.calledWith({
        cache: true,
        prefix: 'shell',
        params: {
          page: 0,
          size: 10000,
          filter_market_in: 'us'
        }
      });
      stub.restore();
    });

    it('should call with multiple markets', () => {
      let stub = sinon.stub(agenciesService, 'getAgencies');

      agenciesService.getByMarkets([USMarket, ARMarket, BZMarket]);

      expect(stub).calledOnce.calledWith({
        cache: true,
        prefix: 'shell',
        params: {
          page: 0,
          size: 10000,
          filter_market_in: 'us,ar,bz'
        }
      });
      stub.restore();
    });
  });

  describe('getAgencies()', () => {
    let config;

    beforeEach(() => {
      mocks.$http.get.returns(Promise.resolve({data: {content: 'dataset'}}));
      config = {
        cache: true,
        prefix: 'shell',
        params: {
          page: 0,
          size: 10000
        }
      };
    });

    it('should make request to get Agencies', () => {
      agenciesService.getAgencies(config);

      expect(mocks.$http.get).calledOnce.and.not.calledWith('agencies', config);
    });

    it('should parse response', fakeAsync(() => {
      tick();
      agenciesService.getAgencies(config).then((response) => {
        expect(response).to.equal('dataset');
      });
    }));

  });

});
