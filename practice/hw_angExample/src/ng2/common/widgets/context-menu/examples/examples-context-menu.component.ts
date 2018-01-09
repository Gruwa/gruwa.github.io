import {Component} from '@angular/core';
import {IContextMenuItem} from '../context-menu-item.component';
import {MessageService} from '../../../../message/simple/message.service';

@Component({
  selector: 'cad-examples-context-menu',
  template: require('./examples-context-menu.html')
})
export class ExamplesContextMenuComponent {
  placement = 'bottom-right';
  headType = 'dots';

  menuItems: IContextMenuItem[] = [
    {
      title: 'Lorem ipsum',
      disabled: false,
      selected: true,
      tooltip: 'Hello, this is item tooltip',
      action: () => this.messageService.showSuccessMessage('1st item clicked')
    },
    {
      title: 'Dolor sit amet',
      disabled: true,
      tooltipWhenDisabled: 'This item is disabled just for demo purposes',
      action: () => this.messageService.showSuccessMessage('2nd item clicked')
    },
    {
      title: 'Aliquid consectetur culpa earum',
      disabled: false,
      action: () => this.messageService.showSuccessMessage('3rd item clicked')
    }
  ];

  constructor(
    private messageService: MessageService
  ) {}
}
