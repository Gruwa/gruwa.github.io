export default ngModule => {
  describe(ngModule.name, () => {
    // TODO: rewrite when move to "href" navigation
    xdescribe('authorisation and routing', () => {
      let $rootScope: cad.IRootScopeService;
      let $state: ng.ui.IStateService;
      let userGetMeDefer: ng.IDeferred<any>;
      let mocks;

      beforeEach(() => {
        mocks = {
          authService: {
            isAuthenticated: sinon.stub(),
            signInRedirect: sinon.spy(),
            rememberAfterLoginURL: sinon.spy(),
            resetAuthData: sinon.spy()
          },
          usersService: { getMe: sinon.stub() },
          currentUserService: {
            user: {
              login: 'bestic',
              roles: []
            }
          }
        };

        angular.mock.module(
          ngModule.name, 'cadreon.login',
          ($provide) => Object.keys(mocks).forEach(name => $provide.value(name, mocks[name]))
        );

        angular.mock.inject((_$rootScope_, _$state_, $q) => {
          $rootScope = _$rootScope_;
          $state = _$state_;
          userGetMeDefer = $q.defer();
          mocks.usersService.getMe.returns(userGetMeDefer.promise);
        });
      });

      describe('not authenticated', () => {
        beforeEach(() => mocks.authService.isAuthenticated.returns(false));

        it('should go to login page if authentication is needed', () => {
          $state.go('home');
          $rootScope.$digest();
          expect($state.current.name).to.be.equal('login');
        });

        it('should save information about requested state', () => {
          $state.go('home');
          $rootScope.$digest();
          expect(mocks.authService.saveState2goAfterLogin).calledOnce;
        });

        it('should pass to page that needs no authentication', () => {
          $state.go('forgot-password');
          $rootScope.$digest();
          expect($state.current.name).to.be.equal('forgot-password');
        });
      });

      describe('authenticated', () => {
        beforeEach(() => mocks.authService.isAuthenticated.returns(true));

        describe('get information about user', () => {
          beforeEach(() => {
            $state.go('home');
            $rootScope.$digest(); // makes navigation to 'home' state happen
          });

          it('should go to requested state on success', () => {
            let stateGoSpy = sinon.stub($state, 'go');
            expect(mocks.usersService.getMe).calledOnce;
            userGetMeDefer.resolve();
            $rootScope.$digest(); // gets into then()
            expect(stateGoSpy).calledOnce;
          });

          it('should go to login state on failure', () => {
            expect(mocks.usersService.getMe).calledOnce;
            userGetMeDefer.reject();
            $rootScope.$digest();
            expect($state.current.name).to.be.equal('login');
          });
        });

        describe('user information already exists', () => {
          it('should not allow navigation to login state', () => {
            mocks.authService.isStateAllowed.returns(true);
            $state.go('login');
            $rootScope.$digest();
            expect($state.current.name).not.to.be.equal('login');
          });

          it('should go to forbidden state if state is not allowed', () => {
            mocks.authService.isStateAllowed.returns(false);
            let stateGoSpy = sinon.stub($state, 'go');
            $state.transitionTo('home.administration.users.list');
            expect(stateGoSpy).calledOnce.calledWith('forbidden');
          });
        });
      });
    });
  });
};
