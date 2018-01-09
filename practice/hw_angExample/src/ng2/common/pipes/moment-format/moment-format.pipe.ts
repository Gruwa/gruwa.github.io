import * as moment from 'moment';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'cadMomentFormat'})
export class MomentFormatPipe implements PipeTransform {
  transform(input: moment.Moment, format: string): string {
    return input ? moment(input).format(format) : '';
  }
}
