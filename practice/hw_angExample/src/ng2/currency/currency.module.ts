import {NgModule} from '@angular/core';
import {UnityNumberModule} from '../number/number.module';
import {CadNumberPipe} from '../number/pipes/number/number.pipe';
import {CadNumberShortPipe} from '../number/pipes/number-short/number-short.pipe';
import {CurrencyService} from './services';
import {CadCurrencyPipe} from './pipes';
import {CadCurrencyShortPipe} from './pipes';
import {CadCurrencySignPipe} from './pipes';
import {CadCurrencyNamePipe} from './pipes';

@NgModule({
  imports: [
    UnityNumberModule
  ],
  declarations: [
    CadCurrencyPipe,
    CadCurrencySignPipe,
    CadCurrencyShortPipe,
    CadCurrencyNamePipe
  ],
  providers: [
    CurrencyService,
    CadCurrencySignPipe,
    CadNumberPipe,
    CadNumberShortPipe,
    CadCurrencyNamePipe
  ],
  exports: [
    CadCurrencyPipe,
    CadCurrencySignPipe,
    CadCurrencyShortPipe,
    CadCurrencyNamePipe
  ]
})
export class UnityCurrencyModule {
}
