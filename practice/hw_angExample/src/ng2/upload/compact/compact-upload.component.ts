import {Component} from '@angular/core';
import {BaseUploadComponent} from '../';

@Component({
  selector: 'cad-compact-upload',
  template: require('./compact-upload.html'),
  styles: [require('./compact-upload.scss')]
})
export class CompactUploadComponent extends BaseUploadComponent {}
