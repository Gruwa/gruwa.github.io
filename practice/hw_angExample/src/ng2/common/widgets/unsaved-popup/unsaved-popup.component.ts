import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'cad-track-unsaved-popup',
  template: require('./unsaved-popup.html'),
  styles: [require('./unsaved-popup.scss')]
})
export class TrackUnsavedPopupComponent {
  constructor(
    private activeModal: NgbActiveModal
  ) {}

  leave() {
    this.activeModal.close();
  }

  stay() {
    this.activeModal.dismiss();
  }
}
