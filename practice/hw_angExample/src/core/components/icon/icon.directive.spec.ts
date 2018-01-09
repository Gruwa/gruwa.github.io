export default (ngModule) => {
  describe(ngModule.name, () => {
    beforeEach(angular.mock.module(ngModule.name, ($urlRouterProvider) => {
      $urlRouterProvider.deferIntercept();
    }));

    describe('directives', () => {
      let $compile;
      let $rootScope;

      beforeEach(angular.mock.inject((_$compile_, _$rootScope_) => {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
      }));

      describe('cadIcon', () => {
        it('Replace directive element with appropriate icon', () => {
          let element = $compile('<cad-icon name="search" custom-class="custom"/>')($rootScope);
          $rootScope.$apply();

          let svgEl = element;

          expect(svgEl).to.have.length(1);
          expect(svgEl.attr('class')).to.contain('icon');
          expect(svgEl.attr('class')).to.contain('icon-search');
          expect(svgEl.attr('class')).to.contain('custom');

          let useEl = element.find('use');

          expect(useEl).to.have.length(1);
          expect(useEl.attr('xlink:href')).to.be.equal('#icon-search');
        });
      });
    });
  });
};
