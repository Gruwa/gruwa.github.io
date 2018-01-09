import {NgModule} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {CadNumberPipe} from './';
import {CadNumberShortPipe} from './';

@NgModule({
    imports: [],
    declarations: [
      CadNumberPipe,
      CadNumberShortPipe
    ],
    providers: [
      DecimalPipe
    ],
    exports: [
      CadNumberPipe,
      CadNumberShortPipe
    ]
})
export class UnityNumberModule { }
