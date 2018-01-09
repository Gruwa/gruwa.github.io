import {Component, Input} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MessageService} from '../../message/simple/message.service';
import {ModalWindowViews} from '../modal-content/modal-content.component';

export interface IExamplesModalInputs {
  aParam: number;
  bParam: string;
}

@Component({
  selector: 'cad-test-modal',
  template: require('./test-modal.html'),
  styles: [`
    .test-modal-header {
      justify-content: space-between;
      align-items: center;
    }

    .test-modal-header .test-modal-header--right {
      min-width: 125px;
    }
  `]
})
export class ExamplesModalContentComponent {
  @Input() aParam: number;
  @Input() bParam: string;

  views: ModalWindowViews[] = [
    'default',
    'compact',
    'wide-content'
  ];

  currentView = 'default';

  outputItems = [
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
    'Item 6',
    'Item 7',
    'Item 8',
    'Item 9'
  ];

  outputValue = null;
  modalWidth = 800;
  creationTime = new Date();

  constructor(
    private activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private messageService: MessageService
  ) {
  }

  onApply() {
    this.activeModal.close(this.outputValue);
  }

  onCancel() {
    this.activeModal.dismiss();
  }

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
