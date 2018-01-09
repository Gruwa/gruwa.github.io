import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UnityCommonComponentsModule} from '../common/components/components.module';
import {UnityCommonPipesModule} from '../common/pipes/pipes.module';

import {UploadNg1Component} from './';
import {
  UploadService,
  DropFileDirective,
  SelectFileDirective,
  UploadComponent,
  StandardUploadComponent,
  CompactUploadComponent
} from './';

@NgModule({
  imports: [
    CommonModule,
    UnityCommonComponentsModule,
    UnityCommonPipesModule
  ],
  declarations: [
    UploadNg1Component,
    DropFileDirective,
    SelectFileDirective,
    UploadComponent,
    StandardUploadComponent,
    CompactUploadComponent
  ],
  exports: [
    UploadNg1Component,
    DropFileDirective,
    SelectFileDirective,
    UploadComponent,
    StandardUploadComponent,
    CompactUploadComponent
  ],
  providers: [
    UploadService
  ]
})
export class UnityUploadModule {}
