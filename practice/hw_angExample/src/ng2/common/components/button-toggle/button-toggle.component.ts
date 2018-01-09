import {Component, OnInit, Input, EventEmitter, Output, Inject, forwardRef} from '@angular/core';
import {ButtonToggleGroupComponent} from './button-toggle-group.component';

@Component({
  selector: 'cad-button-toggle',
  template: require('./button-toggle.html'),
  styles: [
    require('./button-toggle.scss'),
    require('./scss/simple/button-toggle.scss'),
    require('./scss/simple-white/button-toggle.scss'),
    require('./scss/rounded/button-toggle.scss'),
    require('./scss/orange/button-toggle.scss'),
    require('./scss/white/button-toggle.scss'),
    require('./scss/blue/button-toggle.scss')
  ]
})
export class ButtonToggleComponent implements OnInit {
  @Input() value: any; // toggle button value (id), unique for button group

  /** Whether the button is disabled. */
  @Input()
  set disabled(value: boolean) {
    this._disabled = value;
  }

  get disabled(): boolean {
    return this._disabled || (this.buttonToggleGroup !== null && this.buttonToggleGroup.disabled);
  }

  active: boolean = false; // Whether or not this button toggle is checked

  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();

  private _disabled: boolean = null;

  constructor(
    @Inject(forwardRef(() => ButtonToggleGroupComponent)) private buttonToggleGroup: ButtonToggleGroupComponent
  ) {
  }

  ngOnInit() {
    if (this.buttonToggleGroup && this.value === this.buttonToggleGroup.activeButton) {
      this.active = true;
    }
  }

  click(): void {
    if (this.disabled) {
      return;
    }

    this.active = true;
    if (this.buttonToggleGroup) {
      this.buttonToggleGroup.updateValue(this.value);
    }
    this.onClick.emit();
  }

}
