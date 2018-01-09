import {Pipe, PipeTransform} from '@angular/core';
import * as _ from 'lodash';

@Pipe({name: 'getNested'})
export class GetNestedPipe implements PipeTransform {
  transform = getNestedFilter;
}

export function getNestedFilter(item: any, path?: string): any {
  return path ? _.get(item, path) : JSON.stringify(item);
}
