export default (ngModule) => {
  describe(ngModule.name, () => {
    beforeEach(angular.mock.module(ngModule.name));

    describe('filters', () => {
      let xlinkhref;

      beforeEach(angular.mock.inject(($filter) => {
        xlinkhref = $filter('xlinkhref');
      }));

      describe('xlinkhref', () => {
        it('should add appropriate xlink-href', () => {
          expect(xlinkhref('test').$$unwrapTrustedValue()).to.be.equal('#icon-test');
        });
      });
    });
  });
};
