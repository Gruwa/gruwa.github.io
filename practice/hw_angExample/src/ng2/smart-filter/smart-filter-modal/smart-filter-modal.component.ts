import {Component, EventEmitter, Input, Output, TemplateRef} from '@angular/core';
import {NgbActiveModal} from '../../modal-window';

@Component({
  selector: 'cad-smart-filter-modal',
  template: require('./smart-filter-modal.html'),
  styles: [require('./smart-filter-modal.scss')]

})
export class SmartFilterModalComponent {
  @Input() body: TemplateRef<any>;
  @Input() isInvalid: () => boolean;

  @Output() clear = new EventEmitter<void>();

  constructor(
    private activeModal: NgbActiveModal
  ) {
  }

  onCancel() {
    this.activeModal.dismiss();
  }

  onApply() {
    if (_.isFunction(this.isInvalid)) {
      if (!this.isInvalid()) {
        this.activeModal.close();
      }
    } else {
      this.activeModal.close();
    }
  }

  onClear() {
    this.clear.emit();
  }
}
