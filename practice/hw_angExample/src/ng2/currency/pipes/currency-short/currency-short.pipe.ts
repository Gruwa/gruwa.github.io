import {Pipe, PipeTransform, Inject} from '@angular/core';
import {CadCurrencyPipeAbstract, SIGN_CURRENCY_FORMAT} from '../currency.pipe.abstract';
import {CadNumberShortPipe} from '../../../number';
import {CurrencyService} from '../../services';

@Pipe({name: 'cadCurrencyShort'})
export class CadCurrencyShortPipe extends CadCurrencyPipeAbstract implements PipeTransform {
  private decimals4small: string;
  private decimals4big: string;

  constructor(
    @Inject('$locale') $locale: ng.ILocaleService,
    private cadNumberShortPipe: CadNumberShortPipe,
    currencyService: CurrencyService
  ) {
    super($locale, currencyService);
  }

  transform(
    input: number,
    currencyCode: string,
    format = SIGN_CURRENCY_FORMAT,
    decimals4small: string,
    decimals4big: string
  ) {
    this.decimals4small = decimals4small;
    this.decimals4big = decimals4big;
    return this.transformCurrency(input, currencyCode, format);
  }

  formatNumber(input: number): string {
    return this.cadNumberShortPipe.transform(Math.abs(input), this.decimals4small, this.decimals4big);
  }
}
