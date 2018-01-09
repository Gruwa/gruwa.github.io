import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {UnityCommonComponentsModule} from '../../common/components/components.module';
import {UnityCommonPipesModule} from '../../common/pipes/pipes.module';
import {UnityDateModule} from '../../date/date.module';

import {
  NotificationInboxComponent,
  NotificationMessageComponent,
  NotificationsToastComponent,
  NotificationsService
} from './';

@NgModule({
  imports: [
    CommonModule,
    UnityCommonComponentsModule,
    UnityCommonPipesModule,
    UnityDateModule
  ],
  providers: [
    NotificationsService
  ],
  declarations: [
    NotificationInboxComponent,
    NotificationMessageComponent,
    NotificationsToastComponent
  ],
  exports: [
    NotificationInboxComponent,
    NotificationMessageComponent,
    NotificationsToastComponent
  ],
  entryComponents: [
    NotificationInboxComponent,
    NotificationMessageComponent,
    NotificationsToastComponent
  ]
})
export class UnityNotificationsModule {}
