import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppComponentsModule} from '../shared/components/app-components.module';
import {MaterialsModule} from '../shared/components/materials/materials.module';
import {ReactiveFormsModule} from '@angular/forms';
import {SideBarComponent} from './side-bar.component';

@NgModule({
  imports: [
    CommonModule,
    AppComponentsModule,
    ReactiveFormsModule,
    MaterialsModule
  ],
  declarations: [
    SideBarComponent
  ],
  providers: [
    // SideBarService
  ],
  exports: [
    SideBarComponent
  ]
})
export class SidebarModule {
}
