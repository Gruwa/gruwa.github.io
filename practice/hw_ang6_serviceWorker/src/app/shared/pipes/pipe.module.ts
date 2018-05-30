import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RealDatePipe} from './real-date/real-date.pipe';
import {CapitalizeFirstPipe} from './capitalize-first/capitalize-first.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    RealDatePipe,
    CapitalizeFirstPipe
  ],
  exports: [
    RealDatePipe,
    CapitalizeFirstPipe
  ]
})
export class PipeModule {
  static forRoot() {
    return {
      ngModule: PipeModule,
      providers: [],
    };
  }
}
