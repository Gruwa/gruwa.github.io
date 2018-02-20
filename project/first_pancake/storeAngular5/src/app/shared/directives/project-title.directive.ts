import {
  Directive, ElementRef
} from '@angular/core';

@Directive({
  selector: '[appProjectTitleStyle]'
})
export class ProjectTitleDirective {

  constructor(el: ElementRef) {
    el.nativeElement.style.fontSize = '40px';
    el.nativeElement.style.color = '#80919A';
    el.nativeElement.style.marginBottom = '10px';
    el.nativeElement.style.display = 'block';
  }

}
