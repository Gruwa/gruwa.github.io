import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {UnityCommonComponentsModule} from '../common/components/components.module';
import {UnityCommonPipesModule} from '../common/pipes/pipes.module';
import {UnityCommonWidgetsModule} from '../common/widgets/widgets.module';
import {UnityDateModule} from '../date/date.module';
import {UnityModalWindowModule} from '../modal-window/modal-window.module';

import {
  SmartFilterGroupComponent,
  SmartFilterComponent,
  SmartFilterOverlayDirective,
  SmartFilterButtonToggleComponent,
  SmartFilterDateRangeComponent,
  SmartFilterSelectComponent,
  SmartFilterInfolineComponent,
  SmartFilterModalComponent
} from './';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UnityCommonComponentsModule,
    UnityCommonPipesModule,
    UnityCommonWidgetsModule,
    UnityModalWindowModule,
    UnityDateModule
  ],
  declarations: [
    SmartFilterModalComponent,
    SmartFilterGroupComponent,
    SmartFilterComponent,
    SmartFilterOverlayDirective,
    SmartFilterButtonToggleComponent,
    SmartFilterDateRangeComponent,
    SmartFilterSelectComponent,
    SmartFilterInfolineComponent
  ],
  exports: [
    SmartFilterGroupComponent,
    SmartFilterComponent,
    SmartFilterButtonToggleComponent,
    SmartFilterDateRangeComponent,
    SmartFilterSelectComponent
  ],
  entryComponents: [SmartFilterModalComponent]
})
export class UnitySmartFilterModule {}
