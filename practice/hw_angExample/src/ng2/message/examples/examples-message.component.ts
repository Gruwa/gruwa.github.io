import {Component} from '@angular/core';
import {MessageService} from '../';
import {SystemToastMessageService} from '../';
import {IToastMessageOptions} from '../simple/message.service';

@Component({
  selector: 'cad-examples-message',
  template: require('./examples-message.html')
})

export class ExamplesMessageComponent {
  message = 'message';
  title = 'title';
  isWhite: boolean = false;
  toastLife = 3000;

  messageType: 'success' | 'error' | 'progress' | 'system' = 'success';

  constructor(
    private messageService: MessageService,
    private systemToastMessageService: SystemToastMessageService
  ) {
  }

  showMessage() {
    let messageData: IToastMessageOptions = {
      body: this.message,
      title: this.title,
      isWhite: this.isWhite,
      toastLife: this.toastLife
    };

    switch (this.messageType) {
      case 'success':
        this.messageService.showSuccessMessage(messageData);
        break;
      case 'error':
        this.messageService.showErrorMessage(messageData);
        break;
      case 'progress':
        this.messageService.showProgressMessage(messageData);
        break;
      case 'system':
        this.systemToastMessageService.showMessage(this.message, this.title);
        break;
      default:
        break;
    }
  }
}
