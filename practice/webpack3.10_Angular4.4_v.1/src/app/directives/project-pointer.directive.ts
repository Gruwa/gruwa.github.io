import {
    Directive,
    ElementRef
} from '@angular/core';

@Directive({
  selector: '[appProjectPointer]'
})
export class ProjectPointerDirective {

  constructor(el: ElementRef) {
    el.nativeElement.style.cursor = 'pointer';
  }

}

