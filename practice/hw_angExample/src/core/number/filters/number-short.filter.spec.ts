import {cadNoDataSymbol} from '../../cadreon.const';

export default (ngModule) => {
  let filterName = 'cadNumberShort';
  describe(ngModule.name, () => {
    beforeEach(angular.mock.module(ngModule.name));

    describe('filters', () => {
      describe(filterName, () => {
        let filter = null;
        const dash = cadNoDataSymbol;

        beforeEach(angular.mock.inject((_$filter_) => {
          filter = _$filter_(filterName);
        }));

        it('should be defined', () => {
          expect(filter).to.exist;
        });

        describe('integer numbers', () => {
          describe('not a number', () => {
            it('should return dash symbol', () => {
              expect(filter('bestic')).to.equal(dash);
            });
          });

          describe('less than a thousand', () => {
            it('should not be suffixed', () => {
              expect(filter(10)).to.be.equal('10');
              expect(filter(100)).to.be.equal('100');
              expect(filter(33)).to.be.equal('33');
              expect(filter(999)).to.be.equal('999');
              expect(filter(1000)).to.be.not.equal('1000');
            });
          });
          describe('more than a thousand', () => {
            it('numbers less than a million should be suffixed with K', () => {
              expect(filter(1000)).to.be.equal('1K');
              expect(filter(10000)).to.be.equal('10K');
              expect(filter(100000)).to.be.equal('100K');
              expect(filter(1000000)).to.be.not.equal('1000K');
              expect(filter(10000000)).to.be.not.equal('10000K');
            });

            it('numbers less than a billion should be suffixed with M', () => {
              expect(filter(999949)).to.be.equal('1M');
              expect(filter(1000000)).to.be.equal('1M');
              expect(filter(10000000)).to.be.equal('10M');
              expect(filter(100000000)).to.be.equal('100M');
              expect(filter(1000000000)).to.be.not.equal('1000M');
            });

            it('numbers less than a trillion should be suffixed with B', () => {
              expect(filter(999999949)).to.be.equal('1B');
              expect(filter(1000000000)).to.be.equal('1B');
              expect(filter(10000000000)).to.be.equal('10B');
              expect(filter(100000000000)).to.be.equal('100B');
              expect(filter(1000000000000)).to.be.not.equal('1000B');
            });

            describe('not round numbers', () => {
              it('should round numbers by default', () => {
                expect(filter(1400)).to.be.equal('1K');
                expect(filter(1500)).to.be.equal('2K');
              });
              it('should take into account decimal params', () => {
                expect(filter(1400, 1, 1)).to.be.equal('1.4K');
                expect(filter(1500, 1, 1)).to.be.equal('1.5K');
                expect(filter(1400, 2, 2)).to.be.equal('1.40K');
                expect(filter(1500, 2, 2)).to.be.equal('1.50K');
                expect(filter(371022, 2, 1)).to.be.equal('371K');
              });
              it('should hide zero decimals', () => {
                expect(filter(1040, 1, 1)).to.be.equal('1K');
                expect(filter(1540, 1, 1)).to.be.equal('1.5K');
                expect(filter(1040, 2, 2)).to.be.equal('1.04K');
                expect(filter(1004, 2, 2)).to.be.equal('1K');
              });
            });
          });
        });

        describe('decimal numbers', () => {
          describe('less than a thousand', () => {
            it('should not be suffixed', () => {
              expect(filter(10.05)).to.be.equal('10.05');
              expect(filter(100.12)).to.be.equal('100.12');
              expect(filter(33.33)).to.be.equal('33.33');
              expect(filter(999.99)).to.be.equal('999.99');
              expect(filter(1000.32)).to.be.not.equal('1000.32');
            });
            it('should take into account fractionSize params', () => {
              expect(filter(10.05, 1)).to.be.equal('10.1');
              expect(filter(10.05, 2)).to.be.equal('10.05');
            });
          });
        });
      });
    });
  });
};
