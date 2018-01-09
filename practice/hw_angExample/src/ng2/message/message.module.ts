import {NgModule} from '@angular/core';
import {
  ToastModule,
  ToastOptions,
  ToastsManager
} from 'ng2-toastr';
import {
  SystemMessageContainerComponent,
  SystemToastMessageService,
  SimpleMessageContainerComponent,
  MessageService,
  AlertListService
} from './';

@NgModule({
  imports: [
    ToastModule
  ],
  declarations: [
    SystemMessageContainerComponent,
    SimpleMessageContainerComponent
  ],
  providers: [
    ToastOptions,
    ToastsManager,
    MessageService,
    SystemToastMessageService,
    AlertListService
  ],
  entryComponents: [
    SystemMessageContainerComponent,
    SimpleMessageContainerComponent
  ]
})
export class MessageModule {}
