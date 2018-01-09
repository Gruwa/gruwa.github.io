import {cadNoDataSymbol} from '../../cadreon.const';

export default (ngModule) => {
  describe(ngModule.name, () => {
    beforeEach(angular.mock.module(ngModule.name));

    describe('currencyFilterFactory', () => {
      const dash = cadNoDataSymbol;
      let $locale;
      let factory = null;
      let cadNumberShortFilter = null;
      let cadNumberFilter = null;

      beforeEach(() => {
        angular.mock.inject((currencyFilterFactory, _$filter_, _$locale_) => {
          $locale = _$locale_;
          factory = currencyFilterFactory;
          cadNumberFilter = _$filter_('cadNumber');
          cadNumberShortFilter = _$filter_('cadNumberShort');
        });
      });

      it('should be defined', () => {
        expect(factory).to.exist;
      });

      it('should pass back input param if it\'s not number', () => {
        expect(factory(cadNumberFilter)(undefined)).to.equal(dash);
        expect(factory(cadNumberShortFilter)(undefined)).to.equal(dash);
      });

      it('should pass back input param if it\'s not number2', () => {
        expect(factory(cadNumberFilter)('test')).to.equal(dash);
        expect(factory(cadNumberShortFilter)('test')).to.equal(dash);
      });

      describe('EN-US locale', () => {
        beforeEach(() => {
          $locale.NUMBER_FORMATS.PATTERNS[1].negPre = '-\u00a4';
          $locale.NUMBER_FORMATS.PATTERNS[1].negSuf = '';
          $locale.NUMBER_FORMATS.PATTERNS[1].posPre = '\u00a4';
          $locale.NUMBER_FORMATS.PATTERNS[1].posSuf = '';
        });

        it('currency presentation with code', () => {
          expect(factory(cadNumberFilter)(1234, 'USD', 'CODE', 2)).to.equal('USD1,234.00');
          expect(factory(cadNumberShortFilter)(1234, 'USD', 'CODE', 2, 2)).to.equal('USD1.23K');
        });

        it('currency presentation with sign', () => {
          expect(factory(cadNumberFilter)(678.23123, 'USD', 'SIGN', 2, 2)).to.equal('$678.23');
          expect(factory(cadNumberShortFilter)(678.23123, 'USD', 'SIGN', 2, 2)).to.equal('$678.23');
        });

        it('currency presentation for negative value', () => {
          expect(factory(cadNumberFilter)(-0.1, 'USD', 'SIGN')).to.equal('-$0.10');
          expect(factory(cadNumberShortFilter)(-0.1, 'USD', 'SIGN')).to.equal('-$0.10');
        });

        it('handle unknown currency', () => {
          expect(factory(cadNumberFilter)(12346, 'nosign')).to.equal('12,346.00');
          expect(factory(cadNumberShortFilter)(12346, 'nosign')).to.equal('12K');
        });
      });

      describe('EN-DE locale', () => {
        beforeEach(() => {
          $locale.NUMBER_FORMATS.PATTERNS[1].negPre = '-';
          $locale.NUMBER_FORMATS.PATTERNS[1].negSuf = '\u00a0\u00a4';
          $locale.NUMBER_FORMATS.PATTERNS[1].posPre = '';
          $locale.NUMBER_FORMATS.PATTERNS[1].posSuf = '\u00a0\u00a4';
        });

        it('currency presentation with code', () => {
          expect(factory(cadNumberFilter)(1234, 'USD', 'CODE', 2)).to.equal('1,234.00\u00a0USD');
          expect(factory(cadNumberShortFilter)(1234, 'USD', 'CODE', 2, 2)).to.equal('1.23K\u00a0USD');
        });

        it('currency presentation with sign', () => {
          expect(factory(cadNumberFilter)(678.23123, 'USD', 'SIGN', 2, 2)).to.equal('678.23\u00a0$');
          expect(factory(cadNumberShortFilter)(678.23123, 'USD', 'SIGN', 2, 2)).to.equal('678.23\u00a0$');
        });

        it('currency presentation for negative value', () => {
          expect(factory(cadNumberFilter)(-0.1, 'USD', 'SIGN')).to.equal('-0.10\u00a0$');
          expect(factory(cadNumberShortFilter)(-0.1, 'USD', 'SIGN')).to.equal('-0.10\u00a0$');
        });

        it('handle unknown currency', () => {
          expect(factory(cadNumberFilter)(12346, 'nosign')).to.equal('12,346.00');
          expect(factory(cadNumberShortFilter)(12346, 'nosign')).to.equal('12K');
        });
      });
    });
  });
};
