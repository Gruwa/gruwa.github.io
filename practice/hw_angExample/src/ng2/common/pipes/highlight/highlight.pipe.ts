import {Pipe, PipeTransform} from '@angular/core';
import * as _ from 'lodash';

@Pipe({name: 'highlight'})
export class HighlightPipe implements PipeTransform {
  transform = highlightFilter;
}

export function highlightFilter(text: string, phrase?: string, className = 'highlighted-search-text'): string {
  text = _.escape(text);
  phrase = _.escape(phrase);

  if (phrase && text) {
    text = text.replace(
      new RegExp('(' + _.escapeRegExp(phrase) + ')', 'gi'),
      '<span class="' + className + '">$1</span>'
    );
  }

  return text;
}
