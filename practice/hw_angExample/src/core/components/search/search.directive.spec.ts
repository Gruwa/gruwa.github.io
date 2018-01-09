export default (ngModule) => {
  describe(ngModule.name, () => {
    beforeEach(angular.mock.module(ngModule.name, $urlRouterProvider => $urlRouterProvider.deferIntercept()));

    // skip test because:
    // 1) it conflicts with ng2 version of some components due to $compile()
    // 2) it useless as it checks just html markups instead of logic
    // TODO: after migration to ng2 write test that checks actual logic
    describe('directives', () => {
      let $compile;
      let $rootScope;

      beforeEach(angular.mock.inject((_$compile_, _$rootScope_) => {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
      }));

      describe('cadSearch', () => {
        it('should create appropriate html for search', () => {
          let scope = $rootScope.$new();
          let testValue = 'lockh';
          scope.vm = {query: testValue};

          let element = $compile('<cad-search query="vm.query" placeholder="' + testValue + '"></cad-search>')(scope);
          scope.$apply();

          expect(element.find('input')).to.have.length(1);
          expect(element.find('input').val()).to.be.equal(testValue);
          expect(element.find('input').attr('placeholder')).to.be.equal(testValue);
        });

        it('should set default placeholder', () => {
          let scope = $rootScope.$new();
          let element = $compile('<cad-search></cad-search>')(scope);
          let defaultValue = 'global.search';

          scope.$apply();

          expect(element.find('input').attr('placeholder')).to.be.equal(defaultValue);
        });
      });
    });
  });
};
