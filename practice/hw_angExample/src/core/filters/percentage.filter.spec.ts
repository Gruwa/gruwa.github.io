export default (ngModule) => {
  let filterName = 'cadPercentage';

  describe(ngModule.name, () => {
    beforeEach(angular.mock.module(ngModule.name));

    describe('filters', () => {
      describe(filterName, () => {
        let cadPercentage = null;

        beforeEach(angular.mock.inject((_$filter_) => {
          cadPercentage = _$filter_('cadPercentage');
        }));

        it('should be defined', () => {
          expect(cadPercentage).to.exist;
        });

        it('should show 0 as 0%', () => {
          expect(cadPercentage(0)).to.be.equal('0%');
        });

        it('should show 0 as 0.00% if 2 decimal places is specified', () => {
          expect(cadPercentage(0, 2)).to.be.equal('0.00%');
        });

        it('should show 0.034 as 3%', () => {
          expect(cadPercentage(0.034)).to.be.equal('3%');
        });

        it('should show 0.467156 as 46.72% if 2 decimal places is specified', () => {
          expect(cadPercentage(0.467156, 2)).to.be.equal('46.72%');
        });
      });
    });
  });
};
