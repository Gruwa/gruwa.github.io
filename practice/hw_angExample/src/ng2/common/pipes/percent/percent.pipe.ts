import {cadNoDataSymbol} from '../../../cadreon.const';
import {Pipe, PipeTransform} from '@angular/core';
import {DecimalPipe} from '@angular/common';

@Pipe({name: 'cadPercent'})
export class CadPercentPipe implements PipeTransform {
  constructor(private decimalPipe: DecimalPipe) {}

  transform(input: number, digits = '1.2-2'): string {
    if (!_.isNumber(input) || _.isNaN(input)) {
      return cadNoDataSymbol;
    }

    return this.decimalPipe.transform(input, digits) + '%';
  }
}
