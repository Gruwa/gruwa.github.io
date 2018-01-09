import {Directive, ElementRef, EventEmitter, Injector, Input, Output} from '@angular/core';
import {UpgradeComponent} from '@angular/upgrade/static';
import IUploadOptions = cad.IUploadOptions;

// TODO: remove after removing usages in other apps
@Directive({
  selector: 'cad-ng1-upload'
})
export class UploadNg1Component extends UpgradeComponent {
  @Input() options: IUploadOptions;
  @Output() uploadEvent: EventEmitter<string>;

  constructor(elementRef: ElementRef, injector: Injector) {
    super('cadUpload', elementRef, injector);
  }
}
