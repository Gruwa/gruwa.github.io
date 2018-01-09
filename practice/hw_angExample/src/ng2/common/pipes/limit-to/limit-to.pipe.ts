import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'cadLimitTo'})
export class CadLimitToPipe implements PipeTransform {
  transform = cadLimitToFilter;
}

export function cadLimitToFilter(value: string, limit?: number): string {
  if (value && limit) {
    return value.length > limit ? value.substring(0, limit) + '...' : value;
  } else {
    return value;
  }
}
