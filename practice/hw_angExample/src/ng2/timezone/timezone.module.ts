import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {UnityCommonPipesModule} from '../common/pipes/pipes.module';
import {UnityCommonComponentsModule} from '../common/components/components.module';
import {UnityCommonWidgetsModule} from '../common/widgets/widgets.module';

import {CadTimezoneComponent} from './';
import {TimezoneService} from './';

@NgModule({
  imports: [
    FormsModule,
    UnityCommonPipesModule,
    UnityCommonComponentsModule,
    UnityCommonWidgetsModule
  ],
  declarations: [
    CadTimezoneComponent
  ],
  providers: [
    TimezoneService
  ],
  exports: [
    CadTimezoneComponent
  ]
})
export class UnityTimezoneModule { }
