import {
  Directive,
  ElementRef
} from '@angular/core';

@Directive({
  selector: '[appProjectPointer]'
})
/**
 * Project Pointer Directive class, that adds cursor property
 */
export class ProjectPointerDirective {

  /**
   * Creates an instance of ProjectPointerDirective.
   * @param {ElementRef} el
   * @memberof ProjectPointerDirective
   */

  constructor(el: ElementRef) {
    el.nativeElement.style.cursor = 'pointer';
  }

}

