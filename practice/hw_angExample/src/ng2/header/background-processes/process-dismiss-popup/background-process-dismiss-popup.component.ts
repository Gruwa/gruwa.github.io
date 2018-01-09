import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'background-process-dismiss-popup',
  template: require('./background-process-dismiss-popup.html'),
  styles: [require('./background-process-dismiss-popup.scss')]
})
export class BackgroundProcessDismissPopupComponent {
  @Input() processName: string;
  @Output() onDisimiss = new EventEmitter<void>();
  @Output() onRequestSupport = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  isConfirmed = false;

  dismiss() {
    this.onDisimiss.emit();
  }

  cancel() {
    this.onCancel.emit();
  }

  requestSupport() {
    this.onRequestSupport.emit();
  }
}
