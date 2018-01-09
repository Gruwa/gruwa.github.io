import {Component, ChangeDetectionStrategy, Input} from '@angular/core';

@Component({
  selector: 'cad-smart-search-list-item-subtext',
  template: require('./list-item-subtext.html'),
  styles: [
    require('./list-item-subtext.scss')
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmartSearchListItemSubtextComponent {
  @Input() text: string; // main text to display
  @Input() searchText: string; // text to highlight inside of main text
  @Input() subtext: string; // optional text to display under the main one
  @Input() market: string; // if present - text will be shown at the right side as market
  @Input() selected: boolean; // flag if this item should be rendered in selected state
  @Input() showTicks: boolean = true; // if to show selection ticks in selected state
}
