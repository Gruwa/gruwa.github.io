import {
  Component, Input, ViewChild, ElementRef, forwardRef, EventEmitter,
  Output
} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

@Component({
  selector: 'cad-search-input',
  template: require('./search-input.html'),
  styles: [require('./search-input.scss')],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SearchInputComponent),
    multi: true
  }]
})
export class SearchInputComponent implements ControlValueAccessor {
  @Input() placeholder: string;
  @Output('onFocus') focusEvent = new EventEmitter<void>();
  @Output('onFocusOut') focusOutEvent = new EventEmitter<void>();
  @ViewChild('input') private inputEl: ElementRef;

  private disabled: boolean;
  private innerValue: string;
  private onChangeCallback: (value: any) => void;
  private onTouchedCallback: Function;

  constructor() {
    // set dummy placeholders to avoid errors when attempt to call methods before they are assigned to proper handlers
    this.onChangeCallback = _.noop;
    this.onTouchedCallback = _.noop;
  }

  writeValue(value: any) {
    this.innerValue = value;
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  clear($event: Event) {
    $event.stopPropagation();

    if (this.disabled) { return; }

    this.updateInnerValue('');
    this.inputEl.nativeElement.focus();
  }

  updateInnerValue($event: string) {
    this.innerValue = $event;
    this.onChangeCallback($event);
    this.onTouchedCallback();
  }

  onBlur() {
    this.onTouchedCallback();
  }

  onFocus() {
    this.focusEvent.emit();
  }

  onFocusOut() {
    this.focusOutEvent.emit();
  }
}
