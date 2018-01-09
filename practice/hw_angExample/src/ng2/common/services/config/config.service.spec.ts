import {ConfigService} from './config.service';

describe('ConfigService', () => {
  let configService: ConfigService;
  let mocks = {
    $window: <any> {
      cadreon: {baseURL: 'xxx'},
      atob: sinon.stub(),
      location: {href: ''}
    }
  };

  function createService() {
    configService = new ConfigService(
      mocks.$window
    );
  }

  it('should have some defaults', () => {
    createService();
    expect(configService).to.be.not.empty;
  });

  it('should decode cadreon.js config', () => {
    mocks.$window.cadreon = 'zzz';
    createService();
    expect(mocks.$window.atob).calledOnce;
  });

  it('should merge cadreon.js config onto defaults', () => {
    mocks.$window.cadreon = {baseURL: 'xxx', otherProp: 'zzz'};
    createService();
    expect(configService.baseURL).to.equal('xxx');
    expect((<any> configService).otherProp).to.equal('zzz');
  });

  describe('isDevEnv()', () => {
    let urlStub;
    const devUrls = [
      'http://127.0.0.1:3000/shell/#/support',
      'http://localhost:3000/shell/#/support',
      'http://dev-app.cadreon.com/shell/#/support',
      'https://qa-app.cadreon.com/cm/#/campaigns/dashboard',
      'https://ci-app.cadreon.com/shell/#/administration/alerts/list'
    ];
    const otherUrls = [
      null,
      '',
      123,
      'bla-bla-bla',
      'https://stage-app.cadreon.com/shell/#/login',
      'https://unity.cadreon.com/shell/#/login'
    ];

    it('should return TRUE for all dev environments', () => {
      devUrls.forEach(val => {
        mocks.$window.location.href = val;
        createService();
        expect(configService.isDevEnv()).to.be.true;
      });
    });

    it('should return FALSE for any other environment', () => {
      otherUrls.forEach(val => {
        mocks.$window.location.href = val;
        createService();
        expect(configService.isDevEnv()).to.be.false;
      });
    });
  });
});
