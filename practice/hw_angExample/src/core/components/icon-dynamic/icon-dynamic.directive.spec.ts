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

      describe('cadIconDynamic', () => {
        it('Replace directive element with appropriate icon', () => {
          let element = $compile('<cad-icon-dynamic name="close"></cad-icon-dynamic>')($rootScope);
          $rootScope.$apply();

          let svgEl = element;

          expect(svgEl).to.have.length(1);
          expect(svgEl.attr('class')).to.be.equal('icon icon-close ');

          let useEl = element.find('use');

          expect(useEl).to.have.length(1);
          expect(useEl.attr('xlink:href')).to.be.equal('#icon-close');
        });
      });
    });
  });
};
