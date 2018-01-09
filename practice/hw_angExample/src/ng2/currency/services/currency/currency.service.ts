import {Injectable} from '@angular/core';
import {LoggerService} from '../../../common';
import {currencies} from '../../currencies';

export interface ICurrency {
  name: string;
  code: string;
  sign: string;
}

export interface ICurrencies {
  [key: string]: ICurrency;
}

@Injectable()
export class CurrencyService {
  constructor(private loggerService: LoggerService) {
  }

  getCurrencyByCode(code: string): ICurrency {
    if (!_.has(currencies, code)) {
      this.loggerService.error(`could not find currency with ${code} code`);
      return;
    }
    return currencies[code];
  }
}
