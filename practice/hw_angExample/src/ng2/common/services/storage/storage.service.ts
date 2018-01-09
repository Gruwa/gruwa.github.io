import * as _ from 'lodash';
import {Injectable, Inject} from '@angular/core';
import {WindowService} from '../window/window.service';
import {b64EncodeUnicode, b64DecodeUnicode} from '../../../../core/utils/b64';

interface IOptions {
  useBase64?: boolean; // if to encode/decode base64 and parse/serialize json
  fallbackVal?: any; // default value to return when JSON/base64 decoding fails
  type?: 'local' | 'session'; // tslint:disable-line
}

@Injectable()
export class StorageService {
  private defaultOptions: IOptions = {
    useBase64: false,
    fallbackVal: {},
    type: 'local'
  };

  constructor(
    @Inject(WindowService) private $window: cad.IWindowService
  ) {}

  read(key: string, options?: IOptions): any {
    options = _.assignIn({}, this.defaultOptions, options);
    const result = this.storage(options).getItem(key);
    return options.useBase64 ? this.decode(result, options.fallbackVal) : result;
  }

  write(key: string, value: any, options?: IOptions) {
    options = _.assignIn({}, this.defaultOptions, options);
    this.storage(options).setItem(key, options.useBase64 ? this.encode(value) : value);
  }

  remove(key: string, options?: IOptions) {
    options = _.assignIn({}, this.defaultOptions, options);
    return this.storage(options).removeItem(key);
  }

  private storage(options: IOptions): Storage {
    return options.type === 'local' ? this.$window.localStorage : this.$window.sessionStorage;
  }

  private encode(data: any): string {
    return b64EncodeUnicode(JSON.stringify(data));
  }

  private decode(data: string, fallback: any): any {
    let result = fallback;
    if (!_.isEmpty(data)) {
      try {
        result = JSON.parse(b64DecodeUnicode(data));
      } catch (e) {
        // json parsing error, fallback value will be returned
      }
    }
    return result;
  }
}
