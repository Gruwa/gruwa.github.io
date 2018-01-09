import {Component, Host, Inject, Input, SkipSelf} from '@angular/core';
import {ISmartFilterControl} from '../smart-filter-control';
import {ItemLabelPipe} from '../../common/pipes/item-label/item-label.pipe';
import {SmartFilterComponent} from '../smart-filter.component';

@Component({
  selector: 'cad-smart-filter-button-toggle',
  template: require('./button-toggle.html')
})
export class SmartFilterButtonToggleComponent implements ISmartFilterControl {
  @Input() items: any[];
  @Input() labelField: string;
  @Input() trackByField: string;
  @Input() hasSmartTooltip: boolean = false;

  // should the filter name be used on the label or not?
  // example1: "Draft" or "Status: Draft"
  // example2: "Managed Service: Yes" or "Yes"
  @Input() showFullLabel = false;

  EMPTY_VALUE = null;
  value: any;

  constructor(
    @Host() @SkipSelf() private parent: SmartFilterComponent,
    @Inject('$translate') private $translate: ng.translate.ITranslateService,
    private itemLabelPipe: ItemLabelPipe
  ) {}

  setValue(value: any) {
    this.value = value;
  }

  getValue(): any {
    return this.value;
  }

  getLabel(): string {
    const label = this.valueToString();
    const filterName = this.$translate.instant(this.parent.label);

    return this.showFullLabel ? `${filterName}: ${label}` : label;
  }

  getTooltip(): string {
    return this.valueToString();
  }

  private valueToString(): string {
    return this.itemLabelPipe.transform(this.value, this.labelField);
  }
}
