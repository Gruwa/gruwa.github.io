describe('cadreon.core.components', () => {
  describe('directives', () => {
    describe('cadPreviousState', () => {
      let scope;
      let element;
      let $compile;
      let mocks = {
        $previousState: {
          'get': sinon.stub(),
          'go': sinon.spy()
        }
      };

      beforeEach(angular.mock.module('cadreon.core.components', ($urlRouterProvider, $provide) => {
        $urlRouterProvider.deferIntercept();
        $provide.value('$previousState', mocks.$previousState);
      }));

      beforeEach(angular.mock.inject(($rootScope, _$compile_) => {
        $compile = _$compile_;
        scope = $rootScope.$new(true);
        element = angular.element('<button cad-previous-state="\'foo.bar\'"></button>');
      }));

      afterEach(() => {
        mocks.$previousState.get.reset();
        mocks.$previousState.go.reset();
      });

      it('exists', () => {
        $compile(element)(scope);
        scope.$apply();
        expect(element).to.exist;
      });

      describe('link()', () => {
        it('shouldn\'t set click event listener', () => {
          $compile(element)(scope);
          scope.$apply();
          expect(mocks.$previousState.get).calledOnce;
          expect(mocks.$previousState.go).not.called;
        });
        it('should set click event listener', () => {
          mocks.$previousState.get.returns({state: {name: 'foo.bar'}});
          $compile(element)(scope);
          scope.$apply();
          element.click();
          expect(mocks.$previousState.go).calledOnce;
        });
      });

    });
  });
});
