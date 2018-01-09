import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule, DatePipe} from '@angular/common';
import {UnityCommonPipesModule} from '../common/pipes/pipes.module';
import {UnityCommonComponentsModule} from '../common/components/components.module';
import {CadDatePipe} from './';
import {DatepickerComponent} from './';
import {DateRangePickerComponent} from './';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UnityCommonPipesModule,
    UnityCommonComponentsModule
  ],
  declarations: [
    CadDatePipe,
    DatepickerComponent,
    DateRangePickerComponent
  ],
  providers: [
    DatePipe,
    CadDatePipe
  ],
  exports: [
    CadDatePipe,
    DatepickerComponent,
    DateRangePickerComponent
  ]
})
export class UnityDateModule {}
