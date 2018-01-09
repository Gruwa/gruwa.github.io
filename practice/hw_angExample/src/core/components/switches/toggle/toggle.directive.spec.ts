export default (ngModule) => {
  describe(ngModule.name, () => {
    beforeEach(angular.mock.module(ngModule.name, $urlRouterProvider => $urlRouterProvider.deferIntercept()));

    describe('directives', () => {
      let $compile;
      let $rootScope;

      beforeEach(angular.mock.inject((_$compile_, _$rootScope_) => {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
      }));

      describe('cadToggle', () => {
        it('should create appropriate html with active state of toggle', () => {
          let scope = $rootScope.$new();
          let testValue = '1';
          scope.vm = {model: testValue};

          let element = $compile('<cad-toggle model="' + testValue + '"></cad-toggle>')(scope);
          scope.$apply();

          expect(element.find('small')).to.have.length(1);
          expect(element.attr('model')).to.be.equal(testValue);
          expect(element.hasClass('checked')).to.be.true;
        });

        it('should create appropriate html with inactive state of toggle', () => {
          let scope = $rootScope.$new();
          let testValue = '0';
          scope.vm = {model: testValue};

          let element = $compile('<cad-toggle model="' + testValue + '"></cad-toggle>')(scope);
          scope.$apply();

          expect(element.find('small')).to.have.length(1);
          expect(element.attr('model')).to.be.equal(testValue);
          expect(element.hasClass('checked')).to.be.false;
        });

        it('should create appropriate html with disabled class when disable is set to "true"', () => {
          let scope = $rootScope.$new();
          let testValue = '1';
          let disableValue = 'true';
          scope.vm = {
            model: testValue,
            disable: disableValue
          };

          /* tslint:disable */
          let element = $compile('<cad-toggle model="' + testValue + '" disable="' + disableValue + '"></cad-toggle>')(scope);
          /* tslint:enable */
          scope.$apply();

          expect(element.find('small')).to.have.length(1);
          expect(element.attr('disable')).to.be.equal(disableValue);
          expect(element.hasClass('disabled')).to.be.true;
        });

        it('should invoke a function if disable is not set', () => {
          let scope = $rootScope.$new();
          let testValue = '1';
          scope.myFunction = sinon.spy();

          let element = $compile('<cad-toggle model="' + testValue + '" on-click="myFunction()"></cad-toggle>')(scope);
          scope.$apply();

          expect(element.hasClass('disabled')).to.be.false;

          element.triggerHandler('click');
          scope.$apply();

          scope.myFunction.should.have.been.calledOnce;
        });

        it('should invoke a function if disable is set to "false"', () => {
          let scope = $rootScope.$new();
          let testValue = '0';
          let disableValue = 'false';
          scope.myFunction = sinon.spy();

          /* tslint:disable */
          let element = $compile('<cad-toggle model="' + testValue + '" disable="' + disableValue + '" on-click="myFunction()"></cad-toggle>')(scope);
          /* tslint:enable */
          scope.$apply();

          expect(element.hasClass('disabled')).to.be.false;

          element.triggerHandler('click');
          scope.$apply();

          scope.myFunction.should.have.been.calledOnce;
        });

        it('should not invoke a function if disable is set to "true"', () => {
          let scope = $rootScope.$new();
          let testValue = '0';
          let disableValue = 'true';
          scope.myFunction = sinon.spy();

          /* tslint:disable */
          let element = $compile('<cad-toggle model="' + testValue + '" disable="' + disableValue + '" on-click="myFunction()"></cad-toggle>')(scope);
          /* tslint:enable */
          scope.$apply();

          expect(element.hasClass('disabled')).to.be.true;

          element.triggerHandler('click');
          scope.$apply();

          scope.myFunction.should.not.have.been.called;
        });
      });
    });
  });
};
