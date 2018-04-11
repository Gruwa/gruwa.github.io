import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShiftBlockComponent} from './shift-block/shift-block.component';
import {FormComponent} from './form/form.component';
import {MaterialsModule} from './materials/materials.module';
import {PageNotFoundComponent} from './not-found/not-found.component';
import {HeaderShiftsComponent} from './header-shifts/header-shifts.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialsModule
  ],
  declarations: [
    ShiftBlockComponent,
    FormComponent,
    PageNotFoundComponent,
    HeaderShiftsComponent
  ],
  exports: [
    ShiftBlockComponent,
    FormComponent,
    PageNotFoundComponent,
    HeaderShiftsComponent
  ]
})
export class AppComponentsModule {
}
