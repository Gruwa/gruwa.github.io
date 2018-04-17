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
/**
 * Project Uploader Directive class
 */
export class ProjectUploaderDirective {

  /**
   * Variable for emmit
   * @type {EventEmitter<any>}
   * @memberof ProjectUploaderDirective
   */

  @Output() formUpload: EventEmitter<any> = new EventEmitter();

  /**
   * Variable for input
   * @type {HTMLInputElement}
   * @memberof ProjectUploaderDirective
   */

  public input: HTMLInputElement;

  /**
   * Creates an instance of ProjectUploaderDirective.
   * @param {ElementRef} el
   * @memberof ProjectUploaderDirective
   */

  constructor(el: ElementRef) {
    this.input = el.nativeElement;
  }

  @HostListener('change', ['$event'])

  /**
   * Directive method
   * @returns {void}
   * @memberof ProjectUploaderDirective
   */

  onChange(): void {
    const file = this.input.files[0];
    this.formUpload.emit(file);
  }

}
