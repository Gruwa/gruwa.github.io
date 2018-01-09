import {Component} from '@angular/core';
import {StatusSizes} from '../status.component';

@Component({
  selector: 'cad-examples-status',
  template: require('./examples-status.component.html')
})
export class ExamplesStatusComponent {
  size: StatusSizes = 'default';
}
