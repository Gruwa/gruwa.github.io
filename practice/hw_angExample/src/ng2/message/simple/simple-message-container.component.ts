import {Component, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {MessageService} from './message.service';

@Component({
  selector: 'cad-ngx-simple-message-container',
  template: '<ng-template #content></ng-template>',
  styles: [require('./simple-message.scss')],
  encapsulation: ViewEncapsulation.None
})

export class SimpleMessageContainerComponent implements OnInit {
  @ViewChild('content', {read: ViewContainerRef}) content: ViewContainerRef;

  constructor(
    private messageService: MessageService
  ) {
  }

  ngOnInit() {
    this.messageService.setRootViewContainerRef(this.content);
  }
}
