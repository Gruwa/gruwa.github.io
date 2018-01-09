import {cadNoDataSymbol} from '../../cadreon.const';
import {CurrencyService} from '../';

export const CODE_CURRENCY_FORMAT = 'CODE';
export const SIGN_CURRENCY_FORMAT = 'SIGN';

export abstract class CadCurrencyPipeAbstract {
  constructor(
    private $locale: ng.ILocaleService,
    private currencyService: CurrencyService
  ) {
  }

  transformCurrency(
    input: number,
    currencyCode: string,
    format = SIGN_CURRENCY_FORMAT
  ) {
    if (!_.isNumber(input) || isNaN(input)) {
      return cadNoDataSymbol;
    }

    const result: string = this.formatNumber(Math.abs(input));
    const currency = this.currencyService.getCurrencyByCode(currencyCode);

    if (!currency) {
      return result;
    }

    const currencyNotation = format === SIGN_CURRENCY_FORMAT ? currency.sign : currency.code;

    let localeFormatPattern = this.$locale.NUMBER_FORMATS.PATTERNS;

    if (input < 0) {
      return `${localeFormatPattern[1].negPre}${result}${localeFormatPattern[1].negSuf}`
        .replace('\u00a4', currencyNotation);
    } else {
      return `${localeFormatPattern[1].posPre}${result}${localeFormatPattern[1].posSuf}`
        .replace('\u00a4', currencyNotation);
    }

  }

  abstract formatNumber(input: number);
}
