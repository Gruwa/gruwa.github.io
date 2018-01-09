import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import {WindowService} from '../../common';
import {SupportService} from '../';
import {IUploadOptions} from '../../upload';

@Component({
  selector: 'cad-support-popup',
  template: require('./support-popup.html'),
  styles: [require('./support-popup.scss')]
})
export class SupportPopupComponent {
  isSubmitted = false;
  isSent = false;
  form: FormGroup;
  uploadOptions: IUploadOptions;

  constructor(
    @Inject(WindowService) private window: cad.IWindowService,
    private formBuilder: FormBuilder,
    private supportService: SupportService
  ) {
    this.form = this.createForm();

    this.uploadOptions = {
      titlesRoot: 'support.upload_screenshot',
      uploadFn: this.supportService.uploadAttach.bind(this.supportService),
      accept: '.jpg,.jpeg,.png',
      maxSize: 5 * 1024 * 1024
    };
  }

  close() {
    this.supportService.closePopup();
  }

  submit() {
    this.supportService
      .sendSessionRequest(
        this.form.get('subject').value,
        this.form.get('description').value,
        this.form.get('screenshotUrl').value
      )
      .then(() => this.isSent = true);

    this.isSubmitted = true;
  }

  shouldDisplayError(control: AbstractControl): boolean {
    return control.invalid && (control.touched || control.dirty);
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      subject: ['', [
        Validators.required, Validators.minLength(3), Validators.maxLength(100)]
      ],
      description: [this.window.location.href, [
        Validators.required, Validators.minLength(30), Validators.maxLength(1000)]
      ],
      screenshotUrl: ''
    });
  }
}
