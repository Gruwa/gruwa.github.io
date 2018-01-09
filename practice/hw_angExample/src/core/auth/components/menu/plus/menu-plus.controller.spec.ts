import {MenuPlusController} from './menu-plus.controller';

export default (ngModule) => {
  describe(ngModule.name, () => {
    let controllerName = 'menuPlusController';

    describe('controllers', () => {
      beforeEach(angular.mock.module(ngModule.name, ($urlRouterProvider) => {
        $urlRouterProvider.deferIntercept();
      }));

      let createBtnConfig: any = {
        dropdown: [
          {
            title: 'navbar.add_menu.digital_campaign',
            state: 'campaigns.add'
          },
          {
            title: 'navbar.add_menu.tv_Campaign',
            state: 'advancedtv.campaign.type'
          }
        ]
      };

      let ctrlConstructor = MenuPlusController;
      let controller;
      let $rootScope;
      let $scope;

      let mocks = {
        $state: {
          current: {
            data: {
              createBtn: createBtnConfig
            }
          },
          go: sinon.spy()
        },
        currentUserService: {
          hasPermissions: sinon.stub()
        }
      };

      describe(controllerName, () => {
        beforeEach(angular.mock.inject(($q, _$rootScope_, $controller) => {
          $rootScope = _$rootScope_;
          $scope = $rootScope.$new();

          controller = $controller(ctrlConstructor, {
            $scope: $scope,
            $state: mocks.$state,
            currentUserService: mocks.currentUserService
          });
        }));

        afterEach(() => {
          mocks.$state.go.reset();
        });

        describe('updateCreateBtn()', () => {
          it('should set up params for menu from state', () => {
            expect(controller.createBtn).to.deep.equal(createBtnConfig.dropdown);
          });

          it('should check permissions for each item menu and remain as it has access', () => {
            controller.isVisible = true;
            let createBtn = {
              dropdown: [
                {
                  title: 'navbar.add_menu.digital_campaign',
                  state: 'campaigns.add',
                  roles: ['role1']
                },
                {
                  title: 'navbar.add_menu.tv_Campaign',
                  state: 'advancedtv.campaign.type',
                  roles: ['role2']
                }
              ]
            };

            mocks.$state.current.data.createBtn = createBtn;
            mocks.currentUserService.hasPermissions.returns(true);

            $scope.$broadcast('$stateChangeSuccess');
            $scope.$apply();

            expect(controller.createBtn).to.deep.equal(createBtn.dropdown);
          });

          it('should remove menu item if no access', () => {
            let createBtn = {
              dropdown: [
                {
                  title: 'navbar.add_menu.digital_campaign',
                  state: 'campaigns.add',
                  roles: ['role1']
                },
                {
                  title: 'navbar.add_menu.tv_Campaign',
                  state: 'advancedtv.campaign.type',
                  roles: ['role2']
                }
              ]
            };

            mocks.$state.current.data.createBtn = createBtn;
            mocks.currentUserService.hasPermissions.returns(false);

            $scope.$broadcast('$stateChangeSuccess');
            $scope.$apply();

            expect(controller.createBtn).to.deep.equal([]);
          });

          it('should show button if no roles', () => {
            let createBtn = {
              state: 'home.administration.users.create'
            };
            mocks.$state.current.data.createBtn = createBtn;

            $scope.$broadcast('$stateChangeSuccess');
            $scope.$apply();

            expect(controller.createBtn).to.have.length(1);
          });
        });

        describe('changeState()', () => {
          it('should change state (no options)', () => {
            let state = 'advancedtv.campaign.wizard.info';
            let stateObj = {
              state: state
            };

            controller.changeState(stateObj);

            expect(mocks.$state.go).calledOnce.and.calledWith(state);
          });

          it('should change state (with options)', () => {
            let state = 'advancedtv.campaign.wizard.info';
            let options = { reload: true };

            let stateObj = {
              state: state,
              stateOptions: { reload: true }
            };

            controller.changeState(stateObj);

            expect(mocks.$state.go).calledOnce.and.calledWith(state, undefined, options);
          });

          it('should not change state if menu is set to disabled', () => {
            controller.disable = true;

            controller.changeState();

            expect(mocks.$state.go).not.called;
          });
        });
      });
    });
  });
};
