import {Component, Input} from '@angular/core';
import {IBackgroundProcess} from '../';

@Component({
  selector: 'cad-background-process-progress',
  template: require('./background-process-progress.html')
})
export class BackgroundProcessProgressComponent {
  @Input() process: IBackgroundProcess;
}
