/**
 * @see LICENSE
 * (c) https://github.com/chliebel/angular2-click-outside
 */

import {Directive, ElementRef, Output, EventEmitter, HostListener} from '@angular/core';

@Directive({
  selector: '[cadClickOutside]'
})
export class ClickOutsideDirective {
  @Output() cadClickOutside = new EventEmitter<MouseEvent>();

  constructor(
    private _elementRef: ElementRef
  ) {}

  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: HTMLElement): void {
    if (!targetElement) {
      return;
    }

    const clickedInside = this._elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.cadClickOutside.emit(event);
    }
  }
}
