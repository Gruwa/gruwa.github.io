import {cadNoDataSymbol} from '../../../cadreon.const';
import {Pipe, PipeTransform} from '@angular/core';
import {DecimalPipe} from '@angular/common';

@Pipe({name: 'cadNumber'})
export class CadNumberPipe implements PipeTransform {
  constructor(private decimalPipe: DecimalPipe) {}

  transform(value: number, digits: string): any {
    if (!_.isNumber(value) || _.isNaN(value)) {
      return cadNoDataSymbol;
    }

    return this.decimalPipe.transform(value, digits);
  }
}
