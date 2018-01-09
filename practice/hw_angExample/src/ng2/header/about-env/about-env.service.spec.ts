import {AboutEnvService} from './about-env.service';

describe('AboutEnvService',  () => {
  let service: AboutEnvService;
  let mocks: any;

  beforeEach(() => {
    mocks = {
      $http: {
        get: sinon.stub()
      },
      $window: {
        location: {
          origin: ''
        }
      },
      appService: {
        getAppPath: sinon.stub()
      },
      configService: {
        getShellBaseURL: sinon.stub(),
        getCMBaseURL: sinon.stub(),
        getCREBaseURL: sinon.stub(),
        getMktBaseUrl: sinon.stub(),
        getTTAGBaseURL: sinon.stub(),
        getATVBaseURL: sinon.stub(),
        getAMPBaseURL: sinon.stub(),
        getReportsBaseURL: sinon.stub(),
        getFinanceDbBaseUrl: sinon.stub(),
        getCSFBaseUrl: sinon.stub(),
        getUserInfoURL: sinon.stub(),
        getNotifiCenterBaseUrl: sinon.stub()
      }
    };

    service = new AboutEnvService(
      mocks.$http,
      mocks.$window,
      mocks.appService,
      mocks.configService
    );
  });

  describe('getEnvInfo()', () => {
    it('should return current url', () => {
      mocks.$window.location.origin = 'zzz';
      expect(service.getEnvInfo()).to.be.equal('zzz');
    });
  });

  describe('getAppInfo()', () => {
    it('should call for api and ui routines', () => {
      const apiSpy = sinon.stub(service, 'getApiInfo');
      const uiSpy = sinon.stub(service, 'getUiInfo');
      service.getAppInfo();
      expect(apiSpy).called;
      expect(uiSpy).called;
    });
  });

  describe('getApiInfo()', () => {
    // TODO: add more tests
  });

  describe('getUiInfo()', () => {
    // TODO: add more tests
  });
});
