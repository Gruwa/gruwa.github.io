import {
  Component, Input, Output, EventEmitter, ElementRef, forwardRef, ViewEncapsulation, OnChanges, SimpleChanges
} from '@angular/core';
import {trigger, style, transition, animate} from '@angular/animations';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {TooltipContainerService} from '../tooltip-container/tooltip-container.service';

export type DropdownPlacements = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
export type DropdownSizes = 'default' | 'small' | 'big' | 'huge';
export type DropdownTypes = 'default' | 'boxed' | 'primary';
export type DropdownColors = 'default' | 'blue' | 'white' | 'grey';
export type DropdownContentColors = 'default' | 'grey';

@Component({
  selector: 'cad-dropdown',
  template: require('./dropdown.html'),
  styles: [
    require('./dropdown.scss'),
    // type modifiers:
    require('./scss/dropdown-boxed.scss'),
    require('./scss/dropdown-primary.scss'),
    // color modifiers:
    require('./scss/dropdown-blue.scss'),
    require('./scss/dropdown-white.scss'),
    require('./scss/dropdown-grey.scss'),
    // content color modifiers:
    require('./scss/dropdown-content-grey.scss'),
    // size modifiers (override type modifiers):
    require('./scss/dropdown-big.scss'),
    require('./scss/dropdown-huge.scss'),
    require('./scss/dropdown-small.scss')
  ],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({opacity: 0}),
        animate('150ms linear', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate('150ms linear', style({opacity: 0}))
      ])
    ])
  ],
  host: {
    '(document:keyup.esc)': 'closeFromOutsideEsc()',
    '(document:click)': 'closeFromOutsideClick($event)'
  },
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DropdownComponent),
    multi: true
  }]
})
export class DropdownComponent implements ControlValueAccessor, OnChanges {
  @Input() title: string; // title text of dropdown (by default title is outputted in tooltip)
  @Input() size: DropdownSizes = 'default';
  @Input() type: DropdownTypes = 'default'; // tslint:disable-line
  @Input() color: DropdownColors = 'default';  //
  @Input() contentColor: DropdownContentColors = 'default';
  @Input() iconName: string = 'arrow-down';
  @Input() placement: DropdownPlacements = 'bottom-right'; // where dropdown is appear (see DropdownPlacements)
  @Input() autoClose: boolean = true;  // to close by clicking outside dropdown or by pressing ESC button
  @Input() isOpened: boolean = false; // to manually open dropdown
  @Input() isCustomTooltipText: boolean = false; // is custom tooltip text?
  @Input() closeOnChange: boolean = false; // should dropdown be closed, after ngModel change?
  @Input() customTooltipText: string; // text for custom tooltip, could be HTML

  @Output() onToggle: EventEmitter<boolean> = new EventEmitter();

  public isDisabled: boolean = false;
  private value: any;
  private toggleElement: HTMLElement;
  /** The method to be called in order to update ngModel */
  private onChangeCallback: (value: any) => void;
  private onTouchedCallback: () => any;

  constructor(
    private elementRef: ElementRef,
    private tooltipContainerService: TooltipContainerService
  ) {
    this.toggleElement = elementRef.nativeElement;
  }

  ngOnChanges({isOpened}: SimpleChanges) {
    // hide all visible tooltips when dropdown closes
    if (isOpened && !isOpened.isFirstChange() && isOpened.currentValue === false) {
      this.tooltipContainerService.destroyVisibleTooltips();
    }
  }

  /**
   * Toggle dropdown content
   */
  toggle() {
    if (this.isDisabled) {
      return;
    }
    if (this.isOpened) {
      this.close();
    } else {
      this.open();
    }
  }

  close() {
    if (this.isOpened) {
      this.isOpened = false;
      this.onToggle.emit(false);
      this.tooltipContainerService.destroyVisibleTooltips();
    }
  }

  open() {
    if (!this.isOpened) {
      this.isOpened = true;
      this.onToggle.emit(true);
    }
  }

  /**
   * Sets the model value. Implemented as part of ControlValueAccessor.
   * @param value
   */
  writeValue(value: any) {
    this.value = value;

    if (this.closeOnChange) {
      this.close();
    }
  }

  /**
   * Registers a callback to be triggered when the model value changes.
   * Implemented as part of ControlValueAccessor.
   * @param fn Callback to be registered.
   */
  registerOnChange(fn: (value: any) => void) {
    this.onChangeCallback = fn;
  }

  /**
   * Registers a callback to be triggered when the control is touched.
   * Implemented as part of ControlValueAccessor.
   * @param fn Callback to be registered.
   */
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  /**
   * Sets the disabled state of the control. Implemented as a part of ControlValueAccessor.
   * @param isDisabled Whether the control should be disabled.
   */
  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }

  private closeFromOutsideClick($event) {
    if (this.autoClose
        && $event.button !== 2 // right button click
        && !this.isEventFromToggle($event)) {
      this.close();
    }
  }

  private closeFromOutsideEsc() {
    if (this.autoClose) {
      this.close();
    }
  }

  /**
   * checking if event was triggered on element inside dropdown
   *
   * @param $event: Event
   * @returns {boolean}
   * @private
   */
  private isEventFromToggle($event: Event): boolean {
    return !!this.toggleElement && this.toggleElement.contains(<Node> $event.target);
  }
}
