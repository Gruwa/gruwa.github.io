import {Component, Input} from '@angular/core';
import {IBackgroundProcess} from '../';

@Component({
  selector: 'cad-background-process',
  template: require('./background-process.html'),
  styles: [require('./background-process.scss')]
})
export class BackgroundProcessComponent {
  @Input() process: IBackgroundProcess;
}
