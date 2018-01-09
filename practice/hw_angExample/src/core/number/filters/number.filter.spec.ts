import {cadNoDataSymbol} from '../../cadreon.const';

export default (ngModule) => {
  describe(ngModule.name, () => {
    describe('filters', () => {
      describe('cadNumber', () => {
        let filter = null;

        const dash = cadNoDataSymbol;

        beforeEach(() => {
          angular.mock.module(ngModule.name);
          angular.mock.inject((_$filter_) => {
            filter = _$filter_('cadNumber');
          });
        });

        it('should be defined', () => {
          expect(filter).to.exist;
        });

        it('should return dash if input is not number', () => {
          expect(filter(undefined, 2)).to.equal(dash);
          expect(filter('test', 2)).to.equal(dash);
        });

        it('should not add decimal numbers if second parameter (fraction size) is not set', () => {
          let res = filter(3);
          expect(res).to.equal('3');
        });

        it('should remove decimal numbers if second parameter (fraction size) is not set', () => {
          let res = filter(3.33);
          expect(res).to.equal('3');
        });

        it('should remove decimal numbers if second parameter (fraction size) = 0', () => {
          let res = filter(3.33, 0);
          expect(res).to.equal('3');
        });

        it('should apply number filter if input is number', () => {
          let res = filter(2, 2);
          expect(res).to.equal('2.00');
        });
      });
    });
  });
};
