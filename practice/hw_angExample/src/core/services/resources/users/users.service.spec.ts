export default (ngModule) => {
  describe(ngModule.name, () => {
    let resource = {
      $promise: {
        finally: sinon.stub()
      }
    };
    let getResource;
    let queryResource;
    let meResource;
    let mocks = {
      User: {
        'me': sinon.spy(() => {
          return meResource;
        }),

        'get': sinon.spy(() => {
          return getResource;
        }),

        'query': sinon.spy(() => {
          return queryResource;
        }),

        'save': sinon.spy(() => {
          return resource;
        }),

        'update': sinon.spy(() => {
          return resource;
        }),

        'delete': sinon.spy(() => {
          return resource;
        }),

        'changePassword': sinon.spy(() => {
          return resource;
        }),

        'resetPassword': sinon.spy(() => resource)
      }
    };

    beforeEach(angular.mock.module(ngModule.name, ($provide) => {
      $provide.value('User', mocks.User);
    }));

    describe('services', () => {
      describe('usersService', () => {
        let usersService;
        let $rootScope;
        let $window;
        let $q;

        beforeEach(angular.mock.inject((_usersService_, _$rootScope_, _$window_, _$q_) => {
          usersService = _usersService_;
          $rootScope = _$rootScope_;
          $window = _$window_;
          $q = _$q_;
        }));

        afterEach(() => {
          mocks.User.update.reset();
          mocks.User.delete.reset();
          mocks.User.get.reset();
          mocks.User.query.reset();
          mocks.User.save.reset();
          mocks.User.me.reset();
          mocks.User.changePassword.reset();
        });

        describe('getMe()', () => {
          it('should parse customData json', () => {
            let parseCustomDataSpy = sinon.spy(usersService, 'parseCustomData');
            let getMeDeferred = $q.defer();
            let me = {};

            meResource = {
              $promise: getMeDeferred.promise
            };

            usersService.getMe();

            expect(mocks.User.me).calledOnce;
            expect(mocks.User.me).returned(meResource);

            getMeDeferred.resolve(me);
            $rootScope.$digest();

            expect(parseCustomDataSpy).calledOnce;
          });
        });

        describe('getUser()', () => {
          it('get information about user', () => {
            let parseCustomDataSpy = sinon.spy(usersService, 'parseCustomData');
            let getUserDeferred = $q.defer();
            let user = {};

            getResource = {
              $promise: getUserDeferred.promise
            };

            usersService.getUser('test');
            expect(mocks.User.get).calledOnce;
            expect(mocks.User.get).calledWith({userName: 'test'});
            expect(mocks.User.get).returned(getResource);

            getUserDeferred.resolve(user);
            $rootScope.$digest();

            expect(parseCustomDataSpy).calledOnce;
          });
        });

        describe('createUser()', () => {
          it('create user', () => {
            let data = {};

            usersService.createUser(data);
            expect(mocks.User.save).calledOnce;
            expect(mocks.User.save).calledWith(data);
            expect(mocks.User.save).returned(resource);
          });
        });

        describe('updateUser()', () => {
          it('update user', () => {
            let params = {};

            usersService.updateUser('test', params);
            expect(mocks.User.update).calledOnce;
            expect(mocks.User.update).calledWith(_.extend({userName: 'test'}, params));
            expect(mocks.User.update).returned(resource);
          });
        });

        describe('deleteUser()', () => {
          it('delete user', () => {
            usersService.deleteUser('test');
            expect(mocks.User.delete).calledOnce;
            expect(mocks.User.delete).calledWith({userName: 'test'});
            expect(mocks.User.delete).returned(resource);
          });
        });

        describe('changePassword()', () => {
          it('should change password', () => {
            let params = {
              userName: 'test',
              newPassword: 'test',
              oldPassword: 'test'
            };

            usersService.changePassword(params);
            expect(mocks.User.changePassword).calledOnce;
            expect(mocks.User.changePassword).calledWith(params);
            expect(mocks.User.changePassword).returned(resource);
          });
        });

        describe('resetPassword()', () => {
          it('reset password', () => {
            usersService.resetPassword('test-user');
            expect(mocks.User.resetPassword).calledWith({userName: 'test-user'});
            expect(mocks.User.resetPassword).returned(resource);
          });
        });

        describe('parseCustomData()', () => {
          it('should parse customData', () => {
            let customData = '{"test":"test"}';

            expect(usersService.parseCustomData(customData)).to.deep.equal({test: 'test'});
          });

          it('should return empty object if could not parse', () => {
            let customData = '{test:test[asd]';

            expect(usersService.parseCustomData(customData)).to.deep.equal({});
          });

          it('should return empty object if custom data is not object', () => {
            let customData = '"test"';

            expect(usersService.parseCustomData(customData)).to.deep.equal({});
          });

        });
      });
    });
  });
};
