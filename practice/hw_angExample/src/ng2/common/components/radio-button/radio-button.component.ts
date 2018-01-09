import {Component, Input, EventEmitter, Output, forwardRef, Inject, OnInit, ChangeDetectorRef} from '@angular/core';
import {RadioButtonGroupComponent} from './radio-button-group.component';

@Component({
  selector: 'cad-radio-button',
  template: require('./radio-button.html'),
  styles: [require('./radio-button.scss')]
})
export class RadioButtonComponent implements OnInit {
  @Input() value: any; // Name of radio buttons inside

  /** Whether the button is disabled. */
  @Input()
  set disabled(value: boolean) {
    this._disabled = value;
  }

  get disabled(): boolean {
    return this._disabled || this.radioButtonGroup.disabled;
  }

  get name(): string {
    return this.radioButtonGroup.name;
  }

  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

  checked: boolean = false;

  private _disabled: boolean = null;

  constructor(
    @Inject(forwardRef(() => RadioButtonGroupComponent)) private radioButtonGroup: RadioButtonGroupComponent
  ) {
    if (!this.radioButtonGroup) {
      throw 'Radio Button should be defined inside Radio Button Group';
    }
  }

  ngOnInit() {
    if (this.value === this.radioButtonGroup.value) {
      this.checked = true;
    }
  }

  change(): void {
    if (this.disabled) {
      return;
    }
    if (this.checked) {
      return;
    }

    this.checked = true;
    this.radioButtonGroup.updateValue(this.value);
    this.onChange.emit();
  }
}
