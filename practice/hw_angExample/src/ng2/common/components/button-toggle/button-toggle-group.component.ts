import {
  Component, forwardRef, ContentChildren, Input, QueryList, Output,
  EventEmitter, OnChanges, SimpleChange
} from '@angular/core';
import {ButtonToggleComponent} from './button-toggle.component';

export type ButtonToggleGroupType =
  'simple' | 'simple-white' | 'blue' | 'rounded' |
  'orange' | 'white' | 'line' | 'small';

export type ButtonToggleGroupSize = 'default' | 'small' | 'big';

@Component({
  selector: 'cad-button-toggle-group',
  template: require('./button-toggle-group.html'),
  styles: [
    require('./button-toggle-group.scss'),
    require('./scss/rounded/button-toggle-group.scss')
  ]
})
export class ButtonToggleGroupComponent implements OnChanges {
  @Input() type: ButtonToggleGroupType = 'simple'; // tslint:disable-line

  @Input() size: ButtonToggleGroupSize = 'default';

  @Input() disabled: boolean = false; // Whether the toggle group is disabled.

  @Input() activeButton: any; // Value of the toggle group

  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

  /** Child button toggle buttons. */
  @ContentChildren(forwardRef(() => ButtonToggleComponent))
  _buttonToggles: QueryList<ButtonToggleComponent> = null;

  ngOnChanges(changes: {activeButton: SimpleChange}) {
    if (!changes.activeButton) {
      return;
    }

    this.updateButtonStates(changes.activeButton.currentValue);
  }

  updateValue(newValue: any) {
    if (this.activeButton !== newValue) {
      this.activeButton = newValue;

      this.updateButtonStates(this.activeButton);

      this.onChange.emit(this.activeButton);
    }
  }

  private updateButtonStates(value) {
    if (this._buttonToggles !== null) {
      this._buttonToggles.forEach((buttonToggle: ButtonToggleComponent) => {
        buttonToggle.active = buttonToggle.value === value;
      });
    }
  }
}
