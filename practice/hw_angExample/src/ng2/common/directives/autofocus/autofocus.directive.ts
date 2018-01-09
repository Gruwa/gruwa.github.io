import {Directive, ElementRef, Input, AfterViewInit} from '@angular/core';

const DEFAULT_SELECTOR = 'input';

@Directive({
  selector: '[cadAutofocus]'
})
export class AutofocusDirective implements AfterViewInit {
  @Input('cadAutofocus') selector: string;
  @Input('cadAutofocusEnabled') private enabled = true;

  constructor(
    private hostElement: ElementRef
  ) {}

  ngAfterViewInit() {
    this.setFocus();
  }

  private setFocus() {
    if (!this.enabled) {
      return;
    }

    const host = this.hostElement.nativeElement;

    if (host.tagName.toLowerCase() === DEFAULT_SELECTOR) {
      host.focus();
    } else {
      const elemToFocus = host.querySelector(this.selector || DEFAULT_SELECTOR);
      if (elemToFocus) {
        elemToFocus.focus();
      }
    }
  }
}
