import {
  Directive,
  ElementRef
} from '@angular/core';

@Directive({
  selector: '[appProjectText]'
})
export class ProjectTextDirective {

  constructor(el: ElementRef) {
    el.nativeElement.style.fontSize = '18px';
    el.nativeElement.style.color = '#777777';
  }

}

