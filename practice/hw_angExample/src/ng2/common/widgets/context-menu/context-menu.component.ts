import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {DropdownPlacements} from '../../components/dropdown/dropdown.component';
import {IContextMenuItem} from './context-menu-item.component';

type ContextMenuHeadType = 'dots' | 'button';

@Component({
  selector: 'cad-context-menu',
  template: require('./context-menu.html'),
  styles: [require('./context-menu.scss')],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContextMenuComponent {
  @Input() items: IContextMenuItem[];
  @Input() small: boolean; // if to render items in compact mode
  @Input() headType: ContextMenuHeadType = 'dots';
  @Input() placement: DropdownPlacements = 'bottom-left'; // where to popup dropdown

  isDropdownOpened: boolean;

  onItemClick(item: IContextMenuItem) {
    this.isDropdownOpened = item.disabled ? this.isDropdownOpened : false;
  }
}
