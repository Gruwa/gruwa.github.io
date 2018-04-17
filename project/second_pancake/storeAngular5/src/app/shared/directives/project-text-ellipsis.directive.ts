import {
  Directive,
  ElementRef
} from '@angular/core';

@Directive({
  selector: '[appProjectTextEllipsis]'
})
/**
 * Project Text Ellipsis Directive class, that adds width, text over flow,
 * white space property for ellipsis
 */
export class ProjectTextEllipsisDirective {

  /**
   * Creates an instance of ProjectTextEllipsisDirective.
   * @param {ElementRef} el
   * @memberof ProjectTextEllipsisDirective
   */
  
  constructor(el: ElementRef) {
    el.nativeElement.style.width = '100%';
    el.nativeElement.style.textOverflow = 'ellipsis';
    el.nativeElement.style.overflow = 'hidden';
    el.nativeElement.style.whiteSpace = 'nowrap';
  }

}
