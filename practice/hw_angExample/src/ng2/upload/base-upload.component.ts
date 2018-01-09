import {Input, Output, EventEmitter, OnInit} from '@angular/core';
import {IUploadOptions, IUploadPromise, IFulfillFnResult} from './';

export type UploadState = 'initial' | 'progress' | 'success' | 'error';
export type UploadError = 'size' | 'duplicate';

export abstract class BaseUploadComponent {
  @Input() options: IUploadOptions;
  @Output() onChange = new EventEmitter<any>();

  state: UploadState = 'initial';
  error: UploadError;
  fileName: string = '';
  progress: number = 0;

  private activeUpload: IUploadPromise<string> | IFulfillFnResult = null; // need to preserve backward compatibility
  private wasCancelled = false;

  // build path to text in translation file
  textPath(prop: string): string {
    return this.options.titlesRoot + '.' + prop;
  }

  upload(file: File) {
    if (!file) { return; }

    this.fileName = file.name;

    if (_.isNumber(this.options.maxSize) && file.size > this.options.maxSize) {
      this.showError('size');
      this.options.status = 'size-error';
    } else {
      this.showProgress();

      // need to preserve backward compatibility
      if (this.options.fulfillFn) {
        this.activeUpload = this.options.fulfillFn(file);
        this.activeUpload.promise.then(this.showSuccess.bind(this), this.showError.bind(this));
        this.activeUpload.progress.subscribe(this.showProgress.bind(this));
      } else {
        this.activeUpload = this.options.uploadFn(file);
        this.activeUpload.then(this.showSuccess.bind(this), this.showError.bind(this), this.showProgress.bind(this));
      }
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
    this.state = 'initial';
    this.fileName = '';
    this.progress = 0;
    this.onChange.emit(null);
  }

  private showSuccess(data: string) {
    this.state = 'success';
    this.onChange.emit(data);
  }

  private showError(error: UploadError) {
    if (this.wasCancelled) {
      this.resetState();
    } else {
      this.state = 'error';
      this.error = error;
    }
  }

  private showProgress(data?: {total: number, loaded: number}) {
    this.state = 'progress';

    // update progress bar position, if there's any data
    if (data && data.total) {
      let percent = Math.round(data.loaded * 100 / data.total);
      this.progress = Math.min(Math.max(0, percent), 100);
    }
  }
}
