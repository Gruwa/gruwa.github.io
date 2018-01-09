import {Pipe, PipeTransform} from '@angular/core';
import * as _ from 'lodash';

@Pipe({name: 'itemLabel'})
export class ItemLabelPipe implements PipeTransform {
  transform = itemLabelFilter;
}

export function itemLabelFilter(item?: any, label?: string): string {
  let labelField;
  const labelFields = ['title', 'displayName', 'name', 'id'];

  if (item) {
    if (label) {
      if (label.indexOf('<%') === -1) {
        return _.get(item, label) || JSON.stringify(item);
      }

      const compiled = _.template(label);
      return compiled({data: item});
    } else {
      if (_.isString(item)) {
        return item;
      }
      labelField = _.find(labelFields, (key) => {
        return !_.isEmpty(item[key]);
      });
      return item[labelField] || JSON.stringify(item);
    }
  } else {
    return '';
  }
}
