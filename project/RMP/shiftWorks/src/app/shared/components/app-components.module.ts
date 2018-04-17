import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShiftBlockComponent} from './shift-block/shift-block.component';
import {FormComponent} from './form/form.component';
import {MaterialsModule} from './materials/materials.module';
import {PageNotFoundComponent} from './not-found/not-found.component';
import {HeaderShiftsComponent} from './header-shifts/header-shifts.component';
import {SpinnerComponent} from './spinner/spinner.component';
import {SmallSpinnerComponent} from './small-spinner/small-spinner.component';
import {ListFieldsComponent} from './list-fields/list-fields.component';
import {PipeModule} from '../pipes/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialsModule,
    PipeModule.forRoot()
  ],
  declarations: [
    ShiftBlockComponent,
    FormComponent,
    PageNotFoundComponent,
    HeaderShiftsComponent,
    SpinnerComponent,
    SmallSpinnerComponent,
    ListFieldsComponent
  ],
  exports: [
    ShiftBlockComponent,
    FormComponent,
    PageNotFoundComponent,
    HeaderShiftsComponent,
    SpinnerComponent,
    SmallSpinnerComponent,
    ListFieldsComponent
  ]
})
export class AppComponentsModule {
}
