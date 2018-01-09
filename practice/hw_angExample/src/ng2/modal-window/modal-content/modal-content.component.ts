import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

export type ModalWindowViews = 'default' | 'compact' | 'wide-content';

@Component({
  selector: 'cad-modal-content',
  template: require('./modal-content.html'),
  styles: [require('./modal-content.scss')]
})
export class ModalContentComponent {
  @Input() view: ModalWindowViews;
  @Input() width: number;
  @Input() footerVisible = true;

  constructor(public activeModal: NgbActiveModal) {}

  close(): void {
    this.activeModal.dismiss();
  }
}
