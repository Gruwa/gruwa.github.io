import {Pipe, PipeTransform} from '@angular/core';
import * as _ from 'lodash';
const userNameRegExp = /[a-zA-Z]+\.[a-zA-z]+/;

@Pipe({name: 'cadUsername'})
export class CadUsernamePipe implements PipeTransform {
  transform = cadUsernameFilter;
}

export function cadUsernameFilter(value: string): string {
  if (userNameRegExp.test(value)) {
    return _.startCase(value.split('.').join(' '));
  } else {
    return value;
  }
}
