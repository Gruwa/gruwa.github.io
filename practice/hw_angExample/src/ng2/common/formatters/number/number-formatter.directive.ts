import {Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {NgControl} from '@angular/forms';
import {CadNumberPipe} from '../../../number/pipes/number/number.pipe';

@Directive({
  selector: '[cadFormatNumber]'
})
export class NumberFormatterDirective implements OnInit {
  @Input('cadFormatNumber') options: { decimals: number };

  private element: HTMLInputElement;

  constructor(
    private el: ElementRef,
    private control: NgControl,
    private cadNumber: CadNumberPipe
  ) {
    this.element = this.el.nativeElement;
  }

  ngOnInit() {
    // hack for `[ngModel]`
    setTimeout(() => {
      this.element.value = this.transformValue();
    });
  }

  @HostListener('focus', ['$event.target.value'])
  onFocus(value) {
    this.element.value = this.control.value;
  }

  @HostListener('blur', ['$event.target.value'])
  onBlur(value) {
    if (this.control.invalid) {
      this.element.value = this.control.value;
    } else {
      this.element.value = this.transformValue();
    }
  }

  private transformValue() {
    const value = _.toNumber(this.control.value);
    const dec = _.get(this.options, 'decimals', 2);
    const digitInfo = `1.${dec}-${dec}`;
    return value && !isNaN(value) && isFinite(value)
      ? this.cadNumber.transform(value, digitInfo)
      : this.element.value;
  }
}
