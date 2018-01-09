import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {UnityCommonComponentsModule} from '../common/components/components.module';
import {UnityCommonPipesModule} from '../common/pipes/pipes.module';
import {UnityUploadModule} from '../upload/upload.module';
import {SupportService, SupportButtonComponent, SupportPopupComponent} from './';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UnityCommonComponentsModule,
    UnityCommonPipesModule,
    UnityUploadModule
  ],
  declarations: [
    SupportButtonComponent,
    SupportPopupComponent
  ],
  providers: [
    SupportService
  ],
  exports: [
    SupportButtonComponent
  ],
  entryComponents: [
    SupportButtonComponent,
    SupportPopupComponent // because $uibModal requires nq1 component
  ]
})
export class UnitySupportModule {}
