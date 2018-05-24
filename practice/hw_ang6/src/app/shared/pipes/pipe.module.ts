import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RealDatePipe} from './real-date/real-date.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    RealDatePipe,
  ],
  exports: [
    RealDatePipe,
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
