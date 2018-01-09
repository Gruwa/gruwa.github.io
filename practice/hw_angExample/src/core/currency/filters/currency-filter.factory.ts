import {cadNoDataSymbol} from '../../cadreon.const';
import {CurrencyService} from '../services/currency.service';

export function currencyFilterFactory($locale: ng.ILocaleService, currencyService: CurrencyService) {
  'ngInject';
  return (numberFilter: any) => {
    // const CODE_CURRENCY_FORMAT = 'CODE';
    const SIGN_CURRENCY_FORMAT = 'SIGN';

    // &mdash;
    const dash = cadNoDataSymbol;

    return (input: number,
            currencyCode: string,
            format = SIGN_CURRENCY_FORMAT,
            fractionSize = 2,
            decimals?: number): string => {
      if (!_.isNumber(input)) {
        return dash;
      }

      const result: string = numberFilter(Math.abs(input), fractionSize, decimals);
      const currency = currencyService.getCurrencyByCode(currencyCode);

      if (!currency) {
        return result;
      }

      const currencyNotation = format === SIGN_CURRENCY_FORMAT ? currency.sign : currency.code;

      if (input < 0) {
        return `${$locale.NUMBER_FORMATS.PATTERNS[1].negPre}${result}${$locale.NUMBER_FORMATS.PATTERNS[1].negSuf}`
          .replace('\u00a4', currencyNotation);
      } else {
        return `${$locale.NUMBER_FORMATS.PATTERNS[1].posPre}${result}${$locale.NUMBER_FORMATS.PATTERNS[1].posSuf}`
          .replace('\u00a4', currencyNotation);
      }

    };
  };
}
