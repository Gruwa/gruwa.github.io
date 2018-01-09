import {Component, Input} from '@angular/core';
import {IBackgroundProcess} from '../';

@Component({
  selector: 'cad-background-process-success',
  template: require('./background-process-success.html'),
  styles: [require('./background-process-success.scss')]
})
export class BackgroundProcessSuccessComponent {
  @Input() process: IBackgroundProcess;
}
