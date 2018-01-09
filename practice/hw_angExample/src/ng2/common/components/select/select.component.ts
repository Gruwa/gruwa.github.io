import * as _ from 'lodash';
import {Component, ElementRef, Input, ContentChild, TemplateRef, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

export type SelectType = 'default' | 'transparent' | 'unboxed';
export type SelectHeadColor = 'default' | 'grey';

@Component({
  selector: 'cad-select',
  template: require('./select.html'),
  styles: [
    require('./select.scss'),
    require('./scss/select-transparent.scss'),
    require('./scss/select-unboxed.scss')
  ],
  host: {
    '(document:click)': 'onClick($event)',
    '(document:keyup.esc)': 'close()'
  },
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectComponent),
    multi: true
  }]
})
export class SelectComponent implements ControlValueAccessor {
  @Input() items: any[]; // list of items to select
  @Input() head: string; // what will be shown in head section
  @Input() headColor: SelectHeadColor; // color of text in head section
  @Input() headLabel: string; // text label, to show in head section on the right side
  @Input() labelField: string; // path to item's property that should be used as label
  @Input() trackByField: string; // path to item property that should be used an unique ID for item
  @Input() small: boolean; // if to use small layout
  // tslint:disable-next-line
  @Input() type: SelectType = 'default'; // Different dropdown modifications
  @Input() invalid: boolean; // if to render component in error state

  private disabled: boolean;
  private expanded = false;
  private selectedItem: any;
  private onChangeCallback: (value: any) => void;
  private onTouchedCallback: Function;
  @ContentChild(TemplateRef) private customItemTemplate: TemplateRef<any>;

  constructor(
    private hostElement: ElementRef
  ) {
    // set dummy placeholders to avoid errors when attempt to call methods before they are assigned to proper handlers
    this.onChangeCallback = _.noop;
    this.onTouchedCallback = _.noop;
  }

  writeValue(value: any) {
    this.selectedItem = value;
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

  onClick($event: MouseEvent) {
    if (this.disabled) { return; }

    if (this.hostElement.nativeElement.contains($event.target)) {
      this.expanded ? this.close() : this.open();
    } else {
      this.close();
    }
  }

  select(item: any) {
    this.selectedItem = item;
    this.onChangeCallback(item);
  }

  isSelected(item: any): boolean {
    if (item === this.selectedItem) {
      return true;

    } else if (this.trackByField) {
      const itemKey = _.get(item, this.trackByField);
      const selectedKey = _.get(this.selectedItem, this.trackByField);
      return itemKey && selectedKey && itemKey === selectedKey;

    // TODO: UCO-2399: Field 'trackByField' wasn't obligatory initially
    // so we have to do deep comparison of objects, need to avoid it future
    } else {
      return _.isEqual(item, this.selectedItem);
    }
  }

  private open() {
    this.expanded = true;
    this.onTouchedCallback();
  }

  private close() {
    this.expanded = false;
  }
}
