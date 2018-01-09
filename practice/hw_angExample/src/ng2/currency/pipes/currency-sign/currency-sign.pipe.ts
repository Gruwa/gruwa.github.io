import {Pipe, PipeTransform} from '@angular/core';
import {CurrencyService, ICurrency} from '../../services';

@Pipe({name: 'cadCurrencySign'})
export class CadCurrencySignPipe implements PipeTransform {
  constructor(
    private currencyService: CurrencyService
  ) { }

  transform(input: string): string {
    let currency: ICurrency = this.currencyService.getCurrencyByCode(input);
    return _.get(currency, 'sign', '');
  }
}
