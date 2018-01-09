import {Pipe, PipeTransform} from '@angular/core';
import {CurrencyService, ICurrency} from '../../services';

interface ICadCurrencyNameOptions {
  withCode?: boolean;
}

@Pipe({name: 'cadCurrencyName'})
export class CadCurrencyNamePipe implements PipeTransform {
  constructor(
    private currencyService: CurrencyService
  ) {
  }

  transform(code: string, options: ICadCurrencyNameOptions = {}): string {
    let currency: ICurrency = this.currencyService.getCurrencyByCode(code);
    if (!currency) {
      return code;
    }

    return options.withCode ? `${currency.name} (${currency.code})` : currency.name;
  }
}
