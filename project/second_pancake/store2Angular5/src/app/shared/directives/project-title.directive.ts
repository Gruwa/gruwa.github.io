import {
  Directive, ElementRef
} from '@angular/core';

@Directive({
  selector: '[appProjectTitleStyle]'
})
/**
 * Project Title Directive class, that adds font size, color,
 * margin bottom and display property
 */
export class ProjectTitleDirective {

  /**
   * Creates an instance of ProjectTitleDirective.
   * @param {ElementRef} el
   * @memberof ProjectTitleDirective
   */

  constructor(el: ElementRef) {
    el.nativeElement.style.fontSize = '40px';
    el.nativeElement.style.color = '#80919A';
    el.nativeElement.style.marginBottom = '10px';
    el.nativeElement.style.display = 'block';
  }

}
