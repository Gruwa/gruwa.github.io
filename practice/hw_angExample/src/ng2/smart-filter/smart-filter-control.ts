import {Observable} from 'rxjs/Observable';
import {ElementRef} from '@angular/core';
import {FormGroup} from '@angular/forms';

export interface ISmartFilterControl {
  hasSmartTooltip?: boolean;

  /**
   * these 3 fields helps us to show errors in case of invalid data, and to support scroll behavior
   */
  elementReference?: ElementRef;
  form?: FormGroup;
  isValid?(): boolean;

  setValue(value: any);
  getValue(): any;
  getLabel(): string | Observable<string>;
  getTooltip(): string | Observable<string>;
}
