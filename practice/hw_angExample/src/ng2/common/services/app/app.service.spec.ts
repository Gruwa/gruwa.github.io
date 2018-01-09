import {AppService} from './app.service';

describe('AppService', () => {
  let appService: AppService;
  let $translate;
  let configService;

  beforeEach(() => {
    $translate = {
      instant: sinon.stub()
    };
    configService = {
      contextPathUI: '/aaa/',
      getShellBaseURL: sinon.stub(),
      getCMBaseURL: sinon.stub(),
      getCREBaseURL: sinon.stub(),
      getATVBaseURL: sinon.stub(),
      getTTAGBaseURL: sinon.stub(),
      getReportsBaseURL: sinon.stub(),
      getSymphonyBaseURL: sinon.stub(),
      getFinanceDbBaseUrl: sinon.stub(),
      getAMPBaseURL: sinon.stub(),
      getCSFBaseUrl: sinon.stub(),
      getMktBaseUrl: sinon.stub(),
      getOptimizationBaseUrl: sinon.stub(),
      getMktAnalyticsBaseUrl: sinon.stub()
    };
    appService = new AppService($translate, configService);
  });

  describe('getApplications()', () => {
    it('should return full apps list', () => {
      expect(appService.getApplications()).is.an('array');
      expect(appService.getApplications()).to.have.lengthOf(16);
    });

    it('should return apps list available for given user', () => {
      const roles = [
        'cad_access_campaign_manager',
        'cad_access_csf'
      ];
      const expectedResult = appService.getApplications()
        .filter(app => _.includes(['cm', 'csf'], app.name));

      expect(appService.getApplications(<cad.IUser> {roles})).to.deep.equal(expectedResult);
    });
  });

  describe('getAppPath()', () => {
    it('should return empty path for non-existing app', () => {
      expect(appService.getAppPath('xxx')).to.be.empty;
    });

    it('should return app path by app name ID', () => {
      expect(appService.getAppPath('cm')).to.equal('/aaa/cm/');
    });
  });

  describe('getAppByName()', () => {
    it('should return empty result for fake app', () => {
      expect(appService.getAppByName('')).to.be.empty;
      expect(appService.getAppByName('qqq')).to.be.empty;
    });

    it('should return app path by app name ID', () => {
      expect(appService.getAppByName('cm')).to.be.not.empty;
    });
  });

  describe('findAppPathByState()', () => {
    it('should return empty path for non-existing state', () => {
      expect(appService.findAppPathByState('xxx')).to.be.empty;
    });

    it('should return app path by app state match', () => {
      expect(appService.findAppPathByState('campaigns.xxx')).to.equal('/aaa/cm/');
      expect(appService.findAppPathByState('opportunities.xxx')).to.equal('/aaa/cm/');
      expect(appService.findAppPathByState('creatives.xxx')).to.equal('/aaa/creatives/');
    });
  });
});
