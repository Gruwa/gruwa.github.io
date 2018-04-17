import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'realDate'
})
export class RealDatePipe implements PipeTransform {

  transform(value: string, arg?: string): string {
    if (value) {
      return moment(new Date(value)).utcOffset(0, false).format(arg);
    }
    return value;
  }
}
