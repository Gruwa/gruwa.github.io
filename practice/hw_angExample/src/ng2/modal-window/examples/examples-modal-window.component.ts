import {Component} from '@angular/core';
import {MessageService} from './../../message/simple/message.service';
import {ExamplesModalContentComponent, IExamplesModalInputs} from './test-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'cad-examples-modal-window',
  template: require('./examples-modal-window.html')
})
export class ExamplesModalWindowComponent {
  isSmall: false;
  constructor(
    private modalService: NgbModal,
    private messageService: MessageService
  ) {}

  openModal() {
    const data: IExamplesModalInputs = {
      aParam: 1,
      bParam: 'str'
    };

    // ng-bootstrap has only max-width limitation, no need to manipulate its size
    const modalRef = this.modalService.open(ExamplesModalContentComponent, {size: 'lg'});
    _.assign(modalRef.componentInstance, data);

    modalRef.result
      .then(result => this.messageService.success('onApply: ' + result))
      .catch(() => this.messageService.error('onCancel'));
  }
}
