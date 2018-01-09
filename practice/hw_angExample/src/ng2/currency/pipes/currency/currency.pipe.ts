import {Pipe, PipeTransform, Inject} from '@angular/core';
import {CadNumberPipe} from '../../../number';
import {CadCurrencyPipeAbstract, SIGN_CURRENCY_FORMAT} from '../currency.pipe.abstract';
import {CurrencyService} from '../../services';

@Pipe({name: 'cadCurrency'})
export class CadCurrencyPipe extends CadCurrencyPipeAbstract implements PipeTransform {
  private decimals: string;

  constructor(
    @Inject('$locale') $locale: ng.ILocaleService,
    private cadNumberPipe: CadNumberPipe,
    currencyService: CurrencyService
  ) {
    super($locale, currencyService);
  }

  transform(
    input: number,
    currencyCode: string,
    format = SIGN_CURRENCY_FORMAT,
    decimals = '1.2-2'
  ) {
    this.decimals = decimals;
    return this.transformCurrency(input, currencyCode, format);
  }

  formatNumber(input: number): string {
    return this.cadNumberPipe.transform(Math.abs(input), this.decimals);
  }
}
