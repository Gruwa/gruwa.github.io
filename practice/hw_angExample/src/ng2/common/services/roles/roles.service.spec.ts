import {RolesService} from './roles.service';
import {fakeAsync, tick} from '@angular/core/testing';

describe('RolesService ->', () => {
  let rolesService: RolesService;
  let mocks = {
    $http: <any> {
      get: sinon.stub()
    },
    configService: <any> {
      getShellBaseURL: sinon.stub().returns('/shell/'),
      getUMBaseURL: sinon.stub().returns('/authmgmt/')
    },
    $cacheService: <any> {
      get: sinon.stub()
    }
  };

  let rolesStub = [
    {
      id: 77,
      name: 'Admin',
      permissions: ['p1', 'p2', 'p3']
    },
    {
      id: 88,
      name: 'Camp Manager',
      permissions: ['p1']
    }
  ];

  beforeEach(() => {
    rolesService = new RolesService(mocks.$http, mocks.$cacheService, mocks.configService);
  });

  describe('getAll() ->', () => {
    it('should return all roles', fakeAsync(() => {
      mocks.$http.get.returns(Promise.resolve({data: rolesStub}));

      rolesService.getAll();
      expect(mocks.$http.get).calledOnce;
      tick();
      expect(rolesService.roles).to.equal(rolesStub);
    }));
  });

  describe('getRoleById() ->', () => {
    it('should return all markets', () => {
      rolesService.roles = <any> rolesStub;
      expect(rolesService.getRoleById(77)).to.deep.equal(rolesStub[0]);
    });
  });

  describe('getRoleByWSOPermissions() ->', () => {
    beforeEach(() => {
      rolesService.roles = <any> rolesStub;
    });

    it('should find appropriate role by WSO roles', () => {
      expect(rolesService.getRoleByWSOPermissions(['test', 'cad_role_id_77', 'test3'])).to.equal(rolesStub[0]);
    });

    it('should return null in case there is no role id string in wso2 roles', () => {
      expect(rolesService.getRoleByWSOPermissions(['test', 'test3'])).to.be.null;
    });

    it('should return null if given roles are null', () => {
      expect(rolesService.getRoleByWSOPermissions(null)).to.be.null;
    });

    it('should return null if given roles are empty array', () => {
      expect(rolesService.getRoleByWSOPermissions([])).to.be.null;
    });
  });

  describe('isMarketPermission()', () => {
    it('should return true for market permissions', () => {
      expect(rolesService.isMarketPermission('cad_access_market_be')).to.be.true;
    });

    it('should return false for non-market permissions', () => {
      expect(rolesService.isMarketPermission('cad_access_total_tag')).to.be.false;
    });
  });

  describe('getMarketIsoCodes()', () => {
    it('should return empty array in case of null', () => {
      expect(rolesService.getMarketIsoCodes(null)).to.deep.equal([]);
    });
    it('should return empty array in case of of empty array', () => {
      expect(rolesService.getMarketIsoCodes([])).to.deep.equal([]);
    });
    it('should return correct markets', () => {
      const roles = [
        'cad_access_market_us',
        'cad_access_market_au',
        'cad_access_market_ua'
      ];
      expect(rolesService.getMarketIsoCodes(roles)).to.include.members([
        'US', 'AU', 'UA'
      ]);
    });
    it('should return only matched markets', () => {
      const roles = [
        'us',
        'au',
        'cad_access_market_ua',
        'gb'
      ];
      expect(rolesService.getMarketIsoCodes(roles)).to.deep.equal([
        'UA'
      ]);
    });
    it('should return unique markets', () => {
      const roles = [
        'us',
        'au',
        'cad_access_market_ua',
        'cad_access_market_ua',
        'cad_access_market_ua',
        'cad_access_market_ua',
        'gb'
      ];
      expect(rolesService.getMarketIsoCodes(roles)).to.deep.equal([
        'UA'
      ]);
    });
  });

  describe('hasPermissions', () => {
    context('no user permissions info, aka logged out user', () => {
      it('returns false', () => {
        expect(rolesService.hasPermissions(<any> {roles: []}, 'cad_access_reporting', 'any')).to.be.false;
      });
    });

    context('any of required permission(s)', () => {
      let user: any;

      beforeEach(() => user = {
        roles: ['cad_access_reporting', 'cad_access_user_management', 'cad_access_csf']
      });
      it('returns true if user has permission(s)', () => {
        expect(rolesService.hasPermissions(user, 'cad_access_reporting', 'any')).to.be.true;
      });
      it('returns false when user does not has permission(s)', () => {
        expect(rolesService.hasPermissions(user, 'cad_access_financedb', 'any')).to.be.false;
      });
      it('can accept multiple permissions with match', () => {
        expect(rolesService.hasPermissions(user, 'xxx,cad_access_reporting,aaa,bbb', 'any')).to.be.true;
      });
      it('can accept multiple permissions as array without match', () => {
        expect(rolesService.hasPermissions(user, ['xxx', 'yyy', 'aaa', 'bbb'], 'any')).to.be.false;
      });
    });

    context('all of required permission(s)', () => {
      let user: any;

      beforeEach(() => user = {
        roles: ['cad_access_reporting', 'cad_access_user_management', 'cad_access_csf']
      });
      it('returns true if user has permission(s)', () => {
        expect(rolesService.hasPermissions(user, 'cad_access_reporting', 'all')).to.be.true;
      });
      it('returns false when user does not has permission(s)', () => {
        expect(rolesService.hasPermissions(user, 'cad_access_financedb', 'all')).to.be.false;
      });
      it('can accept multiple permissions as array with match', () => {
        expect(rolesService.hasPermissions(
          user,
          ['xxx', 'cad_access_reporting', 'aaa', 'bbb'],
          'all'
        )).to.be.false;
      });
      it('can accept multiple permissions without match', () => {
        expect(rolesService.hasPermissions(user, 'xxx,yyy,aaa,bbb', 'all')).to.be.false;
      });
    });
  });

  describe('createPermissions()', () => {
    const roles: any[] = [
      {
        id: 1,
        permissions: ['p1', 'p2']
      },
      {
        id: 2,
        permissions: ['p2', 'p3']
      }
    ];

    const markets: any[] = [
      {
        permission: 'cad_access_market_us'
      },
      {
        permission: 'cad_access_market_br'
      }
    ];

    it('should return list of unique permissions and permissions based on role ids', () => {
      expect(rolesService.createPermissions(roles, markets)).to.have.members([
        'p1', 'p2', 'p3', 'cad_access_market_us', 'cad_access_market_br', 'cad_role_id_1', 'cad_role_id_2'
      ]);
    });
  });

  describe('getPermissionsFromMarkets()', () => {
    const markets: any[] = [
      {
        permission: 'cad_access_market_us'
      },
      {
        permission: 'cad_access_market_br'
      }
    ];

    it('should return unique list of markets permissions', () => {
      expect(rolesService.getPermissionsFromMarkets(markets)).to.have.members([
        'cad_access_market_us', 'cad_access_market_br'
      ]);
    });
  });

  describe('getPermissionsFromRoles()', () => {
    const roles: any[] = [
      {
        id: 1,
        permissions: ['p1', 'p2']
      },
      {
        id: 2,
        permissions: ['p2', 'p3']
      }
    ];

    it('should return unique list of roles permissions', () => {
      expect(rolesService.getPermissionsFromRoles(roles)).to.have.members([
        'p1', 'p2', 'p3'
      ]);
    });
  });
});
