import {TestBed, inject} from '@angular/core/testing';
import {CurrencyServiceMock} from '../../services/currency/currency.service.mock';
import {CadCurrencyNamePipe} from './currency-name.pipe';

describe('UnityCurrencyModule', () => {
  let cadCurrencyNamePipe = null;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [CadCurrencyNamePipe]
  }));

  let mocks = {
    currencyService: CurrencyServiceMock
  };

  beforeEach(() => {
    cadCurrencyNamePipe = new CadCurrencyNamePipe(
      mocks.currencyService
    );
  });

  describe('-> cadCurrencyName pipe ->', () => {
    it('should be defined', () => {
      expect(cadCurrencyNamePipe).to.exist;
    });

    it('should pass back input param for unknown Currency Code', () => {
      expect(cadCurrencyNamePipe.transform('XXX')).to.equal('XXX');
    });

    it('should return Currency Name by default', () => {
      expect(cadCurrencyNamePipe.transform('USD')).to.equal('United States Dollar');
      expect(cadCurrencyNamePipe.transform('USD', {withCode: false})).to.equal('United States Dollar');
    });

    it('should return both name and code when withCode options is true', () => {
      expect(cadCurrencyNamePipe.transform('USD', {withCode: true})).to.equal('United States Dollar (USD)');
    });
  });

});
