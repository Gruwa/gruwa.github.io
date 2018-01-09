import {Component, Input, Inject} from '@angular/core';
import {ISmartFilterControl} from '../smart-filter-control';
import {ItemLabelPipe} from '../../common/pipes';

@Component({
  selector: 'cad-smart-filter-select',
  template: require('./select.html')
})
export class SmartFilterSelectComponent implements ISmartFilterControl {
  @Input() items: any[];
  @Input() labelField: string;
  @Input() trackByField: string;
  @Input() labelWhenEmpty: string = 'global.all';
  @Input() labelWhenSelected: string;
  @Input() listHeight = 200; // display 4 items by default
  @Input() dropdownWidth = 340;

  selectedItems: any[] = [];
  value: any[] = [];
  isOpened = false;
  searchQuery = '';

  constructor(
    @Inject('$translate') private $translate: ng.translate.ITranslateService,
    private itemLabelPipe: ItemLabelPipe
  ) {}

  setValue(value: any) {
    this.value = value || [];
    this.selectedItems = _.clone(this.value);
  }

  getValue(): any {
    return this.value;
  }

  getLabel(): string {
    const valueLength = _.size(this.value);

    // return item name if 1 item is selected otherwise return custom label
    if (valueLength === 1) {
      return this.itemLabelPipe.transform(this.value[0], this.labelField);
    } else {
      return this.$translate.instant(this.labelWhenSelected, {
        number: valueLength
      });
    }
  }

  getTooltip(): string {
    return _.map<any, string>(this.value, item => this.itemLabelPipe.transform(item, this.labelField)).join(', ');
  }

  isSelected(): boolean {
    return !_.isEmpty(this.selectedItems);
  }

  selectAll() {
    this.selectedItems = _.clone(this.items);
  }

  clear() {
    this.selectedItems = [];
    this.applySelection();
  }

  apply() {
    this.applySelection();
    this.isOpened = false;
  }

  onToggle() {
    this.isOpened = !this.isOpened;
    this.searchQuery = '';
  }

  private applySelection() {
    this.value = _.clone(this.selectedItems);
  }
}
