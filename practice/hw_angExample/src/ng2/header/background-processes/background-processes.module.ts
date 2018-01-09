import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {UnityCommonComponentsModule} from '../../common/components/components.module';
import {UnityCommonPipesModule} from '../../common/pipes/pipes.module';
import {UnityModalWindowModule} from '../../modal-window/modal-window.module';
import {UnitySupportModule} from '../../support/support.module';

import {
  BackgroundProcessesService,
  BackgroundProcessesComponent,
  BackgroundProcessComponent,
  BackgroundProcessProgressComponent,
  BackgroundProcessSuccessComponent,
  BackgroundProcessFailedComponent,
  BackgroundProcessDismissPopupComponent
} from './';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UnityCommonComponentsModule,
    UnityCommonPipesModule,
    UnityModalWindowModule,
    UnitySupportModule
  ],
  providers: [
    BackgroundProcessesService
  ],
  declarations: [
    BackgroundProcessesComponent,
    BackgroundProcessComponent,
    BackgroundProcessProgressComponent,
    BackgroundProcessSuccessComponent,
    BackgroundProcessFailedComponent,
    BackgroundProcessDismissPopupComponent
  ],
  exports: [
    BackgroundProcessesComponent
  ],
  entryComponents: [
    BackgroundProcessesComponent,
    BackgroundProcessDismissPopupComponent
  ]
})
export class BackgroundProcessesModule {}
