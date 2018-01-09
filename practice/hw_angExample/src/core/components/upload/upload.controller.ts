export interface IUploadPromise<T> extends ng.IPromise<T> {
  abort: Function;
}

interface IUploadOptions {
  titlesRoot: string;
  uploadFn: (Object) => IUploadPromise<string>;
  maxSize: number;
  pattern: string;
  accept: string;
  status?: string;
}

export class UploadController {
  options: IUploadOptions;
  uploadEvent: (value: string) => void;
  errorType: string;
  fileName: string;
  activeState: string;
  progressPosition: number;
  private activeUpload: IUploadPromise<string> = null;
  private ngModel: ng.INgModelController;
  private wasCancelled = false;

  constructor($element: ng.IAugmentedJQuery) {
    'ngInject';
    this.ngModel = $element.controller('ngModel');
  }

  $onInit() {
    this.resetState();
  }

  // build path to text in translation file
  textPath(prop: string): string {
    return this.options.titlesRoot + '.' + prop;
  }

  invokeUpload($file: {name: string, size: number}) {
    if (!$file) { return; }

    this.fileName = $file.name;

    if (_.isNumber(this.options.maxSize) && $file.size > this.options.maxSize) {
      this.showError('size');
      this.options.status = 'size-error';
    } else {
      this.showProgress();
      this.activeUpload = this.options.uploadFn($file);
      this.activeUpload.then(this.showSuccess.bind(this), this.showError.bind(this), this.showProgress.bind(this));
    }
  }

  cancelUpload() {
    if (this.activeUpload) {
      this.activeUpload.abort();
      this.wasCancelled = true;
    }
  }

  resetState() {
    this.wasCancelled = false;
    this.activeUpload = null;
    this.activeState = 'initial';
    this.fileName = '';
    this.progressPosition = 0;
    if (this.ngModel) {
      this.ngModel.$setViewValue(null);
    }
    if (this.uploadEvent) {
      this.uploadEvent(null);
    }
  }

  private showSuccess(data: string) {
    this.activeState = 'success';

    if (this.ngModel) {
      this.ngModel.$setViewValue(data);
    }
    if (this.uploadEvent) {
      this.uploadEvent(data);
    }
  }

  private showError(errorType: string) {
    if (this.wasCancelled) {
      this.resetState();
    } else {
      this.activeState = 'error';
      this.errorType = errorType;
    }
  }

  private showProgress(data?: {total: number, loaded: number}) {
    this.activeState = 'progress';

    // update progress bar position, if there's any data
    if (data && data.total) {
      let percent = Math.round(data.loaded * 100 / data.total);
      this.progressPosition = Math.min(Math.max(0, percent), 100);
    }
  }
}
