import {cadNoDataSymbol} from '../cadreon.const';

export default (ngModule) => {
  describe(ngModule.name, () => {
    describe('filters', () => {
      describe('cadPercent', () => {
        let filter = null;
        const dash = cadNoDataSymbol;

        beforeEach(() => {
          angular.mock.module(ngModule.name);
          angular.mock.inject((_$filter_) => {
            filter = _$filter_('cadPercent');
          });
        });

        it('should be defined', () => {
          expect(filter).to.exist;
        });

        it('should output - in case input not number', () => {
          expect(filter(undefined)).to.equal(dash);
        });

        it('should output - in case input not number2', () => {
          expect(filter('adsf')).to.equal(dash);
        });

        it('should add percent sign and do not add decimals', () => {
          expect(filter(1000)).to.equal('1,000%');
        });

        it('should add percent sign and do add decimals', () => {
          expect(filter(1000, 2, false)).to.equal('1,000.00%');
        });

        it('should remain decimals as they are exists', () => {
          expect(filter(1000.11)).to.equal('1,000.11%');
        });

        it('should remove decimals as they are 0', () => {
          expect(filter(1000.00)).to.equal('1,000%');
        });

        it('should remove decimals as they are 0 for negative value', () => {
          expect(filter(-1000.00)).to.equal('-1,000%');
        });

        it('should remain decimals as they are > 0 for negative value', () => {
          expect(filter(-1000.01)).to.equal('-1,000.01%');
        });

        it('should add percent sign and leave 2 decimals', () => {
          expect(filter(1000.112123)).to.equal('1,000.11%');
        });

        it('should add percent sign and leave 4 decimals', () => {
          expect(filter(1000.112123, 4, false)).to.equal('1,000.1121%');
        });
      });
    });
  });
};
