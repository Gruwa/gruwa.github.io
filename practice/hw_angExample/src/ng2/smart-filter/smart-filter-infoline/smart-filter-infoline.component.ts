import {Component, Input, Output, EventEmitter, ViewChild} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {SmartFilterComponent} from '../smart-filter.component';
import {SmartTooltipDirective} from '../../common/components/smart-tooltip/smart-tooltip.directive';

export interface IInfoLineItem {
  filter: SmartFilterComponent;
  title: string;
  label: string | Observable<string>;
  tooltip: string | Observable<string>;
}

interface IDiscardFilter {
  filter: SmartFilterComponent;
}

@Component({
  selector: 'cad-smart-filter-infoline',
  template: require('./smart-filter-infoline.html'),
  styles: [require('./smart-filter-infoline.scss')]
})
export class SmartFilterInfolineComponent {
  @Input() items: IInfoLineItem[];
  @Input() limit: number;
  @Output('discard') discardEvent: EventEmitter<IDiscardFilter> = new EventEmitter();

  @ViewChild('showMoreTooltip') showMoreTooltip: SmartTooltipDirective;

  isObservable(val) {
    return val instanceof Observable;
  }

  discard(filter: SmartFilterComponent) {
    this.discardEvent.emit({filter});
  }

  tooltipDiscard($event: MouseEvent, filter: SmartFilterComponent) {
    // do not close tooltip on discard
    $event.stopPropagation();
    this.discard(filter);
  }
}
