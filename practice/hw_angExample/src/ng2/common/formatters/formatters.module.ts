import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NumberFormatterDirective} from './number/number-formatter.directive';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [
    NumberFormatterDirective
  ],
  exports: [
    NumberFormatterDirective
  ]
})
export class UnityCommonFormattersModule {}
