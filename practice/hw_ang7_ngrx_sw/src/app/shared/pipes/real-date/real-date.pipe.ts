import {
  Pipe,
  PipeTransform
} from '@angular/core';
import * as moment from 'moment';

/**
 * Real Date Pipe
 * for converting data without time zone
 */

@Pipe({
  name: 'realDate'
})
export class RealDatePipe implements PipeTransform {

  transform(value: string, arg?: string): string {
    if (value) {
      return moment(new Date(value)).format(arg);
    }
    return value;
  }
}
