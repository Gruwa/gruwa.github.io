import {Component, Inject, EventEmitter, ViewChild} from '@angular/core';
import {ConfigService} from '../../common/services/config/config.service';
import {IUploadOptions, IFulfillFnResult, StandardUploadComponent} from '../';

@Component({
  selector: 'cad-examples-upload',
  template: require('./examples-upload.html')
})
export class ExamplesUploadComponent {
  type = 'standard'; // tslint:disable-line
  isResetOnChange = false;
  isErrorHidden = true;
  selectFile: any | [any];
  invalidFile: any | [any];
  value: any;

  options: IUploadOptions = {
    titlesRoot: 'support.upload_screenshot',
    fulfillFn: this.upload.bind(this),
    accept: 'image/*',
    maxSize: 5 * 1024 * 1024
  };

  constructor(
    @Inject('$http') private $http: ng.IHttpService,
    @Inject('Upload') private Upload: ng.angularFileUpload.IUploadService,
    private configService: ConfigService
  ) {}

  uploadDirective(file: File) {
    return this.upload(file).promise.then(this.showSuccess.bind(this), this.showError.bind(this));
  }

  showSuccess(uploadFile: File) {
    if (Array.isArray(this.selectFile) && this.selectFile.length) {
      this.selectFile.push(uploadFile);
    } else {
      this.selectFile = [uploadFile];
    }
  }

  showError(rejectedFile: File) {
    this.isErrorHidden = false;
    if (Array.isArray(this.invalidFile) && this.invalidFile.length) {
      this.invalidFile.push(rejectedFile);
    } else {
      this.invalidFile = [rejectedFile];
    }
  }

  reset() {
    this.invalidFile = null;
    this.selectFile = null;
    this.isErrorHidden = true;
  }

  // TODO: create stub
  upload(file: File): IFulfillFnResult {
    let resolveHttpTimeout = () => null;
    let progress = new EventEmitter<any>();

    let promise: Promise<string> = this.$http
      .get<any>(this.configService.getShellBaseURL() + 'file/urls', {
        cache: false,
        params: {type: file.type}
      })
      .then(r => {
        return this.$http({
          url: r.data.put,
          method: 'PUT',
          headers: {
            'Content-Type': file.type
          },
          suppressAuthorization: true, // flag for http interceptor to don't add bearer token as amazon fails with it
          data: file,
          timeout: new Promise(resolve => resolveHttpTimeout = resolve),
          uploadEventHandlers: {
            progress: event => progress.emit(event)
          }
        }).then(() => r.data.get);
      });

    return {
      promise,
      progress,
      abort: () => resolveHttpTimeout() // tslint:disable-line
    };
  }
}
