/*
  ** This pipe initially taken from https://github.com/fknop/angular-pipes
*/

import { Pipe, PipeTransform  } from '@angular/core';
import * as _ from 'lodash';

export type ByteUnit = 'B' | 'KB' | 'MB' | 'GB' | 'TB';

@Pipe({
  name: 'bytes'
})
export class BytesPipe implements PipeTransform {
  static formats: { [key: string]: { max: number, prev?: ByteUnit }} = {
    B: { max: 1024 },
    KB: { max: Math.pow(1024, 2), prev: 'B' },
    MB: { max: Math.pow(1024, 3), prev: 'KB' },
    GB: { max: Math.pow(1024, 4), prev: 'MB' },
    TB: { max: Number.MAX_VALUE, prev: 'GB' }
  };

  toDecimal(value: number, decimal: number): number {
    return Math.round(value * Math.pow(10, decimal)) / Math.pow(10, decimal);
  }

  transform(input: number, decimal = 0, fromUnit: ByteUnit = 'B'): string | number {
    if (!(_.isFinite(input) &&
      _.isFinite(decimal) &&
      _.isInteger(decimal) &&
      decimal >= 0)) {
      return input;
    }

    let bytes = input;
    let unit = fromUnit;
    while (unit !== 'B') {
      bytes *= 1024;
      unit = BytesPipe.formats[unit].prev;
    }

    for (const key in BytesPipe.formats) {
      if (BytesPipe.formats.hasOwnProperty(key)) {
        const format = BytesPipe.formats[key];
        if (bytes < format.max) {
          const prev = BytesPipe.formats[format.prev];

          const result = prev ?
            this.toDecimal(bytes / prev.max, decimal) :
            this.toDecimal(bytes, decimal);

          return `${result} ${key}`;
        }
      }
    }
  }
}
