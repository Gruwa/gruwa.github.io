import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

export interface IContextMenuItem {
  title: string;
  action: Function;
  icon?: string;
  tooltip?: string;
  tooltipWhenDisabled?: string;
  disabled?: boolean;
  selected?: boolean;
}

@Component({
  selector: 'cad-context-menu-item',
  template: require('./context-menu-item.html'),
  styles: [require('./context-menu-item.scss')],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContextMenuItemComponent {
  @Input() item: IContextMenuItem;
  @Input() small: boolean; // if to render item in compact mode

  getTooltip(): string {
    return this.item.disabled ? this.item.tooltipWhenDisabled : this.item.tooltip;
  }

  runAction() {
    if (!this.item.disabled) this.item.action();
  }
}
