import {cadNoDataSymbol} from '../../cadreon.const';
import {TestBed, inject} from '@angular/core/testing';
import {CadNumberPipe} from '../../number/pipes/number/number.pipe';
import {CadNumberShortPipe} from '../../number/pipes/number-short/number-short.pipe';
import {CurrencyServiceMock} from '../services/currency/currency.service.mock';
import {DecimalPipe} from '@angular/common';
import {CadCurrencyPipe} from './currency/currency.pipe';
import {CadCurrencyShortPipe} from './currency-short/currency-short.pipe';

describe('UnityCurrencyModule', () => {
  let cadCurrencyPipe = null;
  let cadCurrencyShortPipe = null;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [DecimalPipe, CadNumberPipe, CadNumberShortPipe]
  }));

  let mocks = {
    $locale: <any> {
      NUMBER_FORMATS: {
        PATTERNS: [{}, {}]
      }
    },
    currencyService: CurrencyServiceMock
  };

  beforeEach(inject([CadNumberPipe, CadNumberShortPipe], (cadNumberPipe, cadNumberShortPipe) => {
    // Default params for US locale
    mocks.$locale.NUMBER_FORMATS.PATTERNS[1].negPre = '-\u00a4';
    mocks.$locale.NUMBER_FORMATS.PATTERNS[1].negSuf = '';
    mocks.$locale.NUMBER_FORMATS.PATTERNS[1].posPre = '\u00a4';
    mocks.$locale.NUMBER_FORMATS.PATTERNS[1].posSuf = '';

    cadCurrencyPipe = new CadCurrencyPipe(
      mocks.$locale,
      cadNumberPipe,
      mocks.currencyService
    );

    cadCurrencyShortPipe = new CadCurrencyShortPipe(
      mocks.$locale,
      cadNumberShortPipe,
      mocks.currencyService
    );
  }));

  describe('-> cadCurrency pipe ->', () => {
    it('should be defined', () => {
      expect(cadCurrencyPipe).to.exist;
    });

    it('should pass back input param if it\'s not number', () => {
      expect(cadCurrencyPipe.transform(undefined, 'USD', 'CODE')).to.equal(cadNoDataSymbol);
    });

    it('should pass back input param if it\'s not number2', () => {
      expect(cadCurrencyPipe.transform('test', 'USD', 'CODE')).to.equal(cadNoDataSymbol);
    });

    it('currency presentation with code', () => {
      expect(cadCurrencyPipe.transform(1234, 'USD', 'CODE', '1.2-2')).to.equal('USD1,234.00');
    });

    it('currency presentation with sign', () => {
      expect(cadCurrencyPipe.transform(678.23123, 'USD', 'SIGN', '1.2-2')).to.equal('$678.23');
    });

    it('currency presentation for negative value', () => {
      expect(cadCurrencyPipe.transform(-0.1, 'USD', 'SIGN', '1.2-2')).to.equal('-$0.10');
      expect(cadCurrencyPipe.transform(-0.1, 'USD', 'CODE', '1.2-2')).to.equal('-USD0.10');
    });

    it('handle unknown currency', () => {
      expect(cadCurrencyPipe.transform(12345, 'pum-purum-pum-pum', '', '1.2-2')).to.equal('12,345.00');
    });
  });

  describe('-> cadCurrencyShort pipe ->', () => {
    it('should be defined', () => {
      expect(cadCurrencyShortPipe).to.exist;
    });

    it('should pass back input param if it\'s not number', () => {
      expect(cadCurrencyShortPipe.transform(undefined, 'USD', 'CODE')).to.equal(cadNoDataSymbol);
    });

    it('should pass back input param if it\'s not number2', () => {
      expect(cadCurrencyShortPipe.transform('test', 'USD', 'CODE')).to.equal(cadNoDataSymbol);
    });

    it('currency presentation with code', () => {
      expect(cadCurrencyShortPipe.transform(1234, 'USD', 'CODE', '1.2-2', '1.2-2')).to.equal('USD1.23K');
    });

    it('currency presentation with sign', () => {
      expect(cadCurrencyShortPipe.transform(678.23123, 'USD', 'SIGN', '1.2-2', '1.2-2')).to.equal('$678.23');
    });

    it('currency presentation for negative value', () => {
      expect(cadCurrencyShortPipe.transform(-0.1, 'USD', 'SIGN', '1.2-2', '1.2-2')).to.equal('-$0.10');
      expect(cadCurrencyShortPipe.transform(-0.1, 'USD', 'CODE', '1.2-2', '1.2-2')).to.equal('-USD0.10');
    });

    it('handle unknown currency', () => {
      expect(cadCurrencyShortPipe.transform(12346, 'pum-purum-pum-pum', '', '1.2-2', '1.0-0')).to.equal('12K');
    });
  });

  describe('EN-DE locale', () => {
    beforeEach(() => {
      mocks.$locale.NUMBER_FORMATS.PATTERNS[1].negPre = '-';
      mocks.$locale.NUMBER_FORMATS.PATTERNS[1].negSuf = '\u00a0\u00a4';
      mocks.$locale.NUMBER_FORMATS.PATTERNS[1].posPre = '';
      mocks.$locale.NUMBER_FORMATS.PATTERNS[1].posSuf = '\u00a0\u00a4';
    });

    it('currency presentation with code', () => {
      expect(cadCurrencyPipe.transform(1234, 'USD', 'CODE', '1.2-2')).to.equal('1,234.00\u00a0USD');
      expect(cadCurrencyShortPipe.transform(1234, 'USD', 'CODE', '1.2-2', '1.2-2')).to.equal('1.23K\u00a0USD');
    });

    it('currency presentation with sign', () => {
      expect(cadCurrencyPipe.transform(678.23123, 'USD', 'SIGN', '1.2-2')).to.equal('678.23\u00a0$');
      expect(cadCurrencyShortPipe.transform(678.23123, 'USD', 'SIGN', '1.2-2', '1.2-2')).to.equal('678.23\u00a0$');
    });

    it('currency presentation for negative value', () => {
      expect(cadCurrencyPipe.transform(-0.1, 'USD', 'SIGN', '1.2-2')).to.equal('-0.10\u00a0$');
      expect(cadCurrencyShortPipe.transform(-0.1, 'USD', 'SIGN', '1.2-2', '1.2-2')).to.equal('-0.10\u00a0$');
    });

    it('handle unknown currency', () => {
      expect(cadCurrencyPipe.transform(12346, 'nosign', '', '1.2-2')).to.equal('12,346.00');
      expect(cadCurrencyShortPipe.transform(12346, 'nosign', '', '1.2-2', '1.0-0')).to.equal('12K');
    });
  });
});
