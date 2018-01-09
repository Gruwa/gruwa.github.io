import {Component, Input, forwardRef} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import {Observable} from 'rxjs';

export type UploadView = 'standard' | 'compact';

export interface IUploadPromise<T> extends ng.IPromise<T> {
  abort: Function;
}

export interface IFulfillFnResult {
  promise: Promise<any>;
  progress: Observable<any>;
  abort: Function;
}

export interface IUploadOptions {
  titlesRoot: string;
  uploadFn?: (Object) => IUploadPromise<string>; // deprecated, use fulfillFn instead
  fulfillFn?: (Object) => IFulfillFnResult;
  maxSize?: number;
  accept: string;
  status?: string;
  disabled?: boolean;
}

@Component({
  selector: 'cad-upload',
  template: require('./upload.html'),
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploadComponent),
      multi: true
    }
  ]
})
export class UploadComponent implements ControlValueAccessor {
  @Input() options: IUploadOptions;
  @Input() type: UploadView = 'standard'; // tslint:disable-line

  propagateChange: (value: any) => void = _.noop;

  writeValue(value: any) {
    return; // since a value is not used
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn) {
    return;
  }

  setDisabledState(disabled: boolean) {
    this.options = {...this.options, disabled};
  }

  onChange($event) {
    this.propagateChange($event);
  }
}
