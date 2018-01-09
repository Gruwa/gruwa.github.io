import {NgModule} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {TranslatePipe} from './';
import {CadLimitToPipe} from './';
import {GetNestedPipe} from './';
import {ItemLabelPipe} from './';
import {HighlightPipe} from './';
import {CadPercentPipe} from './';
import {CadUsernamePipe} from './';
import {JoinPipe} from './';
import {SafeHtmlPipe} from './';
import {BytesPipe} from './';
import {MomentFormatPipe} from './';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    TranslatePipe,
    CadPercentPipe,
    CadLimitToPipe,
    CadUsernamePipe,
    GetNestedPipe,
    ItemLabelPipe,
    HighlightPipe,
    JoinPipe,
    SafeHtmlPipe,
    BytesPipe,
    MomentFormatPipe
  ],
  providers: [
    ItemLabelPipe,
    DecimalPipe
  ],
  exports: [
    TranslatePipe,
    CadPercentPipe,
    CadLimitToPipe,
    CadUsernamePipe,
    GetNestedPipe,
    ItemLabelPipe,
    HighlightPipe,
    JoinPipe,
    SafeHtmlPipe,
    BytesPipe,
    MomentFormatPipe
  ]
})
export class UnityCommonPipesModule {}
