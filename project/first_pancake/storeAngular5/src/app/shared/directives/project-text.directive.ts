import {
  Directive,
  ElementRef
} from '@angular/core';

@Directive({
  selector: '[appProjectText]'
})
/**
 * Project Text Directive class, that adds font size, color property
 */
export class ProjectTextDirective {

  /**
   * Creates an instance of ProjectTextDirective.
   * @param {ElementRef} el
   * @memberof ProjectTextDirective
   */

  constructor(el: ElementRef) {
    el.nativeElement.style.fontSize = '18px';
    el.nativeElement.style.color = '#777777';
  }

}

