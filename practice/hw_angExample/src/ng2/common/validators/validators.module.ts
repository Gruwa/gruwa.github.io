import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmailValidatorDirective} from './';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    EmailValidatorDirective
  ],
  providers: [],
  exports: [
    EmailValidatorDirective
  ]
})
export class UnityCommonValidatorsModule {}
