import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output
} from '@angular/core';

@Directive({
  selector: '[formUpload]'
})
export class ProjectUploaderDirective {

  @Output() formUpload: EventEmitter<any> = new EventEmitter();
  input: HTMLInputElement;

  constructor(element: ElementRef) {
    this.input = element.nativeElement;
  }


  @HostListener('change', ['$event'])

  onChange(event) {
    const file = this.input.files[0];
    this.formUpload.emit(file);
  }

}
