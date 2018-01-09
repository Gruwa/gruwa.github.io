export default (ngModule) => {
  describe(ngModule.name, () => {
    beforeEach(angular.mock.module(ngModule.name, $urlRouterProvider => $urlRouterProvider.deferIntercept()));

    describe('directives', () => {
      let $scope;
      let directiveEl;

      beforeEach(angular.mock.inject(($compile, $rootScope) => {
        $scope = $rootScope.$new();
        $scope.startDates = null;
        $scope.dateRangeOptions = {};

        let directiveHtml = '<cad-status-button value="completed"></cad-status-button>';
        directiveEl = $compile(directiveHtml)($scope);
        $scope.$apply();
      }));

      describe('cadStatusButton', () => {
        it('Replace directive element with appropriate html', () => {
          expect(directiveEl.hasClass('status-button')).to.be.true;
        });
      });
    });
  });
};
