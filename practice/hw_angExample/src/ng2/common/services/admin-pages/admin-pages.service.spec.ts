import {AdminPagesService} from './admin-pages.service';

describe('AdminPagesService', () => {
  let adminPagesService: AdminPagesService;
  let configService;
  let currentUserService;

  beforeEach(() => {
    configService = {
      contextPathUI: '/aaa/'
    };
    currentUserService = {
      hasPermissions: sinon.stub().returns(true)
    };
    adminPagesService = new AdminPagesService(configService, currentUserService);
  });

  describe('getAdminPages()', () => {
    it('should return full admin pages list', () => {
      expect(adminPagesService.getAdminPages()).is.an('array');
      expect(adminPagesService.getAdminPages()).to.have.lengthOf(7);
    });
  });

  describe('getAdminPage()', () => {
    it('should return empty result for fake lis', () => {
      expect(adminPagesService.getAdminPage('')).to.be.empty;
      expect(adminPagesService.getAdminPage('qqq')).to.be.empty;
    });

    it('should return admin page by name', () => {
      expect(adminPagesService.getAdminPage('system_alerts')).to.be.not.empty;
    });
  });

});
