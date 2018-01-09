import {Component, ChangeDetectionStrategy, Input} from '@angular/core';

@Component({
  selector: 'cad-smart-search-list-item',
  template: require('./list-item.html'),
  styles: [require('./list-item.scss')],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmartSearchListItemComponent {
  @Input() text: string; // main text to display
  @Input() searchText: string; // text to highlight inside of main text
  @Input() market: string; // if present - text will be shown at the right side as market
  @Input() selected: boolean; // flag if this item should be rendered in selected state
  @Input() showTicks: boolean = true; // if to show selection ticks in selected state
}
