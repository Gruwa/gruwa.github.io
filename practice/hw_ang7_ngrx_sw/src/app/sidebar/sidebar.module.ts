import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppComponentsModule} from '../shared/components/app-components.module';
import {MaterialsModule} from '../shared/components/materials/materials.module';
import {ReactiveFormsModule} from '@angular/forms';
import {SideBarComponent} from './side-bar.component';
import {GroupScheduleComponent} from './group-schedule/group-schedule.component';
import {StoreModule} from '@ngrx/store';
import {sidebarReducer} from './state/sidebar.reducer';
import {EffectsModule} from '@ngrx/effects';
import {SidebarEffects} from './state/sidebar.effects';

@NgModule({
  imports: [
    CommonModule,
    AppComponentsModule,
    ReactiveFormsModule,
    MaterialsModule,
    StoreModule.forFeature('sidebar', {sidebarReducer}),
    EffectsModule.forFeature([SidebarEffects])
  ],
  declarations: [
    SideBarComponent,
    GroupScheduleComponent
  ],
  providers: [
    // SideBarService
  ],
  exports: [
    SideBarComponent,
    GroupScheduleComponent
  ]
})
export class SidebarModule {
}
