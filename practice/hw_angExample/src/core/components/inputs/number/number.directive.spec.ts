export default (ngModule) => {
  describe(ngModule.name, () => {
    beforeEach(angular.mock.module(ngModule.name, $urlRouterProvider => $urlRouterProvider.deferIntercept()));

    describe('directives', () => {
      let $compile;
      let $rootScope;
      let element;
      let scope;
      let form;

      const html = `
        <form name="wform">,
          <input type="text"
                 name="weight"
                 cad-number="{max: 5000, min: 0, maxDigits: 6, maxDecimals: 2, format: true}"
                 ng-model="weight">
        </form>`;

      beforeEach(angular.mock.inject((_$compile_, _$rootScope_) => {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        scope = $rootScope.$new();
        scope.weight = 1234;
        element = $compile(html)(scope);
        scope.$apply();
        form = scope.wform;
      }));

      describe('cadNumber', () => {
        it('should create appropriate input', () => {
          let input = element.find('input');
          expect(input).to.have.length(1);
          expect(input.attr('max')).to.be.equal('5000');
          expect(input.attr('min')).to.be.equal('0');
          expect(input.attr('max-digits')).to.be.equal('6');
          expect(input.attr('max-decimals')).to.be.equal('2');
          expect(input.attr('name')).to.be.equal('weight');
        });

        it('should format initial value', () => {
          expect(element.find('input').val()).to.be.equal('1,234.00');
        });

        it('should set value', () => {
          form.weight.$setViewValue('1234');
          expect(scope.weight).to.be.equal(1234);
          expect(form.weight.$valid).to.be.true;
        });

        it('max validation should be failed', () => {
          form.weight.$setViewValue('6000');
          expect(scope.weight).to.be.an('undefined');
          expect(form.weight.$valid).to.be.false;
        });

        it('min validation should be failed', () => {
          form.weight.$setViewValue('-6000');
          expect(scope.weight).to.be.an('undefined');
          expect(form.weight.$valid).to.be.false;
        });

        it('maxDigit validation should be failed', () => {
          form.weight.$setViewValue('1234567');
          expect(scope.weight).to.be.an('undefined');
          expect(form.weight.$valid).to.be.false;
        });

        it('maxDecimals validation should be failed', () => {
          form.weight.$setViewValue('123.123');
          expect(scope.weight).to.be.an('undefined');
          expect(form.weight.$valid).to.be.false;
        });

        it('should format value', () => {
          scope.$apply(() => {
            scope.weight = 1234.5;
          });

          let input = element.find('input');
          input.triggerHandler('focus');
          input.triggerHandler('blur');

          expect(input.val()).to.be.equal('1,234.50');
        });

        it('should remove commas', () => {
          scope.$apply(() => {
            scope.weight = 1234.5;
          });

          let input = element.find('input');
          input.triggerHandler('focus');
          expect(input.val()).to.be.equal('1234.50');
        });
      });
    });
  });
};
