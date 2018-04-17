import {Directive, ElementRef, Renderer, Renderer2} from '@angular/core';

@Directive({
  selector: '[focusDirective]',
  host: {
    '(focus)': 'onFocus()',
    '(blur)': 'onBlur()',
    'tabindex': '1'
  }
})
/**
 * Focus Directive class, that adds tabindex attribute to an element
 * Listens to the (focus) and (blur) events on the element and
 * emits the events  onFocus and onBlur to add or remove 'focused' class
 * Uses Renderer to set and remove class names on each of the events
 */
export class FocusDirective {

  /**
   * @param element - required to have an instance of the element
   * @param renderer - required to use renderer methods
   */
  constructor(public element: ElementRef,
              public renderer: Renderer2) {
    /**
     * Assigns a nativeElement reference of the attached element
     * get from elementRef.nativeElement
     * @type {Element}
     */
    this._nativeElement = element.nativeElement;
  }

  /**
   * Property, which is a reference to attached element
   * @type {HTMLElement}
   * @protected
   */
  protected _nativeElement: HTMLElement;

  /**
   * Method, that is triggered on (focus) event on the attached element
   * Adds the 'focused' class to the element using Renderer
   * @protected
   */
  protected onFocus(): void {
    this.renderer.addClass(this._nativeElement, 'focused');
  }

  /**
   * Method, that is triggered on (blur) event on the attached element
   * Removes the 'focused' class to the element using Renderer
   * @protected
   */
  protected onBlur(): void {
    this.renderer.removeClass(this._nativeElement, 'focused');
  }
}

