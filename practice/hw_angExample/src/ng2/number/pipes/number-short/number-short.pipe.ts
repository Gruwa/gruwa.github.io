import {cadNoDataSymbol} from '../../../cadreon.const';
import {Pipe, PipeTransform} from '@angular/core';
import {DecimalPipe} from '@angular/common';

@Pipe({name: 'cadNumberShort'})
export class CadNumberShortPipe implements PipeTransform {
  private suffixes = ['K', 'M', 'B', 'T', 'P', 'E'];

  constructor(private decimalPipe: DecimalPipe) {}

  transform(value: number, decimals4small: string, decimals4big: string): any {
    let exp: number;

    if (!_.isNumber(value) || _.isNaN(value)) {
      return cadNoDataSymbol;
    }

    if (Math.abs(value) < 1000) {
      return this.decimalPipe.transform(value, decimals4small);
    }

    exp = this.getExp(value);
    value = value / Math.pow(1000, exp);

    return this.decimalPipe.transform(value, decimals4big) + this.suffixes[exp - 1];
  }

  private getExp(num) {
    let exp = 0;

    while (Math.abs(num) > 999) {
      num = Math.round(num / 1000);
      exp++;
    }

    return exp;
  }
}
