import {
  Directive, ElementRef,
  HostBinding
} from '@angular/core';

@Directive({
  selector: '[appProjectListStyle]'
})
/**
 * Project List Directive class, that adds margin property
 */
export class ProjectListDirective {

  /**
   * Creates an instance of ProjectListDirective.
   * @param {ElementRef} el
   * @memberof ProjectListDirective
   */

  constructor(el: ElementRef) {
    el.nativeElement.style.margin = '10px 0';
  }

}
