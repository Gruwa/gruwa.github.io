import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DateRangeConfigService} from './services/date-range-config.service';
import {Ng2DateRangePickerComponent} from './components/ng2-date-range-picker.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    Ng2DateRangePickerComponent
  ],
  providers: [
    DateRangeConfigService
  ],
  exports: [
    Ng2DateRangePickerComponent
  ]
})
export class CadDateRangeModule {}
