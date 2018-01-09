import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UnityCommonComponentsModule} from '../common/components/components.module';
import {UnityCommonPipesModule} from '../common/pipes/pipes.module';
import {UnityCommonDirectivesModule} from '../common/directives/directives.module';
import {HasPermissionsPipe} from './';
import {ForbiddenPageComponent} from './';

@NgModule({
  imports: [
    CommonModule,
    UnityCommonComponentsModule,
    UnityCommonPipesModule,
    UnityCommonDirectivesModule
  ],
  declarations: [
    HasPermissionsPipe,
    ForbiddenPageComponent
  ],
  exports: [
    HasPermissionsPipe,
    ForbiddenPageComponent
  ],
  entryComponents: [
    ForbiddenPageComponent
  ]
})
export class UnityAuthModule {}
