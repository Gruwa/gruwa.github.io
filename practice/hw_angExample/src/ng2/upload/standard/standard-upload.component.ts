import {Component, ContentChild, TemplateRef} from '@angular/core';
import {BaseUploadComponent} from '../';

@Component({
  selector: 'cad-standard-upload',
  template: require('./standard-upload.html'),
  styles: [require('./standard-upload.scss')]
})
export class StandardUploadComponent extends BaseUploadComponent {
  @ContentChild('customSuccessTemplate')
  private customSuccessTemplate: TemplateRef<any>;

  constructor() {
    super();
    this.resetState = () => super.resetState();
  }

  getDefaultError(error: string) {
    if (error && _.isString(error)) {
      return this.textPath(error);
    }

    return this.textPath('limitation');
  }
}
