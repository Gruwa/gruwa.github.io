// solution from https://stackoverflow.com/questions/41465542/angular2-input-field-to-accept-only-numbers
import { Directive, ElementRef, HostListener } from '@angular/core';
import * as _ from 'lodash';

@Directive({
  selector: '[cadIntegersOnly]'
})
export class CadIntegersOnly {
  private regex: RegExp = new RegExp(/^[0-9]+$/g);
  private specialKeys: String[] = ['Backspace', 'Delete', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight'];

  constructor(private el: ElementRef) { }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (_.includes(this.specialKeys, event.key)) {
      return;
    }

    let current: string = this.el.nativeElement.value;
    let next: string = current.concat(event.key);
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }
}
