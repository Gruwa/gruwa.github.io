import { Directive, ElementRef, Injector, Input, Output, EventEmitter } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
import {LoggerService} from '../../common/services/logger/logger.service';

@Directive({
  selector: 'cad-ng2-date-range-picker'
})
export class Ng2DateRangePickerComponent extends UpgradeComponent {
  @Input() dateRange: any;
  @Input() dateRangeOptions: any;
  @Input() placeholder: string;
  @Output() dateRangeChange: EventEmitter<any>;
  constructor(
    elementRef: ElementRef,
    injector: Injector,
    log: LoggerService
  ) {
    log.warn('<cad-ng2-date-range-picker> in deprecated, please use <cad-date-range-picker> component instead');

    super('dateRangePickerWrapper', elementRef, injector);
  }
}
