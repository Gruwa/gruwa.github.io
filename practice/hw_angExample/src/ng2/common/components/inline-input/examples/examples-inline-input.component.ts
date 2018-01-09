import {Component, Inject} from '@angular/core';
import {MessageService} from '../../../../../core/services/toast-messages/message.service';

@Component({
  selector: 'cad-examples-inline-input',
  template: require('./examples-inline-input.html')
})
export class ExamplesInlineInputComponent {
  size = 'small';
  elemWidth = 300;
  isSaving = false;
  savingSpinner = true;
  showValidation = true;
  isRequired = true;
  minLength = 5;
  maxLength = 20;
  placeholder = 'This is placeholder';
  inputValue = 'This is initial value';

  validationMessages = new Map([
    ['minlength', `Min length is ${this.minLength} chars`],
    ['maxlength', `Max length is ${this.maxLength} chars`]
  ]);

  constructor(
    @Inject('messageService') private messageService: MessageService
  ) {}

  save($event: {newValue: any, oldValue: any}) {
    console.log('onSave()'); // tslint:disable-line

    // simulate saving to BE
    if (this.savingSpinner) {
      this.isSaving = true;

      this.fakeAsyncSave()
        .catch(() => {
          this.inputValue = $event.oldValue;
          this.messageService.showErrorMessage('Failed to save to fake backend');
        })
        .then(() => {
          this.isSaving = false;
        });
    }
  }

  // fake BE saving with random timeout from 0.5 to 2 secs and success/fail rate 70/30
  private fakeAsyncSave(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const timeout = _.random(500, 2000);
      setTimeout(() => _.random(100) > 30 ? resolve() : reject(), timeout);
    });
  }
}
