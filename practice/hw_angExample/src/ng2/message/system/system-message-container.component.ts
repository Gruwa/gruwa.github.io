import {Component, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {SystemToastMessageService} from './system-toast-message.service';

@Component({
  selector: 'cad-ngx-system-message-container',
  template: '<ng-template #content></ng-template>',
  styles: [require('./system-message.scss')],
  encapsulation: ViewEncapsulation.None
})

export class SystemMessageContainerComponent implements OnInit {
  @ViewChild('content', {read: ViewContainerRef}) content: ViewContainerRef;

  constructor(
    private systemToastMessageService: SystemToastMessageService
  ) {
  }

  ngOnInit() {
    this.systemToastMessageService.setRootViewContainerRef(this.content);
  }
}
