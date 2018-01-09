import {Component, Input, Output, EventEmitter} from '@angular/core';
import {IBackgroundProcess} from '../';

@Component({
  selector: 'cad-background-process-failed',
  template: require('./background-process-failed.html'),
  styles: [require('./background-process-failed.scss')]
})
export class BackgroundProcessFailedComponent {
  @Input() process: IBackgroundProcess;
  @Output() onOpen = new EventEmitter<number>();
  @Output() onDismiss = new EventEmitter<number>();

  open() {
    this.onOpen.emit(this.process.id);
  }

  dismiss() {
    this.onDismiss.emit(this.process.id);
  }
}
