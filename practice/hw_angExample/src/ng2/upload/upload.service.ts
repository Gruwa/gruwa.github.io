import * as _ from 'lodash';
import {Injectable, Inject} from '@angular/core';
import {WindowService} from '../../ng2/common';

@Injectable()
export class UploadService {
  private MIME_PATTERN = /\//;
  private EXTENSION_PATTERN = /^\./;

  constructor(
    @Inject(WindowService) private window: Window
  ) {}

  isFileAccepted(accept: string, file: File): boolean {
    return !_.isNil(file)
      && this.isFileTypeAccepted(accept, file.type)
      && this.isFileExtensionAccepted(accept, file.name);
  }

  isFileTypeAccepted(accept: string, fileType: string): boolean {
    const acceptedValues: string[] = this.parseAcceptedValues(accept, this.MIME_PATTERN);
    if (_.isEmpty(acceptedValues)) {
      return true;
    }
    const fileTypeGroup = fileType.replace(/\/.+/, '/*');
    const matchedValue = _.find(acceptedValues, value => value === fileType || value === fileTypeGroup);
    return !_.isEmpty(matchedValue);
  }

  isFileExtensionAccepted(accept: string, fileName: string): boolean {
    const acceptedValues: string[] = this.parseAcceptedValues(accept, this.EXTENSION_PATTERN);
    if (_.isEmpty(acceptedValues)) {
      return true;
    }
    const extension = '.' + fileName.split('.').pop();
    const matchedValue = _.find(acceptedValues, value => value === extension);
    return !_.isEmpty(matchedValue);
  }

  getImgContent(
    params: { file: File, maxFileSize: number, maxImageWidth: number, maxImageHeigth: number }
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      if (params.file.size > params.maxFileSize) {
        reject('big_file_size');
        return;
      }

      const reader = new this.window.FileReader();
      const image = new this.window.Image();

      reader.onloadend = () => {
        image.src = reader.result;
      };

      image.onload = () => {
        if (image.width > params.maxImageWidth || image.height > params.maxImageHeigth) {
          reject('big_image_size');
          return;
        }

        resolve(reader.result);
      };

      if (params.file) {
        reader.readAsDataURL(params.file);
      } else {
        reject('invalid_file');
      }
    });
  }

  private parseAcceptedValues(accept: string, filter?: RegExp): string[] {
    const values = accept.split(',');
    if (filter) {
      return _.filter(values, value => filter.test(value));
    } else {
      return values;
    }
  }
}
