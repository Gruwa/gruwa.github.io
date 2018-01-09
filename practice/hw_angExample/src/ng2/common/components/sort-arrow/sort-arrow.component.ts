import {Component, Input} from '@angular/core';

@Component({
  selector: 'cad-sort-arrow',
  template: require('./sort-arrow.html'),
  styles: [require('./sort-arrow.scss')]
})

export class SortArrowComponent {
  @Input() order: 'asc' | 'desc';
}
